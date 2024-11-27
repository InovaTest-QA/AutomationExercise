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
    cy.get('.product-grid .product') // Localiza todos os produtos
      .eq(0) // Seleciona o primeiro produto
      .find('.add-to-cart') // Botão "Add to Cart"
      .click();

    cy.get('.continue-btn').click(); // Botão "Continue Shopping"

    // Adiciona o segundo produto ao carrinho
    cy.get('.product-grid .product')
      .eq(1) // Seleciona o segundo produto
      .find('.add-to-cart') // Botão "Add to Cart"
      .click();

    // Vai para o carrinho
    cy.get('.view-cart-btn').click(); // Botão "View Cart"

    // Clica no botão "Proceed to Checkout"
    cy.get('.check_out').click();
  });
});

// Validação do valor total do carrinho
describe('Validação do valor total do carrinho', () => {
  it('Deve validar se o valor total corresponde à soma dos produtos', () => {
    cy.visit('https://automationexercise.com/checkout'); // Vai para a página de checkout

    // Captura os preços individuais dos produtos
    let somaProdutos = 0;

    cy.get('.cart_price p') // Seletor para os preços individuais
      .each(($el) => {
        const preco = parseFloat($el.text().replace('Rs', '').replace(',', '.').trim());
        somaProdutos += preco; // Acumula a soma dos preços
      })
      .then(() => {
        // Captura o valor total exibido no carrinho
        cy.get('.cart_total_price p') // Seletor para o total
          .invoke('text')
          .then((totalText) => {
            const total = parseFloat(totalText.replace('Rs', '').replace(',', '.').trim());

            // Compara a soma dos produtos com o total exibido
            expect(total).to.equal(somaProdutos);
          });
      });
  });
});
