describe('Sample Cypress Test', () => {
    it('Visits the Cypress website and checks for content', () => {
      cy.visit('https://www.cypress.io');
      cy.contains('Cypress');
    });
  });
  