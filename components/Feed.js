import MiniProfile from './MiniProfile'
import Posts from './Posts'
import Stories from './stories'
import Suggestions from './Suggestions'
import { signIn, signOut, useSession } from 'next-auth/react'

function Feed() {
  const { data: session } = useSession()
  return (
    <div className="m-[2px]">
      <main
        className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${
          !session && '!grid-cols-1 !max-w-3xl'
        }`}
      >
        <section className="col-span-1 md:col-span-2 ">
          {/* //todo add stories and posts */}
          <Stories />
          <Posts />
        </section>
        {session ? (
          <>
            <section className="hidden xl:inline-grid md:col-span-1">
              {/* //todo mini profiles and suggestion */} {''}
              <div className="fixed ">
                <MiniProfile />
                <Suggestions />
              </div>
            </section>
          </>
        ) : (
          <></>
        )}
      </main>
    </div>
  )
}

export default Feed
