import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = 'https://api-ap-northeast-1.hygraph.com/v2/cl61kmewb4xf601ut7co10qsk/master';

/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */

// export a default function for API route to work
export default async function asynchandler(req, res) {
  const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NTg4MjQ4MzEsImF1ZCI6WyJodHRwczovL2FwaS1hcC1ub3J0aGVhc3QtMS5oeWdyYXBoLmNvbS92Mi9jbDYxa21ld2I0eGY2MDF1dDdjbzEwcXNrL21hc3RlciIsIm1hbmFnZW1lbnQtbmV4dC5ncmFwaGNtcy5jb20iXSwiaXNzIjoiaHR0cHM6Ly9tYW5hZ2VtZW50LmdyYXBoY21zLmNvbS8iLCJzdWIiOiIwNGE4MzEwNy05M2I2LTQ3YWQtYWM4NC0xNzFkMzZhY2NkZjAiLCJqdGkiOiJjbDYxeGgzczg1NzkzMDF0NzkwNG05aGJvIn0.fGSYGh60VsXkbgfMtPu981Ko41XdjLE9lkBXxTwKyhGEqkh26QKyh_L7n4WUNOsLhZVq-0IE1Nxg3Wv-NHM-nsdGnXITzXpvYVXqJw0imaAsMhGzeZuqkygDXsayU3Ia76s_OK0ki_V-8HUr7Ffl9ILzxe7k1Zzxd1BmSivsKEuJw6OUOVzgyubNRa1yX5qahR4I7dfPQVpBPyETAo_0oyxFmQ4zfQ6peLZQdvfg9nVJ0WWpvTReNAmHMSGCFZoZYM3bvXyysiMU4lVru9ltqdf4FYd3zmHi2OKDz3M4_UcsTlhm7ADKDgpsVuwDyap6w9BItg2a_kumH0tCSJZTFxX5uYR-V9Ew93GOeM0jvQDoFUaMM837oI3G864trNePo826gwxX2l9t0Pq38sLSibd1jqjOkYNu3ERJ1OWKVJppZOZlt9gpTlqKgtoQESNm407Ra61-g4R1a9K-ktjpbDykxXTxkC3YadwxzHTHp3h3e27B3WsauWcOkRpTWhXXjKGXmfthXAlVKQGFBZ8zPqeMHuWUHXnRdcccYmcY60tn1TKkYTtNQiVu8K-6uxUoDmAjNmiIZU8K22i3m1dMZmgkSswa2Tl7tEU_naS1ATIAxAEP2Tf7dm-_WR2-qu9iVdc95xhC_uOOAtbJjqGFbA7U1D8nt-tsSJ9FzMbVjP8';
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;

  const result = await graphQLClient.request(query, {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    slug: req.body.slug,
  });

  return res.status(200).send(result);
}