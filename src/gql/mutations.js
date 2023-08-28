import { gql } from '@apollo/client';

export const ADD_NODE = gql`
  mutation AddNode($name: String!, $apiIdentifier: String!) {
    addNode(name: $name, apiIdentifier: $apiIdentifier) {
      _id
      name
      apiIdentifier
    }
  }
`;

export const ADD_FIELD = gql`
 mutation($nodeId: ID!, $elementType: String!, $basicInfo: BasicInfoInput) {
  addNodeField(nodeId: $nodeId, elementType: $elementType, basicInfo: $basicInfo) {
    _id
    nodeId
    elementType
    basicInfo {
      name
      apiIdentifier
    }
  }
}
`

export const UPDATE_FIELD = gql`
  mutation($_id: ID!, $basicInfo: BasicInfoInput, $validations: ValidationsInput) {
  updateNodeField(_id: $_id, basicInfo: $basicInfo, validations: $validations) {
    _id
    nodeId
    elementType
    basicInfo {
      name
      apiIdentifier
    }
    validations {
      required
    }
  }
}
`