describe("home page", () => {
  beforeEach(() => {
    cy.visit("https://beta.smtpexpress.com")
  })
  context('My Test', () => {
    it.only('Clicks the element', () => {
      cy.visit('https://beta.smtpexpress.com');  
      cy.get('.md\\:flex > :nth-child(1) > a > .rounded-xl > .flex').click();
    });
  });
})
