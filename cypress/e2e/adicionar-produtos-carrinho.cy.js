///   <reference types="cypress"/>

describe ('Gerenciamento de Carrinho de Compras', () => {
  beforeEach ( () => {
      cy.visit('https://automationexercise.com/');
      cy.get('[href="/products"]').click();
  })
  it('Adicionar produtos ao carrinho', () => {

    cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
    cy.get('[href="/view_cart"]').contains('View Cart').click();
  })
})