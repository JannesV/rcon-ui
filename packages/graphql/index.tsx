/* eslint-disable */
/* AUTOMATICALLY GENERATED FILE. DO NOT MODIFY. */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Command = {
  __typename?: 'Command';
  command: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  sendCommand: RconResponse;
};


export type MutationSendCommandArgs = {
  command: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  commands: Array<Command>;
  serverInfo: ServerInfo;
};


export type QueryCommandsArgs = {
  search: Scalars['String'];
};

export type RconResponse = {
  __typename?: 'RconResponse';
  text: Scalars['String'];
};

export type ServerInfo = {
  __typename?: 'ServerInfo';
  currentPlayers: Scalars['Float'];
  map: Scalars['String'];
  maxPlayers: Scalars['Float'];
  name: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  log: RconResponse;
  serverInfo: ServerInfo;
};

export type GetCommandsQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type GetCommandsQuery = { __typename?: 'Query', commands: Array<{ __typename?: 'Command', command: string, value?: string | null, description?: string | null }> };

export type GetServerInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetServerInfoQuery = { __typename?: 'Query', serverInfo: { __typename?: 'ServerInfo', name: string, map: string, currentPlayers: number, maxPlayers: number } };

export type LogSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type LogSubscription = { __typename?: 'Subscription', log: { __typename?: 'RconResponse', text: string } };

export type SendCommandMutationVariables = Exact<{
  command: Scalars['String'];
}>;


export type SendCommandMutation = { __typename?: 'Mutation', sendCommand: { __typename?: 'RconResponse', text: string } };

export type ServerInfoSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ServerInfoSubscription = { __typename?: 'Subscription', serverInfo: { __typename?: 'ServerInfo', name: string, map: string, maxPlayers: number, currentPlayers: number } };


export const GetCommandsDocument = gql`
    query getCommands($search: String!) {
  commands(search: $search) {
    command
    value
    description
  }
}
    `;

/**
 * __useGetCommandsQuery__
 *
 * To run a query within a React component, call `useGetCommandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommandsQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetCommandsQuery(baseOptions: Apollo.QueryHookOptions<GetCommandsQuery, GetCommandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommandsQuery, GetCommandsQueryVariables>(GetCommandsDocument, options);
      }
export function useGetCommandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommandsQuery, GetCommandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommandsQuery, GetCommandsQueryVariables>(GetCommandsDocument, options);
        }
export type GetCommandsQueryHookResult = ReturnType<typeof useGetCommandsQuery>;
export type GetCommandsLazyQueryHookResult = ReturnType<typeof useGetCommandsLazyQuery>;
export type GetCommandsQueryResult = Apollo.QueryResult<GetCommandsQuery, GetCommandsQueryVariables>;
export const GetServerInfoDocument = gql`
    query getServerInfo {
  serverInfo {
    name
    map
    currentPlayers
    maxPlayers
  }
}
    `;

/**
 * __useGetServerInfoQuery__
 *
 * To run a query within a React component, call `useGetServerInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServerInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServerInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetServerInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetServerInfoQuery, GetServerInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServerInfoQuery, GetServerInfoQueryVariables>(GetServerInfoDocument, options);
      }
export function useGetServerInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServerInfoQuery, GetServerInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServerInfoQuery, GetServerInfoQueryVariables>(GetServerInfoDocument, options);
        }
export type GetServerInfoQueryHookResult = ReturnType<typeof useGetServerInfoQuery>;
export type GetServerInfoLazyQueryHookResult = ReturnType<typeof useGetServerInfoLazyQuery>;
export type GetServerInfoQueryResult = Apollo.QueryResult<GetServerInfoQuery, GetServerInfoQueryVariables>;
export const LogDocument = gql`
    subscription log {
  log {
    text
  }
}
    `;

/**
 * __useLogSubscription__
 *
 * To run a query within a React component, call `useLogSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLogSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogSubscription({
 *   variables: {
 *   },
 * });
 */
export function useLogSubscription(baseOptions?: Apollo.SubscriptionHookOptions<LogSubscription, LogSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<LogSubscription, LogSubscriptionVariables>(LogDocument, options);
      }
export type LogSubscriptionHookResult = ReturnType<typeof useLogSubscription>;
export type LogSubscriptionResult = Apollo.SubscriptionResult<LogSubscription>;
export const SendCommandDocument = gql`
    mutation sendCommand($command: String!) {
  sendCommand(command: $command) {
    text
  }
}
    `;
export type SendCommandMutationFn = Apollo.MutationFunction<SendCommandMutation, SendCommandMutationVariables>;

/**
 * __useSendCommandMutation__
 *
 * To run a mutation, you first call `useSendCommandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendCommandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendCommandMutation, { data, loading, error }] = useSendCommandMutation({
 *   variables: {
 *      command: // value for 'command'
 *   },
 * });
 */
export function useSendCommandMutation(baseOptions?: Apollo.MutationHookOptions<SendCommandMutation, SendCommandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendCommandMutation, SendCommandMutationVariables>(SendCommandDocument, options);
      }
export type SendCommandMutationHookResult = ReturnType<typeof useSendCommandMutation>;
export type SendCommandMutationResult = Apollo.MutationResult<SendCommandMutation>;
export type SendCommandMutationOptions = Apollo.BaseMutationOptions<SendCommandMutation, SendCommandMutationVariables>;
export const ServerInfoDocument = gql`
    subscription serverInfo {
  serverInfo {
    name
    map
    maxPlayers
    currentPlayers
  }
}
    `;

/**
 * __useServerInfoSubscription__
 *
 * To run a query within a React component, call `useServerInfoSubscription` and pass it any options that fit your needs.
 * When your component renders, `useServerInfoSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServerInfoSubscription({
 *   variables: {
 *   },
 * });
 */
export function useServerInfoSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ServerInfoSubscription, ServerInfoSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ServerInfoSubscription, ServerInfoSubscriptionVariables>(ServerInfoDocument, options);
      }
export type ServerInfoSubscriptionHookResult = ReturnType<typeof useServerInfoSubscription>;
export type ServerInfoSubscriptionResult = Apollo.SubscriptionResult<ServerInfoSubscription>;