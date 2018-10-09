import './App.css'

import AWSAppSyncClient from 'aws-appsync'
import { graphqlMutation, Rehydrated } from 'aws-appsync-react'
import React, { Component } from 'react'
import { ApolloProvider, graphql } from 'react-apollo'

import AppSyncConfig from './aws-exports'
import ListTodos from './GraphQLAllTodos'
import NewTodo from './GraphQLNewTodo'

class AddTodo extends Component {
  state = { name: "", description: "" };

  onChange(event, type) {
    this.setState({
      [type]: event.target.value
    });
  }
  render() {
    return (
      <div>
        <input onChange={event => this.onChange(event, "name")} />
        <input onChange={event => this.onChange(event, "description")} />
        <button
          onClick={() =>
            this.props.createTodo({
              name: this.state.name,
              description: this.state.description,
              status: "pending"
            })
          }
        >
          Add
        </button>
      </div>
    );
  }
}

const AddTodoOffline = graphqlMutation(NewTodo, ListTodos, "Todo")(AddTodo);
// The way graphqlMutation works is it takes in 3 required arguments:
// - The mutation to run
// - One or more queries to update in the cache
// - The GraphQL response signature of the mutation(__typename)
// There are also 2 optional arguments:
// - The name of the 'id' field, if you are not using id on the type
// - An operationType override if you do not want to infer actions such as "add" or "update" from the mutation name

class Todos extends Component {
  render() {
    const { listTodos, refetch } = this.props.data;
    return (
      <div>
        <button onClick={() => refetch()}>Refresh</button>
        <ul>
          {listTodos &&
            listTodos.items.map(todo => (
              <li key={todo.id}>{todo.id + " name: " + todo.name}</li>
            ))}
        </ul>
      </div>
    );
  }
}
const AllTodosWithData = graphql(ListTodos)(Todos);

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
