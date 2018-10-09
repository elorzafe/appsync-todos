import './App.css'

import AWSAppSyncClient from 'aws-appsync'
import { graphqlMutation, Rehydrated } from 'aws-appsync-react'
import React, { Component } from 'react'
import { ApolloProvider, graphql } from 'react-apollo'

import AppSyncConfig from './aws-exports'
import ListTodos from './GraphQLAllTodos'
import NewTodo from './GraphQLNewTodo'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AllTodosWithData />
        <AddTodoOffline />
      </div>
    );
  }
}

const client = new AWSAppSyncClient({
  url: AppSyncConfig.graphqlEndpoint,
  region: AppSyncConfig.region,
  auth: {
    type: AppSyncConfig.authenticationType,
    apiKey: AppSyncConfig.apiKey
  }
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
);

export default WithProvider;
