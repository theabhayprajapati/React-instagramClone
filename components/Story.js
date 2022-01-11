function Story({ name, image }) {
  return (
    <div>
      <img
        className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition-all transform  duration-200 ease-out"
        src={image}
        alt=""
      />
      <p className="text-sm w-14 truncate text-center">{name}</p>
    </div>
  )
}

export default Story
