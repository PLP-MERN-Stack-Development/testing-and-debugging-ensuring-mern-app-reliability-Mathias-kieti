
describe('Create post flow', () => {
  it('renders app and clicks create', () => {
    cy.visit('http://localhost:3000');
    cy.contains('MERN Testing App').should('exist');
    cy.get('[data-testid="create-post"]').click();
  });
});
