import { gql } from '@apollo/client';

export const ADD_NODE = gql`
  mutation AddNode($name: String!, $displayName: String!) {
    addNode(name: $name, displayName: $displayName) {
      _id
      name
      displayName
    }
  }
`;