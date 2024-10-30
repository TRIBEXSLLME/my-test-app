describe("Newsletter Subscribe Form",()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000/')
    })

    it("allow users to subscribe to the email list",()=>{
        cy.getByData("email-input").type("bolbol@gmail.com")
        cy.getByData("submit-button").click()
        cy.getByData("success-message").should("exist").contains("bolbol@gmail.com")
    })
    it("does not allow invalid email addresses",()=>{
        cy.getByData("email-input").type("bolbo")
        cy.getByData("submit-button").click()
        cy.getByData("success-message").should("not.exist")
    })
    it("does not allow already signed userssign up",()=>{
        cy.getByData("email-input").type("john@example.com")
        cy.getByData("submit-button").click()
        cy.getByData("server-error-message")
          .should("exist")
          .contains("already exists. Please use a different email address.")
    })
})