import Post from './Post'

function Posts() {
  const posts = [
    {
      id: '123',
      username: 'abhayprjapar',
      img: 'https://links.papareact.com/3ke',
      userimg: 'https://links.papareact.com/3ke',
      caption:
        'Sunt ipsum officia laboris in reprehenderit consequat magna commodo amet.',
    },
    {
      id: '34',
      username: 'abhayprjapar',
      img: 'https://links.papareact.com/3ke',
      userimg: 'https://links.papareact.com/3ke',
      caption:
        'Sunt ipsum officia laboris in reprehenderit consequat magna commodo amet.',
    },
    {
      id: '98',
      username: 'abhayprjapar',
      img: 'https://links.papareact.com/3ke',
      userimg: 'https://links.papareact.com/3ke',
      caption:
        'Sunt ipsum officia laboris in reprehenderit consequat magna commodo amet.',
    },
    {
      id: '567',
      username: 'abhayprjapar',
      img: 'https://links.papareact.com/3ke',
      userimg: 'https://links.papareact.com/3ke',
      caption:
        'Sunt ipsum officia laboris in reprehenderit consequat magna commodo amet.',
    },
  ]
  return (
    <div>
      {posts.map((psto) => (
        <Post
          key={psto.id}
          username={psto.username}
          img={psto.img}    
          userimg={psto.img}
          caption={psto.caption}
        />
      ))}
    </div>
  )
}

export default Posts
