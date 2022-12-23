import { gql } from '@apollo/client'

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query myQuery($topic: String!) {
    getSubredditByTopic(topic: $topic) {
      topic
      created_at
      id
    }
  }
`

export const GET_POST_BY_ID = gql`
  query myQuery($id: ID!) {
    getPostById(post_id: $id) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      subreddit {
        created_at
        id
        topic
      }
      comment {
        created_at
        id
        post_id
        text
        username
      }
      vote {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`

export const GET_POST_LIST = gql`
  query myQuery {
    getPostList {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      subreddit {
        created_at
        id
        topic
      }
      comment {
        created_at
        id
        post_id
        text
        username
      }
      vote {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`

export const GET_POST_BY_TOPIC = gql`
  query myQuery($topic: String!) {
    getPostsByTopic(topic: $topic) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      comment {
        created_at
        id
        post_id
        text
        username
      }
      vote {
        created_at
        id
        post_id
        upvote
        username
      }
      subreddit {
        created_at
        id
        topic
      }
    }
  }
`

export const GET_VOTES_BY_POST_ID = gql`
  query myQuery($post_id: ID!) {
    getVotesByPostId(post_id: $post_id) {
      created_at
      id
      post_id
      upvote
      username
      post {
        body
        created_at
        id
        image
        subreddit_id
        title
        username
      }
    }
  }
`
