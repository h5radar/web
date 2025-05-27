describe('Welcome page spec', () => {
  it('Visit welcome page', () => {
    cy.visit('http://localhost:5173/welcome')
    expect(true).to.equal(true)
  })
})
