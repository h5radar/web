describe("Welcome page spec", () => {
  it("Visit welcome page", () => {
    cy.visit("https://app.h5radar.com/welcome");
    expect(true).to.equal(true);
  });
});
