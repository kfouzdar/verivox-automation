const { I } = inject();

module.exports = {
  productItemLocator: "//product-list//product",
  PrivathaftpflichtLocator: " Privathaftpflicht ",
  totalTariffsLocator: "//filtered-products-hint/span",
  loadMoreButtonLocator: ".button.load-more-button",
  firstTariffPriceLocator: "//product[1]//div[3]/div[1]/div[2]/div[1]",
  firstTariffDetailsButtonLocator: "//product[1]//div[2]/button[1]",

  async seeProductList() {
    I.see(this.PrivathaftpflichtLocator);
    I.waitForElement(this.productItemLocator, 10);
    I.seeElement(this.productItemLocator);
  },
  
  async getTotalProductItems() {
    I.waitForElement(this.productItemLocator, 10);
    return await I.grabNumberOfVisibleElements(this.productItemLocator);
  },
  
  async getTotalTariffs() {
    I.waitForElement(this.totalTariffsLocator, 10);
    const totalText = await I.grabTextFrom(this.totalTariffsLocator);
    return parseInt(totalText.match(/\d+/)[0], 10);
  },

  async scrollToBottomUntilLoadingButtonVisible() {
    let isVisible = false;
    while (!isVisible) {
      I.scrollPageToBottom();
      isVisible = await I.grabNumberOfVisibleElements(this.loadMoreButtonLocator) > 0;
      if (isVisible) {
        I.waitForElement(this.loadMoreButtonLocator, 10);
      } else {
        I.wait(2);
      }
    }
  },

  async loadMoreTariffs() {
    let loadMoreVisible = await I.grabNumberOfVisibleElements(this.loadMoreButtonLocator) > 0;
    while (loadMoreVisible) {
      I.click(this.loadMoreButtonLocator);
      I.wait(5); // Wait for new tariffs to load
      loadMoreVisible = await I.grabNumberOfVisibleElements(this.loadMoreButtonLocator) > 0;
    }
  },

  async isLoadMoreButtonVisible() {
    return await I.grabNumberOfVisibleElements(this.loadMoreButtonLocator) > 0;
  },

  async seeFirstTariffPrice() {
    I.scrollPageToTop();
    I.wait(2);
    I.seeElement(this.firstTariffPriceLocator);
  },

  async openFirstTariffDetails() {
    I.click(this.firstTariffDetailsButtonLocator);
    I.wait(5);
  }
};
