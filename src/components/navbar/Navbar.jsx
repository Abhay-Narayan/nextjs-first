import Link from "next/link"
import Links from "./links/Links"
import styles from './navbar.module.css'

export const Navbar = () => {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>NEXT</Link>
      <div>
        <Links/>
      </div>
    </div>
  )
}
