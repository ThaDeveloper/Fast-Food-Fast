# Fast-Food-Fast

[![Build Status](https://travis-ci.org/ThaDeveloper/Fast-Food-Fast.svg?branch=ch-unit-testing-161431243)](https://travis-ci.org/ThaDeveloper/Fast-Food-Fast)
[![Coverage Status](https://coveralls.io/repos/github/ThaDeveloper/Fast-Food-Fast/badge.svg?branch=ch-unit-testing-161431243)](https://coveralls.io/github/ThaDeveloper/Fast-Food-Fast?branch=ch-unit-testing-161431243)

A fast food ordering app.

## Prerequisites

Make sure you have the followings installed.

* Nodejs
* Latest chrome, firefox or safari browser


## Technologies used
- [Vanilla JS](http://vanilla-js.com/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [REST API](https://restfulapi.net/)


## Run & Test the application
### Get the source code
 - `$ git clone -b ch-unit-testing-161431243 https://github.com/ThaDeveloper/Fast-Food-Fast`
 - `$ cd Fast-Food-Fast`
### Install dependencies and start app
 - `$ npm install`
 - copy all from .env_sample and create a .env file under `test` directory and paste
 - Uncomment all occurences of the line `// env(__dirname + '/.env');` in `testMenu.js` and `testOrder.js`
 - `$ npm start &`
 - Under /UI directory open index.html' in your favorite browser.

* To Note: *
You will be presented with a list of the available meals to order.

You need to login to order a meal.

Only admin can add, edit or delete menu. Only admin can manage orders.

To test for admin routes, use `justin.ndwiga` as username and `@Password1` as password.

Alternatively you can test the hosted version - [Fast-Food-Fast live](http://fastfoodfast-ui.herokuapp.com/UI). Use same login credentials for admin as above.

### Run tests
 - `$ npm test`

 * To Note: *
Should always run `$ npm start &` before running tests to ensure the http-server is live.

## Author

Justin Ndwiga


## License


MIT License

Copyright (c) 2018 Justin Ndwiga

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

```
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
