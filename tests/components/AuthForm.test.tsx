import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi, afterEach } from "vitest"

// component imports
import AuthForm from "@/components/AuthForm"

describe("AuthForm", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("renders email, password, and a Log In button by default", () => {
    render(<AuthForm initialMode="login" />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Log In" })).toBeInTheDocument()
  })

  it("renders a Sign Up button when initialMode is signup", () => {
    render(<AuthForm initialMode="signup" />)

    expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument()
  })

  it("toggles password visibility", async () => {
    const user = userEvent.setup()
    render(<AuthForm initialMode="login" />)

    const passwordInput = screen.getByLabelText("Password")
    expect(passwordInput).toHaveAttribute("type", "password")

    await user.click(screen.getByRole("button", { name: /show password/i }))
    expect(passwordInput).toHaveAttribute("type", "text")

    await user.click(screen.getByRole("button", { name: /hide password/i }))
    expect(passwordInput).toHaveAttribute("type", "password")
  })

  it("logs submitted values to the console and clears the form", async () => {
    const user = userEvent.setup()
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {})
    render(<AuthForm initialMode="login" />)

    await user.type(screen.getByLabelText(/email/i), "test@example.com")
    await user.type(screen.getByLabelText("Password"), "hunter2")
    await user.click(screen.getByRole("button", { name: "Log In" }))

    expect(consoleSpy).toHaveBeenCalledWith({
      mode: "login",
      email: "test@example.com",
      password: "hunter2",
    })
    expect(screen.getByLabelText(/email/i)).toHaveValue("")
    expect(screen.getByLabelText("Password")).toHaveValue("")
  })

  it("links to the signup page when in login mode", () => {
    render(<AuthForm initialMode="login" />)

    const link = screen.getByRole("link", { name: /need an account/i })
    expect(link).toHaveAttribute("href", "/signup")
  })

  it("links to the login page when in signup mode", () => {
    render(<AuthForm initialMode="signup" />)

    const link = screen.getByRole("link", { name: /already have an account/i })
    expect(link).toHaveAttribute("href", "/login")
  })

  it("shows placeholder text for the email and password fields", () => {
    render(<AuthForm initialMode="login" />)

    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText("Enter your password"),
    ).toBeInTheDocument()
  })
})
