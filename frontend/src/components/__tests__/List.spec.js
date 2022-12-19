import { describe, it, expect } from "vitest";
import { cy } from "cypress";

import { mount } from "@vue/test-utils";
import ExpenseList from "../expense/List";

describe("List", () => {
  it("should list all expenses", () => {
    cy.visit("https://localhost:4173/");
    cy.wait(1000);
    cy.get('[data-testid="expense-list"]')
      .find("tr")
      .find("th")
      .should("have.length", 4);

    cy.get('[data-testid="expense-list"]')
      .find("tr")
      .find("td")
      .should("have.length", 4);

    cy.get('[data-testid="new-todo"]')
      .type("write code{enter}")
      .type("write tests{enter}");
  });
});
