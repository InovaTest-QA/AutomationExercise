// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//Excluindo produto ao carrinho
Cypress.Commands.add('ExcluirUmProdutoCarrinho', () => {
    cy.get('.nav.navbar-nav')
    cy.get('.fa.fa-shopping-cart') //Localiza o Icon Cart
        .first()
        .click()
    cy.get('#cart_info_table') // Localizar os itens
        .as('Visualizar produtos no carrinho') //Aviso visulizando produtos no carrinho
    cy.get('[data-product-id="1"]') // Excluir o 1º Item
        .click()
})
Cypress.Commands.add('ExcluirDoisProdutoCarrinho', () => {
    cy.get('[data-product-id="2"]') // Excluir o 2º Item
        .click()
        .as('Excluido produtos no carrinho') //Aviso que foi excluido
    cy.get('#empty_cart').click()
        .and('contains.text', 'Cart is empty!')
})