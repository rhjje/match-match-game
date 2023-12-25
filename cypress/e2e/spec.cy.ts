describe('main page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Information cards should exist on the main page.', () => {
    cy.get('[data-cy="info-card"]').each((card, index) => {
      if (index === 0) {
        cy.wrap(card)
          .find('[data-cy="info-card-progress-bar"]')
          .should('exist');

        cy.wrap(card)
          .find('[data-cy="info-card-title"]')
          .should('exist')
          .contains('Pairs matched');

        cy.wrap(card).find('[data-cy="info-card-info"]').should('exist');
      }

      if (index === 1) {
        cy.wrap(card)
          .find('[data-cy="info-card-title"]')
          .should('exist')
          .contains('Total moves');

        cy.wrap(card).find('[data-cy="info-card-info"]').should('exist');
      }
    });
  });
});
