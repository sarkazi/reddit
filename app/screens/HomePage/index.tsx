import { useSession } from 'next-auth/react'
import Feed from '../../components/Feed'
import Header from '../../components/Header'
import PostBox from '../../components/PostBox'

const HomePage = () => {
  return (
    <main className="px-[15px] max-w-5xl mt-[30px] grid mx-auto">
      <PostBox />
      <div className="grid-variant-homepage">
        <Feed />
        <div className="bg-white sticky top-36 rounded-[8px] p-3">
          <p>Top communities</p>
        </div>
      </div>
    </main>
  )
}

export default HomePage
