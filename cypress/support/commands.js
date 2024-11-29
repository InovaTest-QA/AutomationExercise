Cypress.Commands.add('loginViaUI', () => {
  cy.visit('https://automationexercise.com/login');
  cy.get('input[data-qa="login-email"]').should('be.visible').type('teste01@gmail.com');
  cy.get('input[data-qa="login-password"]').should('be.visible').type('teste01');
  cy.get('button[type="submit"]').should('be.visible').first().click();
  cy.url().should('not.include', '/login');
});