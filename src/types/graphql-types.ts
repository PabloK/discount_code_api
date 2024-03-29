import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type CreateDiscountCodesResponse = {
  __typename?: 'CreateDiscountCodesResponse';
  /** A boolean representing the mutation result */
  created: Scalars['Boolean'];
};


export type DiscountCode = {
  __typename?: 'DiscountCode';
  /** Id description */
  id: Scalars['ID'];
  /** Identifier of the brand the code belongs to. */
  brand: Scalars['ID'];
  /** The discount in percent. */
  discount: Scalars['Int'];
  /** The discount code formatted for display. */
  code: Scalars['String'];
  /** The date the code was created. */
  createdAt: Scalars['Date'];
  /** The date the code expires */
  expiresAt: Scalars['Date'];
  /** The id of the user the code has been assigned to. */
  userId?: Maybe<Scalars['ID']>;
};

export type GiveDiscountCodeResponse = {
  __typename?: 'GiveDiscountCodeResponse';
  discountCode?: Maybe<DiscountCode>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Start a job to create the specified number of discount codes for the specified brand */
  createDiscountCodes: CreateDiscountCodesResponse;
  /** Give a user a discount code. */
  giveDiscountCode?: Maybe<GiveDiscountCodeResponse>;
};


export type MutationCreateDiscountCodesArgs = {
  id: Scalars['ID'];
  codesToCreate: Scalars['Int'];
  discountPercent: Scalars['Int'];
};


export type MutationGiveDiscountCodeArgs = {
  userId: Scalars['ID'];
  brandId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  /**
   * Fetch a data about a discount code with a specified id.
   *
   * Not Implemented.
   */
  getDiscountCode: DiscountCode;
};


export type QueryGetDiscountCodeArgs = {
  id: Scalars['ID'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  CreateDiscountCodesResponse: ResolverTypeWrapper<CreateDiscountCodesResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DiscountCode: ResolverTypeWrapper<DiscountCode>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  GiveDiscountCodeResponse: ResolverTypeWrapper<GiveDiscountCodeResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  CreateDiscountCodesResponse: CreateDiscountCodesResponse;
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  DiscountCode: DiscountCode;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  String: Scalars['String'];
  GiveDiscountCodeResponse: GiveDiscountCodeResponse;
  Mutation: {};
  Query: {};
};

export type CreateDiscountCodesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateDiscountCodesResponse'] = ResolversParentTypes['CreateDiscountCodesResponse']> = {
  created?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DiscountCodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscountCode'] = ResolversParentTypes['DiscountCode']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  brand?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  discount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  expiresAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiveDiscountCodeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiveDiscountCodeResponse'] = ResolversParentTypes['GiveDiscountCodeResponse']> = {
  discountCode?: Resolver<Maybe<ResolversTypes['DiscountCode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createDiscountCodes?: Resolver<ResolversTypes['CreateDiscountCodesResponse'], ParentType, ContextType, RequireFields<MutationCreateDiscountCodesArgs, 'id' | 'codesToCreate' | 'discountPercent'>>;
  giveDiscountCode?: Resolver<Maybe<ResolversTypes['GiveDiscountCodeResponse']>, ParentType, ContextType, RequireFields<MutationGiveDiscountCodeArgs, 'userId' | 'brandId'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getDiscountCode?: Resolver<ResolversTypes['DiscountCode'], ParentType, ContextType, RequireFields<QueryGetDiscountCodeArgs, 'id'>>;
};

export type Resolvers<ContextType = any> = {
  CreateDiscountCodesResponse?: CreateDiscountCodesResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DiscountCode?: DiscountCodeResolvers<ContextType>;
  GiveDiscountCodeResponse?: GiveDiscountCodeResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
