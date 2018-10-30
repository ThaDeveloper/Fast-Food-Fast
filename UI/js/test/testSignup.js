'use strict';
const puppeteer = require('puppeteer');
const expect = require('chai').expect;

describe('Render registration page', () => {
  // this.timeout(100000);
    let page, browser;
    beforeEach(async () => {
        browser = await puppeteer.launch(); // headless true
        page = await browser.newPage();
        await page.goto('http://127.0.0.1:5500/UI/register.html');
    });
  
    afterEach(async () => {
      await page.close();
      await browser.close();
    })
  
    it('should have the correct page title', async () => {
      expect(await page.title()).to.equal('Fast-Food-Fast - Register');
    });
  
    it('should have a welcome message', async () => {
      const H2_SELECTOR = 'h2';
      let heading;
  
      await page.waitFor(H2_SELECTOR);
      //runs selector in browser and passes to pageFunction and returns h2 text
      heading = await page.$eval(H2_SELECTOR, heading => heading.innerHTML);
  
      expect(heading).to.equal('Welcome to Fast-Food-Fast');
    });
    //disable nyc for these tests - nyc can't analyze code run on browser
    it('should have a single form', async () => {
        const FORM_SELECTOR = '#signUp';
        await page.waitFor(FORM_SELECTOR);
        //page.$$ - selector is the only expected parameter
        expect(await page.$$(FORM_SELECTOR)).to.have.lengthOf(1);
    });
    it('signup form should have submit button', async () => {
        const BTN_SELECTOR = '.sign';
        await page.waitFor(BTN_SELECTOR);
        expect
        (await page.$$(BTN_SELECTOR)).to.have.lengthOf(1);
    });

    it('creates an account with correct details', async () => {
      //username and email to be changed for a new test
      await page.type('#full_name', 'mocha puppeteer')
      await page.type('#username', 'mocha2')
      await page.type('#email', 'mocha2@domtest.com')
      await page.type('#password', '@Password1')
      await page.type('#pass_confirm', '@Password1')
      await page.click('#signButton')

      await page.waitFor('#success')
      let message = await page.$eval('#success', message => message.innerHTML);
      //we expect a success message in the <div id="success"> if registration goes through
       // expect(message).to.exist;
      expect(message).contains('registered successfully');
    });
    it('returns error fo re-using signup email', async () => {
      await page.type('#full_name', 'mocha puppeteer')
      await page.type('#username', 'chai')
      await page.type('#email', 'mocha@domtest.com')
      await page.type('#password', '@Password1')
      await page.type('#pass_confirm', '@Password1')
      await page.click('#signButton')

      await page.waitFor('#errors')
      let message = await page.$eval('#errors', message => message.innerHTML);
      //we expect a error message in the <div id="errors"> if registration doesnt goes through
       // expect(message).to.exist;
      expect(message).to.equal('Email already registered');
    });
  });