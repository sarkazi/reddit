import { gql } from '@apollo/client'

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query myQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      topic
      created_at
      id
    }
  }
`
