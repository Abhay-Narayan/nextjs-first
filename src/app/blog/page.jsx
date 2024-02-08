import PostCard from '@/components/postCard/postcard'
import styles from './blog.module.css'
import { getPosts } from '@/lib/data';

const getData=async()=>{
  const res= await fetch('https://jsonplaceholder.typicode.com/posts');

  if(!res.ok){
    throw new Error('Something Went wrong')
  }
  return res.json()
}

const BlogPage = async () => {
  const posts= await getPosts();
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  )
}

export default BlogPage