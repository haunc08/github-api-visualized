import { gql } from '@apollo/client';

export const SEARCH_USER = gql`
  query SearchUser {
    search(type: USER, query: "", first: 5) {
      edges {
        cursor
        node {
          ... on User {
            avatarUrl
            name
            bio
          }
        }
      }
    }
  }
`;
