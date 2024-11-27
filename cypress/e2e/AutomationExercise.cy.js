Cypress.Commands.add('loginViaUI', () => {
  cy.visit('https://automationexercise.com/login'); 
  cy.get('input[name="email"]').type('teste01@gmail.com'); // Campo de email
  cy.get('input[name="password"]').type('teste01'); // Campo de senha
  cy.get('button[type="submit"]').click(); // Botão de login

  // Verifica se o login foi bem-sucedido
  cy.url().should('not.include', '/login'); 
});

// No teste:
beforeEach(() => {
  cy.loginViaUI(); // Realiza o login antes de cada teste
});

// Teste de adicionar produtos e validar o carrinho
describe('Adição de produtos e validação do valor total do carrinho', () => {
  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.loginViaUI();
  });

  it('Deve adicionar dois produtos ao carrinho e validar o valor total', () => {
    
    cy.visit('https://automationexercise.com/products');

    // Adiciona o primeiro produto ao carrinho
    cy.get('.product-grid .product') // Localiza todos os produtos
      .eq(0) 
      .find('.add-to-cart') 
      .click();

    
    cy.get('.continue-btn').click(); // Botão "Continue Shopping"

    // Adiciona o segundo produto ao carrinho
    cy.get('.product-grid .product') // Localiza todos os produtos novamente
      .eq(1) 
      .find('.add-to-cart') 
      .click();

    
    cy.get('.view-cart-btn').click(); // Botão "View Cart" para ir ao carrinho

    cy.get('.check_out').click();


describe('Validação do valor total do carrinho', () => {
  it('Deve validar se o valor total corresponde à soma dos produtos', () => {
    
    cy.visit('https://automationexercise.com/checkout'); 

    // Captura os preços individuais dos produtos
    let somaProdutos = 0;

    cy.get('.cart_price p') 
      .each(($el) => {
        
        const preco = parseFloat($el.text().replace('Rs', '').replace(',', '.').trim());
        somaProdutos += preco;
      })
      .then(() => {
        // Captura o valor total exibido no carrinho
        cy.get('.cart_total_price p') 
          .invoke('text')
          .then((totalText) => {
            
            const total = parseFloat(totalText.replace('Rs', '').replace(',', '.').trim());

            // Compara a soma dos produtos com o total exibido
            expect(total).to.equal(somaProdutos);
          });
      });
  });
});
