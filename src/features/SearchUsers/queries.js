import { gql } from '@apollo/client';

export const SEARCH_USER = gql`
  query SearchUser($searchQuery: String!, $after: String) {
    search(type: USER, query: $searchQuery, first: 5, after: $after) {
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      userCount
      edges {
        cursor
        node {
          ... on User {
            avatarUrl
            name
            login
            repositories {
              totalCount
            }
          }
        }
      }
    }
  }
`;

export const GET_USER_REPOS = gql`
  query SearchUser($login: String!) {
    user(login: $login) {
      repositories(first: 5) {
        nodes {
          name
          description
          stargazerCount
          watchers {
            totalCount
          }
        }
      }
    }
  }
`;
