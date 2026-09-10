import styles from "./Avatar.module.css"

function getInitials(name: string): string {
  const isPascalCase = /^[A-Z][a-z]*(?:[A-Z][a-z]*)+$/.test(name)

  if (isPascalCase) {
    const uppercaseLetters = name.match(/[A-Z]/g) ?? []
    return uppercaseLetters.slice(0, 2).join("")
  }

  return name.charAt(0).toUpperCase()
}

type AvatarProps = {
  name: string
}

export default function Avatar({ name }: AvatarProps) {
  return (
    <div className={`${styles.avatar} flex h-12 w-12 items-center justify-center rounded-full font-semibold text-heading`}>
      {getInitials(name)}
    </div>
  )
}
