import faker from "@faker-js/faker";

describe("smoke tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should allow you to register and login", () => {
    const loginForm = {
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    };
    cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visit("/");
    cy.findByRole("link", { name: /sign up/i }).click();

    cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
    cy.findByLabelText(/password/i).type(loginForm.password);
    cy.findByRole("button", { name: /create account/i }).click();

    cy.findByRole("heading", { level: 1, name: /grocery list/i });
    cy.findByRole("button", { name: /menu/i }).click();
    cy.findByRole("button", { name: /logout/i }).click();
    cy.findByRole("button", { name: /log in/i });
  });

  it("should allow you to make a grocery item", () => {
    const testGroceryItem = {
      name: faker.lorem.words(1),
    };
    cy.login();
    cy.visit("/portal");

    cy.findByLabelText(/item:/i).type(testGroceryItem.name);
    // cy.findByText("No notes yet");

    cy.findByRole("button", { name: /submit/i }).click();

    cy.findByRole("listitem", { name: testGroceryItem.name });
  });
});
