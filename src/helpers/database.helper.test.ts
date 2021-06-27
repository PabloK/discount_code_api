import 'reflect-metadata';

import Container from 'typedi';

import localSettings from '../../local.settings.json';
import { DiscountCode } from '../types/graphql-types';
import { CONTAINERS, DatabaseHelper } from './databse.helper';

const removeContainers = async (dbHelper: DatabaseHelper) => {
  try {
    const assignedCodes = await dbHelper.getContainer(CONTAINERS.assignedcodes);
    await assignedCodes.delete();
    const discountcodes = await dbHelper.getContainer(CONTAINERS.discountcodes);
    await discountcodes.delete();
  } catch {
    Promise.resolve();
  }
};

const seedContainers = async (dbHelper: DatabaseHelper) => {
  const created = new Date();
  const expires = new Date().setDate(created.getDate() + 31); // 31 days after creation
  const discountcodes = await dbHelper.getContainer(CONTAINERS.discountcodes);
  const assignedCodes = await dbHelper.getContainer(CONTAINERS.assignedcodes);

  await discountcodes.items.create({
    brand: '1',
    discount: 10,
    code: 'ffbbcc12',
    createdAt: created.getTime(),
    expiresAt: expires,
  } as DiscountCode);

  await discountcodes.items.create({
    brand: '3',
    discount: 8,
    code: 'ffbbcc13',
    createdAt: created.getTime(),
    expiresAt: expires,
  } as DiscountCode);

  await assignedCodes.items.create({
    brand: '1',
    discount: 15,
    code: 'discountcode',
    createdAt: created.getTime(),
    expiresAt: expires,
    userId: '1',
  } as DiscountCode);
};

describe('DatabaseHelper', () => {
  let databaseHelper: DatabaseHelper;
  jest.setTimeout(90 * 1000);

  beforeAll(async () => {
    databaseHelper = Container.get(DatabaseHelper);
    process.env.databaseName = 'testdatadb';
    process.env.discountcodedb_DOCUMENTDB = localSettings.Values.discountcodedb_DOCUMENTDB;
    await removeContainers(databaseHelper);
    await seedContainers(databaseHelper);
  });

  describe('getFirstFreeDiscountCode', () => {
    it('should retrive a record', async () => {
      const actual = await databaseHelper.assignFirstUnusedDiscountCode('1', '1');
      expect(actual.brand).toBeDefined();
      expect(actual.code).toMatch(/[0-9a-f]{8}/);
    });
    it('should throw if no record is found', async () => {
      expect(databaseHelper.assignFirstUnusedDiscountCode('1', '2')).rejects.toThrowError(Error);
    });
  });

  describe('userHasCode', () => {
    it('should return true if the user already has a code for the specified brand', async () => {
      const actual = await databaseHelper.userHasCode('1', '1');
      expect(actual).toBeTruthy();
    });
    it('should return false if the user has no code for the specified brand', async () => {
      const actual = await databaseHelper.userHasCode('1', '2');
      expect(actual).toBeFalsy();
    });
  });
});
