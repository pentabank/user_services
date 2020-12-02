export type Maybe<T> = T | null;
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
  Date: any;
};

export type Query = {
  __typename?: 'Query';
  greetings?: Maybe<Scalars['String']>;
  allClients?: Maybe<Array<Maybe<Client>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addClient: Scalars['ID'];
  deleteClient: Message;
  updateClient: Client;
  login?: Maybe<AuthPayload>;
};


export type MutationAddClientArgs = {
  client: ClientCreationInput;
};


export type MutationDeleteClientArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateClientArgs = {
  client: ClientCreationInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  code: Scalars['Int'];
  message: Scalars['String'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  user?: Maybe<Client>;
  token?: Maybe<Scalars['String']>;
};


export type Client = {
  __typename?: 'Client';
  id?: Maybe<Scalars['ID']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['Date']>;
  CIN?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  isActive?: Maybe<Scalars['Boolean']>;
  age?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
};

export type ClientCreationInput = {
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  dateOfBirth: Scalars['Date'];
  CIN: Scalars['String'];
  address: Scalars['String'];
  phoneNumber: Scalars['String'];
  createdAt: Scalars['Date'];
  isActive: Scalars['Boolean'];
  age: Scalars['Int'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};
