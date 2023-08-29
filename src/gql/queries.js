import { gql } from '@apollo/client';

export const GET_NODES = gql`
  query GetNodes {
    nodes {
      name
      apiIdentifier
      _id
    }
  }
`;

export const GET_NODE_FIELDS = gql`
  query ($nodeId: ID!) {
    nodeFields(nodeId: $nodeId) {
      _id
      nodeId
      elementType
      basicInfo {
        name
        apiIdentifier
      }
      validations {
        required
        errorMsg
      }
    }
  }
`;
