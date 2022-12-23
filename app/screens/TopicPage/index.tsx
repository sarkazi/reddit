import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { findAncestor } from 'typescript'
import { GET_POST_LIST } from '../../../graphql/queries'
import Avatar from '../../components/Avatar'
import Feed from '../../components/Feed'
import Post from '../../components/Post'
import PostBox from '../../components/PostBox'

const TopicPage: FC = () => {
  const { data } = useQuery(GET_POST_LIST)

  const {
    query: { topic },
  } = useRouter()

  const posts: Post[] = data?.getPostList

  return (
    <main className="max-w-full grid mx-auto">
      <div className=" bg-gradient-to-br from-red-400 to-red-500 h-[80px]"></div>
      <div className="bg-white px-10 mb-[20px] pt-[10px] pb-[20px] rounded-b-[8px]">
        <div className="max-w-5xl mx-auto flex gap-x-5">
          <div className="-mt-12">
            <Avatar large seed={topic as string} />
          </div>
          <div className="flex flex-col gap-y-[5px]">
            <h1 className="text-[34px] font-bold">
              Welcome to the <span className="text-red-500">r/{topic}</span>{' '}
              subreddit
            </h1>
            <p className="text-[18px]">r/{topic}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full">
        <PostBox subreddit={topic as string} />
        <Feed topic={topic as string} />
      </div>
    </main>
  )
}

export default TopicPage
