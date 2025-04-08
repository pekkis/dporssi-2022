import { GraphQLClient } from "graphql-request";

export const endpoint =
  "https://graphql.contentful.com/content/v1/spaces/81es2xqvgkvu";

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`
  }
});
