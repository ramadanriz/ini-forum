/**
 * - Register spec
 *   - should display register page correctly
 *   - should display alert when name is empty
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email is already taken
 *   - should display login page when email is not already taken
 */

const dateNow = Date.now()

describe("Register spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/register")
  })

  it("should display register page correctly", () => {
    cy.get('input[placeholder="Name"]').should("be.visible")
    cy.get('input[placeholder="Email"]').should("be.visible")
    cy.get('input[placeholder="Password"]').should("be.visible")
    cy.get("button")
      .contains(/^Register$/)
      .should("be.visible")
  })

  it("should display alert when name is empty", () => {
    cy.get("button")
      .contains(/^Register$/)
      .click()

    cy.on("window:alert", (str) => {
      expect(str).to.equal('"name" is not allowed to be empty')
    })
  })

  it("should display alert when email is empty", () => {
    cy.get('input[placeholder="Name"]').type(`${dateNow}name`)

    cy.get("button")
      .contains(/^Register$/)
      .click()

    cy.on("window:alert", (str) => {
      expect(str).to.equal('"email" is not allowed to be empty')
    })
  })

  it("should display alert when password is empty", () => {
    cy.get('input[placeholder="Name"]').type(`${dateNow}name`)
    cy.get('input[placeholder="Email"]').type(`${dateNow}@gmail.com`)

    cy.get("button")
      .contains(/^Register$/)
      .click()

    cy.on("window:alert", (str) => {
      expect(str).to.equal('"password" is not allowed to be empty')
    })
  })

  it("should display alert when email is already taken", () => {
    cy.get('input[placeholder="Name"]').type(`${dateNow}name`)
    cy.get('input[placeholder="Email"]').type("testemail@gmail.com")
    cy.get('input[placeholder="Password"]').type(`${dateNow}password`)

    cy.get("button")
      .contains(/^Register$/)
      .click()

    cy.on("window:alert", (str) => {
      expect(str).to.equal("email is already taken")
    })
  })

  it("should display login page when email is not already taken", () => {
    cy.get('input[placeholder="Name"]').type(`${dateNow}name`)
    cy.get('input[placeholder="Email"]').type(`${dateNow}@gmail.com`)
    cy.get('input[placeholder="Password"]').type(`${dateNow}password`)

    cy.get("button")
      .contains(/^Register$/)
      .click()

    cy.get("button").contains("Login").should("be.visible")
  })
})
