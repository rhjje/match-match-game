describe('My First Test', () => {
  it('Посетить главную страницу', () => {
    cy.visit('http://localhost:5173/');
  });
});
