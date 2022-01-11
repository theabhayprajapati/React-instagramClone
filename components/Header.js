import Image from 'next/image'
import {
  SearchIcon,
  PlusCirlcleIcon,
  HeartIcon,
  PaperAirplaneIcon,
  HomeIcon,
  MenuIcon,
  UserGroupIcon,
} from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
function Header() {
  const router = useRouter()
  const { data: session, loading } = useSession()
  console.log(session)
  return (
    <div className="shadow-sm border-b bg-white sticky top-0  z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        <div
          onClick={() => router.push('/')}
          className="relative hidden lg:inline-grid  w-24"
        >
          {/* //todo making the parent relative so that child can follow parent properties */}
          <Image
            objectFit="contain"
            layout="fill"
            src={'https://links.papareact.com/ocw'}
          />
        </div>
        <div
          className="relative lg:hidden w-10 flex-shrink-0"
          onClick={() => router.push('/')}
        >
          {/* //todo making the parent relative so that child can follow parent properties  */}

          {/*  */}

          <Image src={'https://links.papareact.com/jjm'} layout="fill" />
        </div>
        {/* Middle screen */}
        {/* Sarch icons */}
        <div className="max-w-sm">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="search"
              className="w-full pl-10 bg-gray-50 border-gray-300 block sm:text-sm rounded-md focus:ring-black focus:border-black"
              placeholder="Search"
            />
          </div>
        </div>
        {/* Rights */}

        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="headericons" onClick={() => router.push('/')} />
          <MenuIcon className="h-6 cursor-pointer md:hidden" />
          {session ? (
            <>
              <div className="relative headericons">
                <PaperAirplaneIcon className="headericons rotate-45" />
                <div className="absolute bg-red-500 -top-1 -right-2 rounded-full flex items-center justify-center  text-sm text-white w-5 h-5">
                  3
                </div>
              </div>

              <HeartIcon className="headericons" />
              <UserGroupIcon className="headericons" />
              <img
                onClick={signOut}
                src={session.user.image}
                alt="profile pic"
                className="rounded-full cursor-pointer object-contain h-10 w-10 "
              />
            </>
          ) : (
            <>
              <button onClick={signIn} className="text-blue-400">
                SignIn
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
