import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconfilled } from '@heroicons/react/solid'
function Post({ username, userimg, caption, img }) {
  return (
    <div className="bg-white my-7 rounded-sm ">
      {/* header */}
      <div className="flex items-center p-5">
        <img
          src={userimg}
          className="rounded-full h-12 w-12  object-contain border p-1 mr-3"
          alt=""
        />

        <p className="flex-1 font-bold">{username}</p>

        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* img */}
      <img src={img} alt="" className="object-cover w-full" />
      {/* button */}
      <div className="flex space-x-4 justify-between pt-4 px-4">
        <div className="flex space-x-4">
          <HeartIconfilled className="postbtn  text-red-500 " />
          <PaperAirplaneIcon className="postbtn" />
          <ChatIcon className="postbtn" />
        </div>
        <BookmarkIcon className="postbtn" />
      </div>

      {/* caption */}
      <p className="p-5 truncate ">
        <span className="font-bold mr-2">{username}</span>
        {caption}
      </p>
      {/* //todo: add comments */}
      {/* commmnets */}
      {/* input boc */}
      <div>
        <form className="flex justify-around items-center p-4" action="">
          <EmojiHappyIcon className="postbtn" />
          <input
            type="text"
            name=""
            placeholder="Add a commnet..."
            className="border-none flex-1 focus:ring-0 outline-none"
            id=""
          />
          <button type="submit" className="font-semibold text-blue-400">
            Post
          </button>
        </form>
      </div>
    </div>
  )
}

export default Post
