describe('Validação do valor total do carrinho', () => {
  it('Deve validar se o valor total corresponde à soma dos produtos', () => {
    // Visita a página do carrinho
    cy.visit('https://automationexercise.com/checkout'); // Substitua pela URL do seu carrinho

    // Captura os preços individuais dos produtos
    let somaProdutos = 0;

    cy.get('.cart_price p') // Seletor para os preços individuais
      .each(($el) => {
        // Converte o texto do preço para número
        const preco = parseFloat($el.text().replace('R$', '').replace(',', '.').trim());
        somaProdutos += preco;
      })
      .then(() => {
        // Captura o valor total exibido no carrinho
        cy.get('.cart_total_price p') // Seletor para o total
          .invoke('text')
          .then((totalText) => {
            // Converte o valor total para número
            const total = parseFloat(totalText.replace('R$', '').replace(',', '.').trim());

            // Compara a soma dos produtos com o total exibido
            expect(total).to.equal(somaProdutos);
          });
      });
  });
});
