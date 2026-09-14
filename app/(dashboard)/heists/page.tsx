import { Clock8 } from "lucide-react"

export default function HeistsPage() {
  return (
    <div className="page-content">
      <header>
        <h1>
          P<Clock8 className="logo" strokeWidth={2.75} />
          cket Heist
        </h1>
        <p>Tiny missions. Big office mischief.</p>
      </header>
      <div className="active-heists">
        <h2>Your Active Heists</h2>
      </div>
      <div className="assigned-heists">
        <h2>Heists You've Assigned</h2>
      </div>
      <div className="expired-heists">
        <h2>All Expired Heists</h2>
      </div>
    </div>
  )
}
