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
  greeting?: Maybe<Scalars['String']>;
  allClients?: Maybe<Array<Maybe<Client>>>;
  findClientByIdOrEmail?: Maybe<Client>;
  login: Scalars['String'];
  regenerateToken: Message;
};


export type QueryFindClientByIdOrEmailArgs = {
  id?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  userPassword: Scalars['String'];
};


export type QueryRegenerateTokenArgs = {
  email: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addClient: Client;
  deleteClientById?: Maybe<Client>;
  updateClient: Client;
  signup: Scalars['String'];
  activeAccount?: Maybe<Scalars['Boolean']>;
};


export type MutationAddClientArgs = {
  client: ClientCreationInput;
};


export type MutationDeleteClientByIdArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateClientArgs = {
  client: ClientUpdateInput;
};


export type MutationSignupArgs = {
  client: ClientCreationInput;
};


export type MutationActiveAccountArgs = {
  email: Scalars['String'];
  otpCode: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  code: Scalars['Int'];
  content: Scalars['String'];
  data?: Maybe<Array<Scalars['String']>>;
};


export type Client = {
  __typename?: 'Client';
  _id?: Maybe<Scalars['ID']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['Date']>;
  CIN?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  age?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
};

export type ClientCreationInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  dateOfBirth: Scalars['Date'];
  CIN: Scalars['String'];
  address: Scalars['String'];
  phoneNumber: Scalars['String'];
  age: Scalars['Int'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};

export type ClientUpdateInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  dateOfBirth: Scalars['Date'];
  CIN: Scalars['String'];
  address: Scalars['String'];
  phoneNumber: Scalars['String'];
  isActive: Scalars['Boolean'];
  age: Scalars['Int'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};
