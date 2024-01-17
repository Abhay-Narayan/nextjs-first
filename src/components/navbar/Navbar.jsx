import Link from "next/link"


export const Navbar = () => {
  return (
    <div>
      <div>
        BLOG
      </div>
      <div>
        <Link href='/about'>About</Link>
      </div>
    </div>
  )
}
