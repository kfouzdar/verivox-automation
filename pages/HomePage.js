
const { I } = inject();
  
  module.exports = {
    acceptCookiesButton: "//*[@id='uc-btn-accept-banner']",
    insuranceLink: ".page-navigation-text.icn-a-angle-right-outlined.icn-shield-outlined",
    privathaftpflichtLink: ".page-navigation-link[href='/privathaftpflicht/']",
  
    acceptAllCookies() {
        I.waitForElement(this.acceptCookiesButton, 5);
        I.wait(5);
        I.click(this.acceptCookiesButton);
        I.wait(2);
        I.see("Stromvergleich");
    },
  
    navigateToInsurance() {
      I.moveCursorTo(this.insuranceLink);
      I.wait(2);

    },
  
    selectPrivathaftpflicht() {
      I.click(this.privathaftpflichtLink);
    }
  };
  