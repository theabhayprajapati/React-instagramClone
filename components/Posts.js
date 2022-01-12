import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from './firebase'
import Post from './Post'

function Posts() {
  const [posts, setposts] = useState([])
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setposts(snapshot.docs)
        },
      ),
    [db],
  )
        
  return (
    <div>
      {posts.map((psto) => (
        <Post
          key={psto.id}
          id={psto.id}
          username={psto.data().username}
          img={psto.data().image}
          userimg={psto.data().profileimage}
          caption={psto.data().caption}
        />
      ))}
    </div>
  )
}

export default Posts
