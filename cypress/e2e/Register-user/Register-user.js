const { faker } = require('@faker-js/faker');

describe('Fluxo de Compra com Registro de Usuário', () => {
    it('Deve completar o registro após adicionar produtos ao carrinho', () => {
        // Visitar a página inicial
        cy.visit('https://automationexercise.com/');

        // Adicionar produtos ao carrinho (ajuste os seletores conforme a estrutura do site)
        cy.get('.product-name').first().click();
        cy.get('.add-to-cart').click();
        cy.get('.product-name').eq(1).click();
        cy.get('.add-to-cart').click();

        // Ir para o carrinho
        cy.get('.cart').click();

        // Prosseguir para o checkout
        cy.get('button[data-toggle="modal"]').click();

        // Clicar no botão de registro/login
        cy.get('#signup_link').click();

        // Preencher o formulário de registro com dados fakers
        cy.get('#name').type(faker.name.fullName());
        cy.get('#email').type(faker.internet.email());
        cy.get('#password').type('password123');
        // Preencher outros campos conforme necessário

        // Submeter o formulário
        cy.get('.signup-button').click();

        // **Verificações adicionais:**
        // - Verificar se o usuário foi registrado com sucesso
        // - Verificar se o usuário foi redirecionado para a página correta
        // - Verificar se os produtos estão no carrinho
    });
});

describe('funcionalidades de cadastro', () => {

    beforeEach(() => {
        // 1. Executar o navegador
        // 2. Navegar para a url 'http://automationexercise.com'
        cy.visit('https://automationexercise.com');
    });

    cy.get('.product-name').first().click();
    cy.get('.add-to-cart').click();
    cy.get('.product-name').eq(1).click();
    cy.get('.add-to-cart').click();

    // Ir para o carrinho
    cy.get('.cart').click();

    // Prosseguir para o checkout
    cy.get('button[data-toggle="modal"]').click();

    // Clicar no botão de registro/login
    cy.get('#signup_link').click();

    it('cadastrar um novo usuário', () => {
        // 3. Validar que a página inicial carregou com sucesso
        cy.get('a > img').should('be.visible');
        cy.get('.shop-menu > .nav > :nth-child(1) > a').should('be.visible');

        // 4. Clicar no botão “Signup / Login”
        cy.get('.shop-menu > .nav > :nth-child(4) > a').click();

        // 5. Validar que 'New User Signup!' está visível
        cy.get('.signup-form > h2').should('be.visible');

        // 6. Entrar com nome e e-mail
        cy.get('[data-qa="signup-name"]').type('Thiago');
        cy.get('[data-qa="signup-email"]').type('email@teste.com.br');

        // 7. Clicar no botão “Signup”
        cy.get('[data-qa="signup-button"]').click();

        // 8. Validar que a label “ENTER ACCOUNT INFORMATION” está visível
        cy.get(':nth-child(1) > b').should('be.visible');

        // 9. Preencher os campos: Title, Name, Email, Password, Date of birth
        cy.get('#id_gender1').click();
        cy.get('[data-qa="name"]').clear().type('Thiago');
        cy.get('[data-qa="email"]').should('have.value', 'email@teste.com.br');
        cy.get('[data-qa="password"]').type('password');
        cy.get('[data-qa="days"]').select('6');
        cy.get('[data-qa="months"]').select('November');
        cy.get('[data-qa="years"]').select('1996');

        // 10. Selecionar o checkbox “Sign up for our newsletter!”
        cy.get('#newsletter').click();

        // 11. Selecionar o checkbox “Receive special offers from our partners!”
        cy.get('#optin').click();

        // 12. Preencher os campos: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
        cy.get('[data-qa="first_name"]').type('Thiago');
        cy.get('[data-qa="last_name"]').type('Castilho');
        cy.get('[data-qa="company"]').type('Study');
        cy.get('[data-qa="address"]').type('Rua A, 123');
        cy.get('[data-qa="address2"]').type('Rua B, 321');
        cy.get('[data-qa="country"]').select('Australia');
        cy.get('[data-qa="state"]').type('São Paulo');
        cy.get('[data-qa="city"]').type('São Paulo');
        cy.get('[data-qa="zipcode"]').type('03416555');
        cy.get('[data-qa="mobile_number"]').type('11912345678');

        // 13. Clicar em "Create Account button"
        cy.get('[data-qa="create-account"]').click();

        // 14. Validar que a mensagem "ACCOUNT CREATED!"" está visível
        cy.get('[data-qa="account-created"]').should('be.visible');

        // 15. Clicar no botão "Continue"
        cy.get('[data-qa="continue-button"]').click();

        // 16. Validar que o nome de usuário "Logged in as $username" está visível
        cy.get('b').should('have.text', 'Thiago')

        // 17. Clicar no botão 'Delete Account'
        cy.get('.shop-menu > .nav > :nth-child(5) > a').click();

        // 18. Validar que a mensagem "ACCOUNT DELETED!" está visível e clicar no botão "Continue"
        cy.get('[data-qa="account-deleted"]').should('be.visible');
    });
});