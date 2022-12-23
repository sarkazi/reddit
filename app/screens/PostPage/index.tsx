import { useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ADD_COMMENT } from '../../../graphql/mutations'
import { GET_POST_BY_ID } from '../../../graphql/queries'
import Avatar from '../../components/Avatar'
import Post from '../../components/Post'
import { fetchApi } from '../../utils/fetchApi'
import TimeAgo from 'react-timeago'

type FormData = {
  text: string
}

const PostPage = () => {
  const { data: session } = useSession()

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_ID, 'getPostById'],
  })

  const {
    query: { postid },
  } = useRouter()

  const { data } = useQuery(GET_POST_BY_ID, {
    variables: {
      id: postid,
    },
  })

  const post: Post = data?.getPostById

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  const addCommentApi = async (text: string) => {
    const { data } = await addComment({
      variables: {
        username: session?.user?.name,
        post_id: post.id,
        text,
      },
    })
    return data
  }

  const commentSubmit = handleSubmit(async (data) => {
    fetchApi(
      'sending comment...',
      'comment is send successfully',
      'error during sending of comment',
      addCommentApi(data.text)
    )
    setValue('text', '')
  })

  return (
    <main className="max-w-5xl mx-auto my-[30px]">
      <Post post={post} />
      <section className="bg-white mt-[15px] rounded-[8px]">
        <form onSubmit={commentSubmit} className=" w-full p-[20px] pb-[35px]">
          <h3 className="mb-[15px] font-medium">
            Comment as{' '}
            <span className="text-red-500">{session?.user?.name}</span>
          </h3>
          <textarea
            {...register('text', { required: true })}
            disabled={!session}
            placeholder={
              session
                ? 'please enter your comment bro!'
                : 'Bro, you need to sign in. Whats Up!'
            }
            className="border-gray-200 outline-gray-200 border-1 w-full p-3 rounded-[7px] disabled:bg-gray-50 mb-[15px]"
          ></textarea>
          <button
            type="submit"
            disabled={!session || !watch('text')}
            className="w-full rounded-[30px] bg-red-500 text-white py-[10px] disabled:bg-gray-200"
          >
            Send comment
          </button>
        </form>
        <hr />
        <ul className="space-y-[10px] px-[50px] pt-[20px] pb-[30px]">
          {post?.comment?.map((el) => (
            <li key={el?.id} className="flex items-start p-[10px] relative">
              <hr className="absolute top-10 left-[30px] z-0 h-16 border bg-gray-300" />
              <div>
                <Avatar seed={el?.username} />
              </div>
              <div className="flex flex-col gap-y-[20px]">
                <div className="flex items-center">
                  <p className="text-[13px] font-semibold">{el?.username}</p>
                  <TimeAgo
                    className="text-[13px] text-gray-400"
                    date={el?.created_at}
                  />
                </div>
                <p className="text-[18px] font-semibold">{el?.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default PostPage
