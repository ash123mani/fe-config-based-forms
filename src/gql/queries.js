import { gql } from '@apollo/client';

export const GET_NODES = gql`
  query GetNodes {
    nodes {
      name
      apiIdentifier
      _id
    }
  }
`