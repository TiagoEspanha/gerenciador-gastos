import { describe, it, expect } from "vitest";
import { cy } from "cypress";

import { mount } from "@vue/test-utils";
import ExpenseList from "../expense/List";

describe("List", () => {
  it("deve mostrar mensagem de despesa criada quando o formulário é devidamente preenchido", () => {
    cy.visit("https://localhost:4173/expense/form");
    cy.wait(1000);

    cy.get('[data-testid="testid-amount"]').type("100");

    cy.get('[data-testid="testid-description"]').type("descricao");

    cy.get('[data-testid="testid-date"]').type("12-12-2022");

    cy.get('[data-testid="testid-categoryId"]').select(2);

    cy.get('[data-testid="expense-form-btn"]').click();

    cy.wait(1000);

    const stub = cy.stub();
    cy.on("window:alert", stub);
    expect(stub.getCall(0)).to.be.calledWith("Despesa criada!");
  });

  it("deve mostrar mensagem 'Alguma coisa deu errado' quando o formulário não é devidamente preenchido", () => {
    cy.visit("https://localhost:4173/expense/form");
    cy.wait(1000);

    cy.get('[data-testid="expense-form-btn"]').click();

    cy.wait(1000);

    const stub = cy.stub();
    cy.on("window:alert", stub);
    expect(stub.getCall(0)).to.be.calledWith("Alguma coisa deu errado");
  });
});
