import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { FC } from 'react'

interface IAvatarProps {
  seed?: string
  large?: boolean
  border?: boolean
}

const Avatar: FC<IAvatarProps> = ({ seed, large, border }) => {
  const { data: session } = useSession()

  return (
    <div
      className={`w-10 h-10 rounded-full relative bg-white border-gray-300 overflow-hidden mr-[15px] ${
        large && 'w-20 h-20'
      } ${border && 'border-[2px] border-gray-300'}`}
    >
      <Image
        src={`https://avatars.dicebear.com/api/open-peeps/${
          seed || session?.user?.name || 'placeholder'
        }.svg`}
        alt="avatar"
        fill={true}
        className="flex items-center justify-center"
      />
    </div>
  )
}

export default Avatar
