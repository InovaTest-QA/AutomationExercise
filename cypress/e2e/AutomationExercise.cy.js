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

            // Comparar valor calculado com o exibido
            expect(total).to.equal(somaProdutos);
          });
      });
  });
});



describle('Registro de usuário',() => {
  beforeEach(()=> {
    // Executar o navegador
    // Acessar a url da aplicação
    cy.visit('https://automationexercise.com');
  });

});

it('Registrar um novo usuário antes de finalizar uma compra', () => {

  // Adiciona um produto ao carrinho
  cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click();

  // Clica no link "View Cart"
  cy.get('.shop-menu .nav.navbar-nav li a[href="/view_cart"]').should('be.visible').click();

  // Espera até que a página do carrinho seja carregada
  cy.url().should('include', '/view_cart');

  // Clica no botão "Proceed to Checkout"
  cy.get('.check_out').should('be.visible').click();

  cy.url().should('include', '/checkout');

  // Clica no botão de registro/login
  cy.get('#signup_link').click();


  // Valida que a página inicial carregou com sucesso
  cy.get('a > img').should('be.visible');
  cy.get('.shop-menu > .nav > :nth-child(1) > a').should('be.visible');


  // Clica no botão “Signup / Login”
  cy.get('.shop-menu > .nav > :nth-child(4) > a').click();


  // Valida que 'New User Signup!' está visível
  cy.get('.signup-form > h2').should('be.visible');


  // Entra com nome e e-mail
  cy.get('[data-qa="signup-name"]').type('Fulano');
  cy.get('[data-qa="signup-email"]').type('email@teste01.com.br');


  // Clica no botão “Signup”
  cy.get('[data-qa="signup-button"]').click();


  // Validar que a label “ENTER ACCOUNT INFORMATION” está visível
  cy.get(':nth-child(1) > b').should('be.visible');


  // Preenche os campos: Title, Name, Email, Password, Date of birth
  cy.get('#id_gender1').click();
  cy.get('[data-qa="name"]').clear().type('Fulano');
  cy.get('[data-qa="email"]').should('have.value', 'email@teste01.com.br');
  cy.get('[data-qa="password"]').type('password');
  cy.get('[data-qa="days"]').select('13');
  cy.get('[data-qa="months"]').select('December');
  cy.get('[data-qa="years"]').select('2000');


  // Seleciona o checkbox “Sign up for our newsletter!”
  cy.get('#newsletter').click();


  // Seleciona o checkbox “Receive special offers from our partners!”
  cy.get('#optin').click();


  // Preenche os campos: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
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


  // Clica em "Create Account button"
  cy.get('[data-qa="create-account"]').click();


  // Valida que a mensagem "ACCOUNT CREATED!"" está visível
  cy.get('[data-qa="account-created"]').should('be.visible');


  // Clica no botão "Continue"
  cy.get('[data-qa="continue-button"]').click();


  // Valida que o nome de usuário "Logged in as $username" está visível
  cy.get('b').should('have.text', 'Fulano')

  // Clicar no botão 'Delete Account'
  cy.get('.shop-menu > .nav > :nth-child(5) > a').click();
  });
});