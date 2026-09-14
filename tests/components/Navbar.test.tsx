import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

// component imports
import Navbar from "@/components/Navbar"

describe("Navbar", () => {
  it("renders the main heading", () => {
    render(<Navbar />)

    const heading = screen.getByRole("heading", { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it("renders the Create Heist link", () => {
    render(<Navbar />)

    const createLink = screen.getByRole("link", { name: /create heist/i })
    expect(createLink).toBeInTheDocument()
    expect(createLink).toHaveAttribute("href", "/heists/create")
  })

  it("renders the All Tasks, Pending, and Completed filter links", () => {
    render(<Navbar />)

    expect(screen.getByRole("link", { name: "All Tasks" })).toHaveAttribute(
      "href",
      "/heists",
    )
    expect(screen.getByRole("link", { name: "Pending" })).toHaveAttribute(
      "href",
      "/heists?filter=pending",
    )
    expect(screen.getByRole("link", { name: "Completed" })).toHaveAttribute(
      "href",
      "/heists?filter=completed",
    )
  })
})
