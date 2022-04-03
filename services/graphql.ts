import { GraphQLClient, gql } from "graphql-request";

export const endpoint =
  "https://graphql.contentful.com/content/v1/spaces/81es2xqvgkvu";

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer Z9uN0fGVRjUqaN5s8RhwnFWLGxgPsozt6Y9I0g7Q3UE`,
  },
});
