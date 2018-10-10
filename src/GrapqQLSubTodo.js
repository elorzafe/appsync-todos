import gql from 'graphql-tag'

export default gql`subscription onCreateTodo {
	onCreateTodo {
    id
    description
    name
    status
  }
}`