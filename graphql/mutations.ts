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
    insertSubreddit(topic: $topic) {
      topic
      created_at
      id
    }
  }
`

export const ADD_VOTE = gql`
  mutation myMutation($post_id: ID!, $username: String!, $upvote: Boolean!) {
    insertVote(post_id: $post_id, username: $username, upvote: $upvote) {
      created_at
      id
      post_id
      upvote
      username
      post {
        body
        id
        created_at
        image
        subreddit_id
        title
        username
      }
    }
  }
`

export const DELETE_POST = gql`
  mutation myMutation($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

export const ADD_COMMENT = gql`
  mutation myMutation($username: String!, $post_id: ID!, $text: String!) {
    insertComment(username: $username, post_id: $post_id, text: $text) {
      created_at
      id
      post_id
      text
      username
    }
  }
`
