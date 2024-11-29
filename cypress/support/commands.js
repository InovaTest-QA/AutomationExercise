Cypress.Commands.add('loginViaUI', () => {
  cy.visit('https://automationexercise.com/login');
  cy.get('input[data-qa="login-email"]').should('be.visible').type('teste01@gmail.com');
  cy.get('input[data-qa="login-password"]').should('be.visible').type('teste01');
  cy.get('button[type="submit"]').should('be.visible').first().click();
  cy.url().should('not.include', '/login');
});

Cypress.Commands.add('adicionarProdutoAoCarrinho', (indexProduto) => {
  cy.get('.shop-menu > .nav > :nth-child(2) > a').click()
  cy.get('.product-image-wrapper')
    .eq(indexProduto)
    .invoke('css', 'overflow', 'visible')
    .trigger('mouseover')
    .find('.product-overlay .overlay-content .add-to-cart')
    .should('be.visible')
    .click();
  cy.get('.modal-footer .btn-success').should('be.visible').click();
});