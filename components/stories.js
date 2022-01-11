import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Story from './Story'

function Stories({ data }) {
  const { data: session } = useSession()
  const [users, setusers] = useState([])
  useEffect(() => {
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false',
    )
      .then((resp) => resp.json())
      .then((data) => setusers(data))
  }, [])
  return (
    <div className="flex space-x-5 p-6 bg-white md:mt-8 border border-gray-200 rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      {session && (
        <Story image={session?.user?.image} name={session?.user?.username} />
      )}
      {users.map((user) => {
        return <Story key={user.id} name={user.name} image={user.image} />
      })}
    </div>
  )
}

export default Stories
