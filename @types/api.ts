export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Kotatsu = {
  __typename?: 'Kotatsu';
  created?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  pullTime?: Maybe<Scalars['Int']>;
  pullTimer?: Maybe<Scalars['Int']>;
  pulling?: Maybe<Scalars['Boolean']>;
  updated?: Maybe<Scalars['String']>;
  using?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  toggleKotatsu?: Maybe<Kotatsu>;
  updateKotatsu?: Maybe<Kotatsu>;
};


export type MutationToggleKotatsuArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateKotatsuArgs = {
  id: Scalars['Int'];
  pullTime: Scalars['Int'];
  pullTimer: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  kotatsu?: Maybe<Kotatsu>;
  user?: Maybe<User>;
};


export type QueryKotatsuArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  name?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  count?: Maybe<Scalars['Int']>;
  created?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  sitting?: Maybe<Scalars['Boolean']>;
  updated?: Maybe<Scalars['String']>;
  using?: Maybe<Scalars['Boolean']>;
};

export type GetKotatsuQueryVariables = Exact<{
  kotatsuID: Scalars['Int'];
}>;


export type GetKotatsuQuery = { __typename?: 'Query', kotatsu?: { __typename?: 'Kotatsu', id?: number | null, pulling?: boolean | null, pullTimer?: number | null, pullTime?: number | null, using?: boolean | null, created?: string | null, updated?: string | null } | null };

export type GetUserQueryVariables = Exact<{
  userName?: InputMaybe<Scalars['String']>;
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id?: number | null, name?: string | null, using?: boolean | null, created?: string | null, updated?: string | null } | null };

export type ToggleKotatsuMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ToggleKotatsuMutation = { __typename?: 'Mutation', toggleKotatsu?: { __typename?: 'Kotatsu', id?: number | null, pulling?: boolean | null, pullTime?: number | null, pullTimer?: number | null, using?: boolean | null, created?: string | null, updated?: string | null } | null };

export type KotatsuFieldsForToggleFragment = { __typename?: 'Kotatsu', id?: number | null, pulling?: boolean | null, pullTime?: number | null, pullTimer?: number | null, using?: boolean | null, created?: string | null, updated?: string | null };

export type UpdateKotatsuMutationVariables = Exact<{
  id: Scalars['Int'];
  pullTime: Scalars['Int'];
  pullTimer: Scalars['Int'];
}>;


export type UpdateKotatsuMutation = { __typename?: 'Mutation', updateKotatsu?: { __typename?: 'Kotatsu', id?: number | null, pulling?: boolean | null, pullTime?: number | null, pullTimer?: number | null, using?: boolean | null, created?: string | null, updated?: string | null } | null };

export type KotatsuFieldsFragment = { __typename?: 'Kotatsu', id?: number | null, pulling?: boolean | null, pullTime?: number | null, pullTimer?: number | null, using?: boolean | null, created?: string | null, updated?: string | null };
