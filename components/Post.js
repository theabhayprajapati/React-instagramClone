import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconfilled } from '@heroicons/react/solid'
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'

import Moment from 'react-moment'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { db } from './Firebase'
import { async } from '@firebase/util'
function Post({ id, username, userimg, caption, img }) {
  const { data: session, loading } = useSession()
  const [comments, setcomments] = useState([])
  const [comment, setcomment] = useState('')
  const [hasLiked, sethasLiked] = useState(false)
  const [likes, setlikes] = useState([])
  useEffect(() => {
    // ! OnSnapShot because it will give implicit === instance return to the value we want return to the
    onSnapshot(
      query(
        collection(db, 'posts', id, 'comments'),
        orderBy('timestamp', 'desc'),
      ),
      (snapshot) => setcomments(snapshot.docs),
    )
  }, [db, id])

  useEffect(() => {
    onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
      setlikes(snapshot.docs),
    )
  }, [db, id])
  useEffect(
    () =>
      sethasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1,
      ),
    [likes],
  )

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user?.uid))
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user?.uid), {
        username: session.user.username,
      })
    }
  }

  const sendComment = async (e) => {
    e.preventDefault()
    // ? we dn
    const commentToSend = comment
    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user?.username,
      userimg: session.user?.image,
      timestamp: serverTimestamp(),
    })
    setcomment('')
  }
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
      {session && (
        <>
          <div className="flex space-x-4 justify-between pt-4 px-4">
            <div className="flex space-x-4">
              {hasLiked ? (
                <HeartIconfilled
                  onClick={likePost}
                  className="postbtn text-red-500  "
                />
              ) : (
                <HeartIcon onClick={likePost} className="postbtn " />
              )}

              <PaperAirplaneIcon className="postbtn" />
              <ChatIcon className="postbtn" />
            </div>
            <BookmarkIcon className="postbtn" />
          </div>
        </>
      )}
      {/* caption */}
      <p className="p-5 truncate ">
        <span className="font-bold mr-2">{username}</span>
        {caption}
      </p>
      {/* //todo: add comments */}
      {/* commmnets */}

      {comments.length > 0 && (
        <>
          <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-slate-400 scrollbar-thin">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-center space-x-2 mb-3"
              >
                <img
                  src={comment.data().userimg}
                  alt=""
                  className="h-7  rounded-full"
                />
                <p className="flex-1">
                  {' '}
                  <span className="font-bold mr-2">
                    {comment.data().username}
                  </span>
                  {comment.data().comment}
                </p>
                <Moment className="text-xs pr-5" fromNow>
                  {comment.data().timestamp?.toDate()}
                </Moment>
              </div>
            ))}
          </div>
        </>
      )}
      {/* input boc */}
      <div>
        {session && (
          <>
            <form className="flex justify-around items-center p-4" action="">
              <EmojiHappyIcon className="postbtn" />
              <input
                type="text"
                value={comment}
                onChange={(e) => {
                  setcomment(e.target.value)
                }}
                name=""
                placeholder="Add a commnet..."
                className="border-none flex-1 focus:ring-0 outline-none"
                id=""
              />
              <button
                type="submit"
                disabled={!comment.trim()}
                onClick={(e) => {
                  sendComment(e)
                }}
                className="font-semibold text-blue-400"
              >
                Post
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default Post
