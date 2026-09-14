import { Clock8 } from "lucide-react"
import Link from "next/link"
import styles from "./Navbar.module.css"

export default function Navbar() {
  return (
    <div className={styles.siteNav}>
      <nav>
        <h1>
          <Link href="/heists">
            P<Clock8 className={styles.logo} size={14} strokeWidth={2.75} />
            cket Heist
          </Link>
        </h1>
        <ul>
          <li>
            <Link href="/heists" className={styles.navLink}>
              All Tasks
            </Link>
          </li>
          <li>
            <Link href="/heists?filter=pending" className={styles.navLink}>
              Pending
            </Link>
          </li>
          <li>
            <Link href="/heists?filter=completed" className={styles.navLink}>
              Completed
            </Link>
          </li>
          <li>
            <Link href="/heists/create" className="btn">
              Create Heist
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
