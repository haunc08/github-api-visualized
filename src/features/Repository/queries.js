import { gql } from '@apollo/client';

export const GET_ISSUES = gql`
  query GetIssues(
    $owner: String!
    $name: String!
    $first: Int!
    $after: String
  ) {
    repository(owner: $owner, name: $name) {
      id
      stargazerCount
      watchers {
        totalCount
      }
      issues(first: $first, after: $after) {
        pageInfo {
          endCursor
        }
        totalCount
        nodes {
          author {
            login
          }
          createdAt
          id
          title
          bodyText
        }
      }
    }
  }
`;

export const CREATE_ISSUE = gql`
  mutation CreateIssue(
    $repositoryId: String!
    $title: String!
    $body: String!
  ) {
    createIssue(
      input: { repositoryId: $repositoryId, title: $title, body: $body }
    ) {
      issue {
        id
      }
    }
  }
`;
