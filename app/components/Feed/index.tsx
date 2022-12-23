import { useQuery } from '@apollo/client'
import client from '../../../apollo-client'
import { GET_POST_BY_TOPIC, GET_POST_LIST } from '../../../graphql/queries'
import Post from '../Post'
import { ApolloError } from '@apollo/client/errors'
import { FC, useEffect } from 'react'

interface IFeedProps {
  topic?: string
}

const Feed: FC<IFeedProps> = ({ topic }) => {
  const { data } = !topic
    ? useQuery(GET_POST_LIST)
    : useQuery(GET_POST_BY_TOPIC, {
        variables: {
          topic,
        },
      })

  const posts: Post[] = !topic ? data?.getPostList : data?.getPostsByTopic

  return (
    <section className="space-y-4 flex flex-col">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  )
}

export default Feed
