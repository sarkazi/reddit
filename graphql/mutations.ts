import { gql } from '@apollo/client'

export const ADD_POST = gql`
  mutation myMutation(
    $body: String!
    $image: String!
    $subreddit_id: ID!
    $title: String!
    $username: String!
  ) {
    insertPost(
      body: $body
      image: $image
      subreddit_id: $subreddit_id
      title: $title
      username: $username
    ) {
      body
      image
      subreddit_id
      title
      username
      created_at
      id
    }
  }
`

export const ADD_SUBREDDIT = gql`
  mutation myMutation($topic: String!) {
    insertPost(topic: $topic) {
      topic
      created_at
      id
    }
  }
`
