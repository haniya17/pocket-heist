// preview page for newly created UI components

import Skeleton from "@/components/Skeleton"
import Avatar from "@/components/Avatar"

export default function PreviewPage() {
  return (
    <div className="page-content">
      <h2>Preview</h2>

      <h3 className="mt-6">Skeleton</h3>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>

      <h3 className="mt-10">Avatar</h3>
      <div className="mt-6 flex gap-4">
        <Avatar name="alice" />
        <Avatar name="JohnDoe" />
        <Avatar name="sam" />
      </div>
    </div>
  )
}
