describe("Home Page", () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit("http://localhost:3000");
  });

  it("has a username input", () => {
    cy.get(".joinInput")
      .invoke("attr", "placeholder")
      .should("contain", "User Name");
  });

  it("has a join game button", () => {
    cy.get("button").should("have.class", "button mt-20");
  });

  it("has a input box for username", () => {
    cy.get("input").should("have.class", "joinInput");
  });

  it("has a title", () => {
    cy.get("title").should("have.text", "Chat Sign In");
  });

  it("has a background color", () => {
    cy.get(".joinInput")
      .should("have.css", "backgroundColor")
      .and("eq", "rgb(139, 0, 0)");
  });
});
