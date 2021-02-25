describe("Form app", () => {
  const nameInput = () => {
    return cy.get("input[name=name]");
  };
  const emailInput = () => {
    return cy.get("input[name=email]");
  };
  const passwordInput = () => {
    return cy.get("input[name=password]");
  };
  const tosBox = () => {
    return cy.get("input[name=acceptTerms]");
  };
  const submitBtn = () => {
    return cy.get("button").contains("submit");
  };

  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("can type in inputs", () => {
    nameInput().type("Deavy Jones").should("have.value", "Deavy Jones");
    emailInput().type("deavyjslzr@gmail.com");
    passwordInput().type("password");
  });

  it("can check terms of service box", () => {
    tosBox().click().should("be.checked");
  });

  it("can submit form", () => {
    emailInput().type("fake@email.com");
    nameInput().type("username");
    passwordInput().type("password");
    tosBox().click();
    submitBtn().should("not.be.disabled");
  });

  describe("submit button disabled if input is empty", () => {
    it("submit disabled if name is empty", () => {
      emailInput().type("fake@email.com");
      passwordInput().type("password");
      tosBox().click();
      submitBtn().should("be.disabled");
    });
    it("submit disabled if email is empty", () => {
      nameInput().type("username");
      passwordInput().type("password");
      tosBox().click();
      submitBtn().should("be.disabled");
    });
    it("submit disabled if password is empty", () => {
      emailInput().type("fake@email.com");
      nameInput().type("username");
      tosBox().click();
      submitBtn().should("be.disabled");
    });
    it("submit disabled if tos is not checked", () => {
      emailInput().type("fake@email.com");
      nameInput().type("username");
      passwordInput().type("password");
      submitBtn().should("be.disabled");
    });
  });
});
