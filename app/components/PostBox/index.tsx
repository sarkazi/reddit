import { useSession } from 'next-auth/react'
import Avatar from '../Avatar'
import { PhotographIcon, LinkIcon } from '@heroicons/react/outline'
import { useForm } from 'react-hook-form'
import Input from './Input'
import { FC, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_POST, ADD_SUBREDDIT } from '../../../graphql/mutations'
import client from '../../../apollo-client'
import { GET_POST_LIST, GET_SUBREDDIT_BY_TOPIC } from '../../../graphql/queries'
import toast from 'react-hot-toast'

export type FormData = {
  title: string
  body: string
  image: string
  subreddit: string
}

interface IPostBoxProps {
  subreddit?: string
}

const PostBox: FC<IPostBoxProps> = ({ subreddit }) => {
  const { data: session } = useSession()
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false)

  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_POST_LIST, 'getPostList'],
  })
  const [addSubreddit] = useMutation(ADD_SUBREDDIT)

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async (formData) => {
    const notification = toast.loading('creating new post...')
    try {
      const {
        data: { getSubredditByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: subreddit || formData.subreddit,
        },
      })

      const subredditExist = getSubredditByTopic

      const image = formData.image || ''

      if (!subredditExist) {
        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: subreddit || formData.subreddit,
          },
        })

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            title: formData.title,
            body: formData.body,
            subreddit_id: newSubreddit.id,
            username: session?.user?.name,
            image: image,
          },
        })
      } else {
        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            title: formData.title,
            body: formData.body,
            subreddit_id: getSubredditByTopic.id,
            username: session?.user?.name,
            image: image,
          },
        })
      }

      setValue('title', '')
      setValue('body', '')
      setValue('image', '')
      setValue('subreddit', '')

      toast.success('New post created!', {
        id: notification,
      })
    } catch (err) {
      console.log('something went wrong', err)
      toast.error('Whooops something went wrong', {
        id: notification,
      })
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      className="sticky z-50 top-16 bg-white border rounded-md border-gray-200 py-2 pl-2 pr-5 flex flex-col mb-[20px] w-full"
    >
      <div className="flex items-center">
        <Avatar />
        <input
          {...register('title', { required: true })}
          className="border-none outline-none w-full flex-1 bg-gray-50 py-[10px] rounded-[10px] px-3"
          disabled={!session}
          type="text"
          placeholder={
            session
              ? subreddit
                ? `Create post in ${subreddit}`
                : 'Create a post by entering a title!'
              : 'Sign in to post'
          }
        />
        <button className="cursor-pointer mr-[20px] ml-[20px]">
          <PhotographIcon
            onClick={(e) => {
              setImageBoxOpen(!imageBoxOpen), e.preventDefault()
            }}
            className={`${!session && 'hidden'} ${
              imageBoxOpen && !!watch('title') && 'text-blue-300'
            } w-6 text-gray-300`}
          />
        </button>
        <button className="cursor-pointer">
          <LinkIcon className="w-6 text-gray-300" />
        </button>
      </div>

      {!!watch('title') && (
        <div className="flex flex-col mt-[15px] px-[10px]">
          <div className={`pt-[10px] items-center grid-variant-formdata`}>
            <h2 className="mr-[60px]">Body:</h2>
            <input
              {...register('body', { required: true })}
              type="text"
              placeholder="Text (optional)"
              className="py-2 px-4 bg-blue-50 flex-1 text-black border-none outline-none rounded-[10px]"
            />
          </div>

          {!subreddit && (
            <div className={`pt-[10px] items-center grid-variant-formdata`}>
              <h2 className="mr-[60px]">Subreddit:</h2>
              <input
                {...register('subreddit', { required: true })}
                type="text"
                placeholder="I.e. React.js"
                className="py-2 px-4 bg-blue-50 flex-1 text-black border-none outline-none rounded-[10px]"
              />
            </div>
          )}
        </div>
      )}
      {!!watch('title') && imageBoxOpen && (
        <div
          className={`pt-[10px] items-center grid-variant-formdata px-[10px] mb-[10px]`}
        >
          <h2 className="mr-[60px]">Image:</h2>
          <input
            {...register('image', { required: false })}
            type="text"
            placeholder="Insert link to incredible image..."
            className="py-2 px-4 bg-blue-50 flex-1 text-black border-none outline-none rounded-[10px]"
          />
        </div>
      )}

      {watch('title') && Object.keys(errors).length > 0 && (
        <div className=" text-red-500 self-center">
          {errors.title?.type === 'required' && <p>A post title is required</p>}
          {errors.subreddit?.type === 'required' && (
            <p>A subreddit is required</p>
          )}
        </div>
      )}

      {!!watch('title') && (
        <button
          type="submit"
          className=" bg-blue-500 flex items-center justify-center text-white rounded-[20px] py-[6px] px-[25px] mt-[10px]"
        >
          Create Post
        </button>
      )}
    </form>
  )
}

export default PostBox
