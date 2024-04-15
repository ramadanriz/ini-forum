/**
 * - Leaderboards spec
 *   - should display leaderboards page correctly
 */

describe("Leaderboards spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/leaderboards")
  })

  it("should display leaderboards page correctly", () => {
    cy.get("h1").should("contain", "Leaderboards")
  })
})
