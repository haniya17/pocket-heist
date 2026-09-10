import styles from "./Skeleton.module.css"

export default function Skeleton() {
  return (
    <div className={`${styles.card} animate-pulse rounded-lg p-6`}>
      <div className="flex items-center gap-4">
        <div className={`${styles.bar} h-16 w-16 shrink-0 rounded-full`} />
        <div className="flex flex-1 flex-col gap-3">
          <div className={`${styles.bar} h-4 w-3/4 rounded-full`} />
          <div className={`${styles.bar} h-4 w-1/2 rounded-full`} />
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <div className={`${styles.bar} h-4 w-full rounded-full`} />
        <div className={`${styles.bar} h-4 w-full rounded-full`} />
        <div className={`${styles.bar} h-4 w-2/3 rounded-full`} />
      </div>
    </div>
  )
}
