import { Container, CosmosClient, Database } from '@azure/cosmos';
import { Service } from 'typedi';

import { DiscountCode } from '../types/graphql-types';

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
export type ContainerProperties = {
  id: string;
  partitionKey: string;
};

export const CONTAINERS: Record<string, ContainerProperties> = {
  discountcodes: {
    id: 'discountcodes',
    partitionKey: '/brand',
  },
  assignedcodes: {
    id: 'assignedcodes',
    partitionKey: '/userId',
  },
};

@Service()
export class DatabaseHelper {
  public assignFirstUnusedDiscountCode = async (
    userId: string,
    brandId: string,
  ): Promise<DiscountCode> => {
    const discountCodesContainer = await this.getContainer(CONTAINERS.discountcodes);
    const assignedCodesContainer = await this.getContainer(CONTAINERS.assignedcodes);
    // Select discount codes that have not been reserved.
    const queryResult = await discountCodesContainer.items
      .query({
        query:
          'SELECT * FROM c WHERE c.brand = @brand AND NOT IS_DEFINED(c.userId) OFFSET 0 LIMIT 10',
        parameters: [{ name: '@brand', value: brandId }],
      })
      .fetchAll();
    let attempts = 0;
    while (attempts < 10) {
      if (!queryResult.resources || !queryResult.resources[attempts]) {
        break;
      }

      const item = queryResult.resources[attempts];
      try {
        item.userId = userId;
        // Prevent the discount code from being used by another user
        await discountCodesContainer.item(item.id).replace(item, {
          accessCondition: { type: 'IfMatch', condition: item._etag },
        });
        // Insert the discount code in the assigned container.
        assignedCodesContainer.items.create(item);
        return Promise.resolve(item as DiscountCode);
      } catch (e) {
        // Empty on purpose
      }
      attempts += 1;
    }
    return Promise.reject(new Error('Could not find discount code in database'));
  };

  public userHasCode = async (userId: string, brandId: string): Promise<boolean> => {
    const container = await this.getContainer(CONTAINERS.assignedcodes);
    const queryResult = await container.items
      .query({
        query: 'SELECT * FROM c WHERE c.userId= @userId AND c.brand = @brandId OFFSET 0 LIMIT 1',
        parameters: [
          { name: '@brandId', value: brandId },
          { name: '@userId', value: userId },
        ],
      })
      .fetchNext();
    if (queryResult.resources && queryResult.resources.length > 0) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  };

  public getDatabase = async (databaseName: string): Promise<Database> => {
    let database: Database;
    try {
      const connectionString: string = process.env.discountcodedb_DOCUMENTDB;
      const client = new CosmosClient(connectionString);
      ({ database } = await client.databases.createIfNotExists({ id: databaseName }));
    } catch (e) {
      return Promise.reject(
        new Error(`Could not find selected database ${databaseName}, ${e.message}`),
      );
    }
    return Promise.resolve(database);
  };

  public getContainer = async (containerProperties: ContainerProperties): Promise<Container> => {
    let container: Container;
    const databaseName = process.env.databaseName || 'discountcodedb';
    try {
      const database = await this.getDatabase(databaseName);
      ({ container } = await database.containers.createIfNotExists(containerProperties));
    } catch (e) {
      Promise.reject(e);
    }
    return Promise.resolve(container);
  };
}
