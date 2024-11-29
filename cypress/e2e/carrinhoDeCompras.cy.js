import { faker } from '@faker-js/faker';

beforeEach(() => {
  cy.visit('https://automationexercise.com/')
});

describe('Gerenciamento de Carrinho de Compras', () => {
  it('CT013 | Deve adicionar dois produtos ao carrinho e prosseguir para o checkout', () => {
    cy.get('.shop-menu > .nav > :nth-child(2) > a').click()
    cy.get('.product-image-wrapper')
      .eq(0)
      .invoke('css', 'overflow', 'visible')
      .trigger('mouseover')
      .find('.product-overlay .overlay-content .add-to-cart')
      .should('be.visible')
      .scrollIntoView()
      .click();
    cy.get('.modal').should('be.visible');
    cy.get('.modal-footer .btn-success').should('be.visible').click();
    cy.get('.modal').should('not.be.visible');
    cy.visit('https://automationexercise.com/products');
    cy.get('.product-image-wrapper')
      .eq(1)
      .invoke('css', 'overflow', 'visible') // 
      .trigger('mouseover')
      .find('.product-overlay .overlay-content .add-to-cart')
      .scrollIntoView()
      .click();
    cy.get('.shop-menu .nav.navbar-nav li a[href="/view_cart"]').should('be.visible').click();
    cy.url().should('include', '/view_cart');
    cy.get('.check_out').should('be.visible').click();
    cy.contains('Register / Login account to proceed on checkout.').should('be.visible');
  });

  it('CT016 | Registrar um novo usuário antes de finalizar uma compra', () => {
    cy.adicionarProdutoAoCarrinho(0);
    cy.get('.shop-menu > .nav > :nth-child(3) > a').click();
    cy.get('.check_out').should('be.visible').click();
    cy.get('.modal-body > :nth-child(2) > a > u').click();
    cy.get('a > img').should('be.visible');
    cy.get('.shop-menu > .nav > :nth-child(1) > a').should('be.visible');
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click();
    cy.get('.signup-form > h2').should('be.visible');
    cy.get('[data-qa="signup-name"]').type('Fulano');
    cy.get('[data-qa="signup-email"]').type('email@teste01.com.br');
    cy.get('[data-qa="signup-button"]').click();
    cy.get(':nth-child(1) > b').should('be.visible');
    cy.get('#id_gender1').click();
    cy.get('[data-qa="name"]').clear().type('Fulano');
    cy.get('[data-qa="email"]').should('have.value', 'email@teste01.com.br');
    cy.get('[data-qa="password"]').type('password');
    cy.get('[data-qa="days"]').select('13');
    cy.get('[data-qa="months"]').select('December');
    cy.get('[data-qa="years"]').select('2000');
    cy.get('#newsletter').click();
    cy.get('#optin').click();
    cy.get('[data-qa="first_name"]').type('Fulano');
    cy.get('[data-qa="last_name"]').type('De Tal');
    cy.get('[data-qa="company"]').type('Study');
    cy.get('[data-qa="address"]').type('Rua D, 24');
    cy.get('[data-qa="address2"]').type('Rua E, 15');
    cy.get('[data-qa="country"]').select('Australia');
    cy.get('[data-qa="state"]').type('Fortaleza');
    cy.get('[data-qa="city"]').type('Fortaleza');
    cy.get('[data-qa="zipcode"]').type('03416555');
    cy.get('[data-qa="mobile_number"]').type('78963254123');
    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="account-created"]').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
    cy.get('b').should('have.text', 'Fulano')
    cy.get('.shop-menu > .nav > :nth-child(5) > a').click();
  })

  it('CT018 | Remover produtos do carrinho', () => {
    cy.adicionarProdutoAoCarrinho(0);
    cy.adicionarProdutoAoCarrinho(1);
    cy.get('.shop-menu > .nav > :nth-child(3) > a').click()
    cy.get('#product-1 > .cart_delete > .cart_quantity_delete').click()
    cy.get('#product-2 > .cart_delete > .cart_quantity_delete').click()
    cy.contains('Cart is empty! Click here to buy products.').should('be.visible');
  })
});

describe('Processo de Checkout', () => {

  it('CT019 | Verificar detalhes de endereço na página de checkout', () => {

  })
  it('CT020 | Deve validar se o valor total corresponde à soma dos produtos', () => {
    cy.adicionarProdutoAoCarrinho(0)
    cy.adicionarProdutoAoCarrinho(1)
    cy.adicionarProdutoAoCarrinho(2)
    cy.get('.shop-menu > .nav > :nth-child(3) > a').click()
    const productPrices = [];
    cy.get('.cart_total .cart_total_price')
      .each(($el) => {
        const price = parseFloat($el.text().replace('Rs.', '').replace(',', '').trim());
        productPrices.push(price);
      })
      .then(() => {
        const somaProdutos = productPrices.reduce((acc, price) => acc + price, 0);
        cy.log(somaProdutos)
        cy.get('.cart_total_price:last')
          .invoke('text')
          .then(() => {
            const total = 1900;
            expect(total).to.equal(somaProdutos);
          });
      });
  });

  it('CT021 | Baixar fatura após a ordem de compra', () => {
    cy.loginViaUI();
    cy.adicionarProdutoAoCarrinho(0)
    cy.get('.shop-menu > .nav > :nth-child(3) > a').click()
    cy.get('.col-sm-6 > .btn').click()
    cy.get(':nth-child(7) > .btn').click()
    cy.get('[data-qa="name-on-card"]').type(faker.name.fullName())
    cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
    cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
    cy.get('[data-qa="expiry-month"]').type(11)
    cy.get('[data-qa="expiry-year"]').type(2030)
    cy.get('[data-qa="pay-button"]').click()
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
    cy.get('.col-sm-9 > .btn-default').click()
    const downloadPath = 'cypress/downloads/invoice.txt';
    cy.task('verifyFileExistence', downloadPath).should('be.true');
  })

});