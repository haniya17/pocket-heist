// this page should be used only as a splash page to decide where a user should be navigated to
// when logged in --> to /heists
// when not logged in --> to /login

import { Clock8 } from "lucide-react"

export default function Home() {
  return (
    <div className="center-content">
      <div className="page-content">
        <h1>
          P<Clock8 className="logo" strokeWidth={2.75} />cket heist
        </h1>
        <div>Tiny missions. Big office mischief.</div>
        <p className="intro-text">
          Assign your coworkers ridiculous little tasks, set a deadline, and
          watch the chaos unfold. Sneak a sticky note onto someone&apos;s
          monitor, swap their mouse hand, or start a rumor by the coffee
          machine — every heist completed earns bragging rights (and maybe a
          little office infamy).
        </p>
      </div>
    </div>
  )
}
