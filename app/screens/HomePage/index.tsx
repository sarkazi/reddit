import { useSession } from 'next-auth/react'
import Header from '../../components/Header'
import PostBox from '../../components/PostBox'

const HomePage = () => {
  return (
    <main className="px-[15px] max-w-5xl mt-[30px] grid mx-auto">
      <PostBox />
    </main>
  )
}

export default HomePage
