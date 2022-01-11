import { useEffect, useState } from 'react'

function Suggestions() {
  const [sugesstions, setsugesstions] = useState([])
  useEffect(() => {
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false',
    )
      .then((resp) => resp.json())
      .then((data) => setsugesstions(data))
  }, [])
  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-gray-400">Suggestions for you</h3>
        <button className="text-gray-500 font-bold text-sm">See all</button>
      </div>
      {sugesstions.slice(95, 100).map((sugesstion) => (
        <div
          key={sugesstion.id}
          className="flex items-center justify-between mt-3"
        >
          <img
            src={sugesstion.image}
            className="h-10 w-10  rounded-full border p-[2px]"
            alt=""
          />
          <div>
            <h2 className="font-semibold text-sm">{sugesstion.name}</h2>
            <h2 className="text-xs text-gray-400">
              Works at {sugesstion.symbol.toUpperCase()}
            </h2>
          </div>
          <button className="text-blue-400 font-bold text-sm">Follow</button>
        </div>
      ))}
    </div>
  )
}

export default Suggestions
