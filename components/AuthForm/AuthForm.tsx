"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import styles from "./AuthForm.module.css"

type AuthMode = "login" | "signup"

type AuthFormProps = {
  initialMode: AuthMode
}

export default function AuthForm({ initialMode }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const isLogin = initialMode === "login"

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log({ mode: initialMode, email, password })
    setEmail("")
    setPassword("")
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className="form-title">
        {isLogin ? "Log in to Your Account" : "Signup for an Account"}
      </h2>

      <label className={styles.label} htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.field}
      />

      <label className={styles.label} htmlFor="password">
        Password
      </label>
      <div className={styles.passwordWrapper}>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          required
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.field}
        />
        <button
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={() => setShowPassword((v) => !v)}
          className={styles.toggle}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <button type="submit" className="btn">
        {isLogin ? "Log In" : "Sign Up"}
      </button>

      <Link href={isLogin ? "/signup" : "/login"} className={styles.switch}>
        {isLogin
          ? "Need an account? Sign up"
          : "Already have an account? Log in"}
      </Link>
    </form>
  )
}
