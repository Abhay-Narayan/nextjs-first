import Image from "next/image"
import styles from "./postCard.module.css"
import Link from "next/link"

const PostCard = ({post}) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.imgContainer}>
          <Image src='/post.png' alt="" fill className={styles.img}/>
        </div>
        <span className={styles.date}>01.20.2004</span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>Heyyy</h1>
        <p className={styles.desc}>This is the dummy data only used for the development purposes</p>
      </div>
    </div>
  )
}

export default PostCard