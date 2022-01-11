import { signIn, signOut, useSession } from 'next-auth/react'

function MiniProfile() {
  const { data: session } = useSession()
  console.log(session)
  return (
    <div className="flex items-center justify-between mt-14 ml-10 ">
      <img
        className="rounded-full p-[2px] border w-16 h-16"
        src={session?.user?.image}
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3 className="text-sm text-gray-400">Dolor elit excepteur</h3>
      </div>
      <button onClick={signOut} className="text-blue-400 text-sm font-semibold">
        Sign Out
      </button>
    </div>
  )
}

export default MiniProfile
