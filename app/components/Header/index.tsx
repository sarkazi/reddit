import Logo from './Logo'
import {
  StarIcon,
  ChevronDownIcon,
  HomeIcon,
  SearchIcon,
  MenuIcon,
} from '@heroicons/react/solid'
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline'
import NavIcons from './NavIcons'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

const Header = () => {
  const { data: session } = useSession()

  return (
    <header className="py-2 px-4 flex bg-white items-center bg-gradient-to-b from-white to-slate-100">
      <Logo />

      <div className="flex items-center xl:min-w-[250px] mx-[20px]">
        <HomeIcon className="w-6" />
        <p className="flex-1 hidden lg:inline ml-2">Home</p>
        <button className="cursor-pointer">
          <ChevronDownIcon className="w-6" />
        </button>
      </div>

      <form className="flex flex-1 items-center bg-gray-50 border-[1px] border-gray-300 rounded-[20px] overflow-hidden p-2 mr-[30px]">
        <SearchIcon className="w-6 text-gray-300 mr-[10px]" />
        <input
          className="border-none outline-none bg-transparent w-full"
          type="text"
          placeholder="Search Reddit"
        />
        <button type="submit"></button>
      </form>

      <nav className="hidden lg:inline-flex items-center">
        <ul className="flex items-center gap-x-[10px]">
          <NavIcons icon={<SparklesIcon className="nav-icon" />} />
          <NavIcons icon={<GlobeIcon className="nav-icon" />} />
          <NavIcons icon={<VideoCameraIcon className="nav-icon" />} />
          <NavIcons icon={<ChatIcon className="nav-icon" />} />
          <NavIcons icon={<BellIcon className="nav-icon" />} />
          <NavIcons icon={<PlusIcon className="nav-icon" />} />
          <NavIcons icon={<SpeakerphoneIcon className="nav-icon" />} />
        </ul>
      </nav>

      {!session ? (
        <button
          onClick={() => signIn()}
          className="bg-[#ff4500] rounded-3xl h-full px-[20px] items-center justify-center py-[8px] text-white ml-[20px] hidden lg:flex"
        >
          <span className="font-medium">Login</span>
        </button>
      ) : (
        <button
          onClick={() => signOut()}
          className="flex items-center min-w-[200px] ml-7 bg-slate-50 py-[6px] px-[8px] border-[1px] border-gray-200 cursor-pointer hover:border-gray-300"
        >
          <Image
            src="https://styles.redditmedia.com/t5_7m29co/styles/profileIcon_snoo6bda7b7c-6401-4b6f-8148-750a57be0e93-headshot.png?width=256&height=256&frame=1&crop=256:256,smart&s=c7aeebc66e9caf2070096b875ae35b8764113fcd"
            alt="avatar"
            width={30}
            height={20}
            className="mr-[5px]"
          />
          <p className="flex-1 text-[13px] font-medium justify-self-start text-left">
            {session?.user?.name}
          </p>
          <button>
            <ChevronDownIcon className="w-6" />
          </button>
        </button>
      )}
      <button className="cursor-pointer ml-[30px]">
        <MenuIcon className="w-7 lg:hidden" />
      </button>
    </header>
  )
}

export default Header
