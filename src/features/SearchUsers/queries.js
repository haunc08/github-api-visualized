import { gql } from '@apollo/client';

export const SEARCH_USER = gql`
  query SearchUser($searchQuery: String!, $first: Int!, $after: String) {
    search(type: USER, query: $searchQuery, first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      userCount
      nodes {
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
`;

export const GET_USER_REPOS = gql`
  query GetUserRepos($login: String!, $first: Int!, $after: String) {
    user(login: $login) {
      repositories(first: $first, after: $after) {
        pageInfo {
          endCursor
        }
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
