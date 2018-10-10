import gql from 'graphql-tag'


export default gql`
  mutation($name: String, $description: String, $status: String) {
    createTodo(
      input: { name: $name, description: $description, status: $status }
    ) {
      id
      name
      description
      status
    }
  }
`;
