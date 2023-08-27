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

export const ADD_FIELD = gql`
 mutation($nodeId: ID!, $elementType: String!, $basicInfo: BasicInfoInput) {
  addNodeField(nodeId: $nodeId, elementType: $elementType, basicInfo: $basicInfo) {
    nodeId
    elementType
    basicInfo {
      name
      apiIdentifier
    }
  }
}
`