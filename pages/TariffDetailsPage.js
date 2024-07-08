const { I } = inject();

module.exports = {
  weitereLeistungenLocator: "//product[1]//div[2]/ul/li[1]",
  allgemeinLocator: "//product[1]//div[2]/ul/li[2]",
  taetigkeitenUndHobbysLocator: "//product[1]//div[2]/ul/li[3]",
  mieteImmobilienLocator: "//product[1]//div[2]/ul/li[4]",
  dokumenteLocator: "//product[1]//div[2]/ul/li[5]",
  zumOnlineAntragButtonLocator: "//product[1]//div[2]/button[2]",

  async seeTariffDetailsSections() {
    I.seeElement(this.weitereLeistungenLocator);
    I.seeElement(this.allgemeinLocator);
    I.seeElement(this.taetigkeitenUndHobbysLocator);
    I.seeElement(this.mieteImmobilienLocator);
    I.seeElement(this.dokumenteLocator);
  },

  async seeZumOnlineAntragButton() {
    I.seeElement(this.zumOnlineAntragButtonLocator);
  }
};
