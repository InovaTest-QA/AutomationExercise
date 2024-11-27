Cypress.Commands.add('loginViaUI', () => {
  cy.visit('https://automationexercise.com/login'); 

  // Seleciona o campo de email usando o atributo data-qa
  cy.get('input[data-qa="login-email"]').type('teste01@gmail.com'); // Campo de email
  
  // Seleciona o campo de senha usando o atributo data-qa
  cy.get('input[data-qa="login-password"]').type('teste01'); // Campo de senha

  // Clica no botão de login
  cy.get('button[type="submit"]').first().click();

  // Verifica se o login foi bem-sucedido
  cy.url().should('not.include', '/login'); 
});

// No teste:
beforeEach(() => {
  cy.loginViaUI(); // Realiza o login antes de cada teste
});

// Teste de adicionar produtos ao carrinho
describe('Adição de produtos ao carrinho', () => {
  it('Deve adicionar dois produtos ao carrinho e prosseguir para o checkout', () => {
    cy.visit('https://automationexercise.com/products');

    // Adiciona o primeiro produto ao carrinho
    cy.get('.product-image-wrapper')
      .eq(0) // Seleciona o primeiro produto
      .invoke('css', 'overflow', 'visible') // Garante que o estilo de overflow seja visível
      .trigger('mouseover') // Passa o mouse sobre o produto para exibir o overlay
      .find('.product-overlay .overlay-content .add-to-cart') // Localiza o botão "Add to Cart"
      .should('be.visible') 
      .scrollIntoView() 
      .click(); // Clica no botão "Add to Cart"

    
    cy.get('.modal').should('be.visible'); 

    // Verifica e clica no botão "Continue Shopping" dentro do modal
    cy.get('.modal-footer .btn-success').should('be.visible').click(); 

    
    cy.get('.modal').should('not.be.visible'); 

    // Volta para a página de produtos
    cy.visit('https://automationexercise.com/products'); 

    // Adiciona o segundo produto ao carrinho
    cy.get('.product-image-wrapper')
      .eq(1) // Seleciona o segundo produto (índice 1)
      .invoke('css', 'overflow', 'visible') // 
      .trigger('mouseover') // Passa o mouse sobre o produto para exibir o overlay
      .find('.product-overlay .overlay-content .add-to-cart') // Localiza o botão "Add to Cart"
      .should('be.visible') 
      .scrollIntoView() 
      .click(); // Clica no botão "Add to Cart"

    
    // Clica no link "View Cart"
    cy.get('.shop-menu .nav.navbar-nav li a[href="/view_cart"]').should('be.visible').click(); 

    // Espera até que a página do carrinho seja carregada
    cy.url().should('include', '/view_cart'); 

    // Clica no botão "Proceed to Checkout"
    cy.get('.check_out').should('be.visible').click(); 

    cy.url().should('include', '/checkout'); 
  });
});

// Validação do valor total do carrinho
describe('Validação do valor total do carrinho', () => {
  it('Deve validar se o valor total corresponde à soma dos produtos', () => {
    cy.visit('https://automationexercise.com/checkout'); // Vai para a página de checkout

    const productPrices = [];

    // Selecionar os preços de ambos produtos
    cy.get('.cart_total .cart_total_price') 
      .each(($el) => {
        const price = parseFloat($el.text().replace('Rs.', '').replace(',', '').trim());
        productPrices.push(price);
      })
      .then(() => {
        const somaProdutos = productPrices.reduce((acc, price) => acc + price, 0); 

        cy.get('.cart_total_price:last') 
          .invoke('text')
          .then((totalText) => {
            const total = parseFloat(totalText.replace('Rs.', '').replace(',', '').trim());

            // Comparar o valor calculado com o exibido
            expect(total).to.equal(somaProdutos);
          });
      });
  });
});