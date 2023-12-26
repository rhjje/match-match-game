describe('Main page layout', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Information cards should exist on the main page', () => {
    cy.getByData('info-card').each((card, index) => {
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

  it('Game field should exist on the main page and have children', () => {
    cy.getByData('field').should('exist').children().should('exist');
  });

  it('Controls panel should exist on the main page', () => {
    cy.getByData('controls').should('exist');
  });

  it('Select images and sizes should exists on the main page', () => {
    cy.getByData('select-images').should('exist');
    cy.getByData('select-sizes').should('exist');
  });
});

describe('Main page interactive', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('The New Game button is disabled at the start of the game', () => {
    cy.getByData('new-game-button').should('have.attr', 'disabled');
  });

  it('The cell after the click should have an active class', () => {
    cy.getByData('cell')
      .first()
      .click()
      .should(($button) => {
        expect($button).to.have.length(1);

        const className = $button[0].className;

        expect(className).to.match(/active/);
      });
  });

  it('Step counter should increases', () => {
    let previousCounter: string;
    cy.getByData('info-card')
      .last()
      .find('span')
      .should(($span) => (previousCounter = $span.text()));

    cy.getByData('cell').first().click();
    cy.getByData('cell').eq(1).click();

    cy.getByData('info-card')
      .last()
      .find('span')
      .should(($span) => {
        const currentCounter = $span.text();

        expect(+previousCounter + 1).equal(+currentCounter);
      });
  });

  it('The New Game button should become active after increasing the step counter', () => {
    cy.getByData('cell').first().click();
    cy.getByData('cell').eq(1).click();

    cy.getByData('new-game-button').should('not.have.attr', 'disabled');
  });
});
