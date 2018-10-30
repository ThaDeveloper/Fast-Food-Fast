'use strict';
const puppeteer = require('puppeteer');
const expect = require('chai').expect;

describe('Login Page', () => {
    let page, browser;
    beforeEach(async () => {
        browser = await puppeteer.launch()
        page = await browser.newPage()
        await page.goto('http://127.0.0.1:5500/UI/login.html', {waitUntil: 'domcontentloaded', timeout: 5000});
    });
    afterEach(async () => {

        await browser.close();
    })
    it('has a username input field', async () => {
        //select the first input field in the form id = username
        const usernameSelector = 'input'
            
        await page.waitFor(usernameSelector)
        const usernameInput = await page.$eval(usernameSelector, usernameInput => usernameInput.id)
        expect(usernameInput).to.equal('username')

    });
    //can also test for password field presence by checking lenght of returned elems
    //with type password
    it('has a password input field', async () => {
        //returns and array
        expect(await page.$$( '[type="password"]')).to.have.lengthOf(1);
    });
    it('signin form should have submit button', async () => {
        const btnSelector = '.sign';
        await page.waitFor(btnSelector);
        expect
        (await page.$$(btnSelector)).to.have.lengthOf(1);
    });
    it('signs in user with correct credentials', async () => {
        await page.type('#username', 'mocha')
        await page.type('#password', '@Password1')
        await page.click('.sign')
        //if redirection goes through means login is a success
        await page.waitForNavigation();
        console.log('welcome to Fast-Food-Fast mocha')
      });
      it('returns error message with incorrect credentials', async () => {
        await page.type('#username', 'mocha')
        await page.type('#password', 'wrongpass')
        await page.click('.sign')
       
        await page.waitFor('#errors')
        //we expect a error message in the <div id="errors"> if login doesnt goes through
        let message = await page.$eval('#errors', message => message.innerHTML);
        expect(message).to.equal('login invalid!');
      });
});
