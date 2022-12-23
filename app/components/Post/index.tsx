import { FC, useEffect, useState } from 'react'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/outline'
import Avatar from '../Avatar'
import TimeAgo from 'react-timeago'
import {
  ChatIcon,
  GiftIcon,
  ShareIcon,
  BookmarkIcon,
  DotsHorizontalIcon,
} from '@heroicons/react/outline'
import ActionPanel from './ActionPanel'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_VOTE, DELETE_POST } from '../../../graphql/mutations'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { fetchApi } from '../../utils/fetchApi'
import { useSession } from 'next-auth/react'
import { Jelly } from '@uiball/loaders'
import {
  GET_POST_BY_ID,
  GET_POST_LIST,
  GET_VOTES_BY_POST_ID,
} from '../../../graphql/queries'
import { useRouter } from 'next/router'

interface IPostProps {
  post: Post
}

const Post: FC<IPostProps> = ({ post }) => {
  const { data: session } = useSession()
  const { asPath } = useRouter()
  const [vote, setVote] = useState<boolean>()

  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: asPath.includes('post')
      ? [GET_POST_BY_ID, 'getPostById']
      : [GET_POST_LIST, 'getPostList'],
  })

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: asPath.includes('post')
      ? [GET_POST_BY_ID, 'getPostById']
      : [GET_POST_LIST, 'getPostList'],
  })

  const { data } = useQuery(GET_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  })

  const deleteFetch = async () => {
    const { data } = await deletePost({
      variables: {
        id: `${post.id}`,
      },
    })
    return data
  }

  useEffect(() => {
    const votes: Vote[] = data?.getVotesByPostId

    const vote = votes?.find(
      (vote) => vote?.username === session?.user?.name
    )?.upvote

    setVote(vote)
  }, [data])

  const VoteFetch = async (variant: boolean) => {
    if (!session) {
      toast('You nedd to sign in to Vote')
    }

    if (vote && variant) return

    if (vote === false && !variant) return

    const { data } = await addVote({
      variables: {
        post_id: `${post.id}`,
        username: `${session?.user?.name}`,
        upvote: variant,
      },
    })

    return data
  }

  if (!post)
    return (
      <div className="flex w-full items-center justify-center text-4xl">
        <Jelly color="#FF4501" />
      </div>
    )

  return (
    <div className="flex  bg-white  rounded-md ">
      <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-3">
        <button
          disabled={!session}
          onClick={() =>
            fetchApi(
              'setting vote...',
              'vote is set',
              'error during setting vote',
              VoteFetch(true)
            )
          }
          className="voteButton"
        >
          <ArrowUpIcon
            className={`${vote && 'text-red-400'} hover:text-red-400`}
          />
        </button>
        <p className="text-sm font-medium">{post?.vote?.length}</p>
        <button
          disabled={!session}
          onClick={() =>
            fetchApi(
              'setting vote...',
              'vote is set',
              'error during setting vote',
              VoteFetch(false)
            )
          }
          className="voteButton"
        >
          <ArrowDownIcon
            className={`${
              vote === false && 'text-blue-400'
            } hover:text-blue-400`}
          />
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center p-3 gap-x-[5px]">
          <Avatar border seed={post?.username} />
          <Link
            href={`subreddit/${post?.subreddit?.topic}`}
            className="font-bold text-[14px] mr-[5px] hover:text-blue-500"
          >
            {post?.subreddit?.topic}
          </Link>
          <span className="text-[14px] text-gray-400 font-medium mr-[5px]">
            Posted by {post?.username}
          </span>
          <TimeAgo
            date={post?.created_at}
            className="text-[14px] text-gray-400 font-medium mr-[5px]"
          />
        </div>
        <Link href={`/post/${post?.id}`}>
          <div className="px-3 pb-3 cursor-pointer">
            <h2 className="text-2xl font-semibold mb-[5px]">{post?.title}</h2>
            <p className="text-md text-gray-800">{post?.body}</p>
          </div>
        </Link>
        {post?.image !== '' && (
          <div className="w-full h-[300px] overflow-hidden">
            <img src={post?.image} alt="post-image" />
          </div>
        )}
        <div className="p-3 flex space-x-6">
          <ActionPanel
            icon={<ChatIcon className="postButton " />}
            info={`${post?.comment?.length} Comments`}
          />
          <ActionPanel icon={<GiftIcon className="postButton " />} />
          <ActionPanel icon={<ShareIcon className="postButton " />} />
          <ActionPanel icon={<BookmarkIcon className="postButton " />} />
          <ActionPanel
            onClick={() =>
              fetchApi(
                'deletting post...',
                'post is deletting',
                'error when deleting a post',
                deleteFetch()
              )
            }
            icon={<DotsHorizontalIcon className="postButton " />}
          />
        </div>
      </div>
    </div>
  )
}

export default Post
