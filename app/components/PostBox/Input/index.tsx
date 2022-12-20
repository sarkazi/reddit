import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { FormData } from '../index'

type InputProps = {
  type: 'subreddit' | 'body' | 'title' | 'image'
  text: string
  pt?: boolean
  placeholder: string
}

const Input: FC<InputProps> = ({ type, text, pt, placeholder }) => {
  const {
    register,
    formState: { errors },
  } = useForm<FormData>()

  return (
    <div
      className={`${pt && 'pt-[10px] px-3'} items-center grid-variant-formdata`}
    >
      <h2 className="mr-[60px]">{text}:</h2>
      <input
        {...register(type, { required: true })}
        type="text"
        placeholder={placeholder}
        className="py-2 px-4 bg-blue-50 flex-1 text-black border-none outline-none rounded-[10px]"
      />
    </div>
  )
}

export default Input
