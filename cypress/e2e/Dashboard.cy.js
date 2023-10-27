/// <reference types="Cypress" />

import ProductPage from "../pages/productPage";
import LoginPage from "../pages/loginPage";

const subMenu = [
  " Products",
  " Categories",
  " Manufacturers",
  " Product reviews",
  " Product tags",
  "Attributes",
];

const inputFields = [
  { selector: "SearchProductName", label: "Product name" },
  { selector: "SearchCategoryId", label: "Category" },
  { selector: "SearchIncludeSubCategories", label: "Search subcategories" },
  { selector: "SearchManufacturerId", label: "Manufacturer" },
  { selector: "SearchVendorId", label: "Vendor" },
  { selector: "SearchWarehouseId", label: "Warehouse" },
  { selector: "SearchProductTypeId", label: "Product type" },
  { selector: "SearchPublishedId", label: "Published" },
  { selector: "GoDirectlyToSku", label: "Go directly to product SKU" },
];

describe("Verify dashboard functionality", () => {
  beforeEach(() => {
    cy.login(Cypress.env("email"), Cypress.env("password"));
    LoginPage.visitLoginPage();
  });

  it.only("Verify catalog and submenu", () => {
    //Hover over the icon to expand side bar
    cy.get(".navbar")
      .should("not.have.class", ".os-host-scrollbar-horizontal-hidden")
      .then(() => {
        cy.get("#nopSideBarPusher").click();
      });

    //Assert that catalog option is shown
    cy.contains(".nav-item", "Catalog");

    //Select the catalog option
    cy.get(".nav-sidebar > li").eq(1).click();

    //Assert total subcategory and their text
    cy.get(".nav-sidebar > li")
      .eq(1)
      .children("ul ")
      .each(($el) => {
        cy.wrap($el)
          .children()
          .should("have.length", 6)
          .each(($el, subIndex) => {
            cy.wrap($el).should("contain", subMenu[subIndex]);
          });
      });
  });

  it("Test products menu functionality", () => {
    //Hover over the icon to expand side bar
    cy.get(".navbar")
      .should("not.have.class", ".os-host-scrollbar-horizontal-hidden")
      .then(() => {
        cy.get("#nopSideBarPusher").click();
      });

    //Select the catalog option
    cy.selectMenu(" Catalog");

    //CLick on the product menu
    ProductPage.selectSubMenu("Products");

    inputFields.forEach((field) => {
      ProductPage.assertLabelAndInput(field.selector, field.label);
    });

    // Assert the "Search" button
    cy.get(ProductPage.ProductSearchBtn)
      .should("contain", "Search")
      .should("be.visible");

    //Search for product using product name
    cy.enterText(ProductPage.SearchProductName, "Build your own computer");

    //Click the search button
    cy.clickElement(ProductPage.ProductSearchBtn);

    //Assert that only one product is shown
    ProductPage.assertNumberOfRows("#products-grid", 1);

    //Assert that correct product is shown
    ProductPage.assertProductText(
      "#products-grid",
      2,
      "Build your own computer"
    );
  });

  it("Test tag menu functionality", () => {
    //Hover over the icon to expand side bar
    cy.get(".navbar")
      .should("not.have.class", ".os-host-scrollbar-horizontal-hidden")
      .then(() => {
        cy.get("#nopSideBarPusher").click();
      });

    //Select the catalog option
    cy.selectMenu(" Catalog");

    //CLick on the product menu
    ProductPage.selectSubMenu(" Product tags");

    cy.get("#SearchTagName").type("anupam");

    cy.clickElement(ProductPage.TagSearchBtn);

    //Assert that only one product is shown
    ProductPage.assertNumberOfRows("#product-tags-grid", 1);

    //Assert that correct product is shown
    ProductPage.assertProductText("#product-tags-grid", 1, "anupam");

    //Click on the edit button
    cy.get("td > .btn").click();

    cy.get("#Name").clear().type("cool");

    //Click save
    cy.get('[name="save"]').click();

    //Assert that success msg is shown
    cy.get(".alert-success").should("be.visible");

    //Assert success msg
    cy.contains(
      ".alert-success",
      "The product tag has been updated successfully"
    );

    cy.get("#SearchTagName").clear().type("anupam");

    cy.clickElement(ProductPage.TagSearchBtn);

    //Assert that no product is shown
    ProductPage.assertNumberOfRows("#product-tags-grid", 0);

    cy.get("#SearchTagName").type("cool");

    cy.clickElement(ProductPage.TagSearchBtn);

    //Assert that only one product is shown
    ProductPage.assertNumberOfRows("#product-tags-grid", 1);

    ProductPage.assertProductText("#product-tags-grid", 1, "cool");
  });

  it("Logout", () => {
    //Assert that the logout button is visible
    cy.assertElementVisibility("a[href='/logout']");

    //Click on the logout button
    cy.clickElement("a[href='/logout']");

    //Assert that the user is navigated back to the login page
    cy.url().should("contains", Cypress.env("login_url"));
  });
});
