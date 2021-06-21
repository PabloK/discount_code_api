import { GraphQLResolveInfo } from 'graphql';
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
};

export type DiscountCode = {
  __typename?: 'DiscountCode';
  /** Id description */
  id: Scalars['ID'];
};

export type DiscountCodes = {
  __typename?: 'DiscountCodes';
  discountCodes: Array<Maybe<DiscountCode>>;
};

export type DiscountCodesResponse = {
  __typename?: 'DiscountCodesResponse';
  discountCodes?: Maybe<DiscountCodes>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create the specified number of discount codes for the specified brand */
  createDiscountCodes: DiscountCodesResponse;
};


export type MutationCreateDiscountCodesArgs = {
  id: Scalars['ID'];
  codesToCreate: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  /** Fetch a discount code with a specified id */
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
  DiscountCode: ResolverTypeWrapper<DiscountCode>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  DiscountCodes: ResolverTypeWrapper<DiscountCodes>;
  DiscountCodesResponse: ResolverTypeWrapper<DiscountCodesResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  DiscountCode: DiscountCode;
  ID: Scalars['ID'];
  DiscountCodes: DiscountCodes;
  DiscountCodesResponse: DiscountCodesResponse;
  Mutation: {};
  Int: Scalars['Int'];
  Query: {};
  Boolean: Scalars['Boolean'];
  String: Scalars['String'];
};

export type DiscountCodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscountCode'] = ResolversParentTypes['DiscountCode']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscountCodesResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscountCodes'] = ResolversParentTypes['DiscountCodes']> = {
  discountCodes?: Resolver<Array<Maybe<ResolversTypes['DiscountCode']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscountCodesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscountCodesResponse'] = ResolversParentTypes['DiscountCodesResponse']> = {
  discountCodes?: Resolver<Maybe<ResolversTypes['DiscountCodes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createDiscountCodes?: Resolver<ResolversTypes['DiscountCodesResponse'], ParentType, ContextType, RequireFields<MutationCreateDiscountCodesArgs, 'id' | 'codesToCreate'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getDiscountCode?: Resolver<ResolversTypes['DiscountCode'], ParentType, ContextType, RequireFields<QueryGetDiscountCodeArgs, 'id'>>;
};

export type Resolvers<ContextType = any> = {
  DiscountCode?: DiscountCodeResolvers<ContextType>;
  DiscountCodes?: DiscountCodesResolvers<ContextType>;
  DiscountCodesResponse?: DiscountCodesResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
