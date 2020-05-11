# Our Recipes

Hub which hosts your recipes. Create, Edit and View recipes at your pleasure.
Upload an image, the ingredients and it's method, alongwith the timings. Give
it a name and description and you are good to go!

![Tests and Build](https://github.com/j-blackmore/our-recipes/workflows/Tests%20and%20Build/badge.svg)
[![](https://img.shields.io/badge/Version-1.1.1-blue)](https://github.com/j-blackmore/our-recipes/releases/latest)

_This is currently a work in progress and needs updating_

# First-time Setup

_Follow these steps to setup a local dev environment_

## MongoDB

Firstly we need to download and install a database. We are using MongoDB, a
document database which works perfectly for us - download the latest community
edition, instructions can be found
[here](https://docs.mongodb.com/manual/installation/).
We are currently using `v4.2.6` but any `v4.2.x` should work fine.

For mac users using homebrew, you can use this

```bash
$ brew tap mongodb/brew
$ brew install mongodb
```

Once mongoDB is installed, we need to start the database

```bash
$ cd server
$ mongod
```

Or if you want to run it as a background process, run this instead

```bash
$ cd server
$ mongod --config /usr/local/etc/mongod.conf --fork
```

Now we have mongoDB up and running, for first time installation we need to
create our database (if you have already done this step before, skip to the
'server' section).

Open a new shell and start by opening a connection to the database from the
terminal, and then create the database.

```bash
$ mongo
> use our_recipes
> exit
```

## Server

Now the datbase is up and running and has been created, we need to install
and start the server. We are using an ExpressJS server run on node.

```bash
$ cd server
$ npm install
$ npm run dev
```

## Client

The final step is to install and run the client, which is React. Navigate to
the project root directory and run the following (note: this will also add an
environment vairable `NODE_PATH` in a `client/.env` file)

```bash
$ cd client
$ echo "NODE_PATH=src/" >> .env
$ npm install
$ npm start
```

# Restarting Dev Environment

When returning to development, and restarting up the dev environment - you
simply need to start the database, server and client - in that order.

Each in a separate shell, always starting from the project root directory run

```bash
# Start mongoDB
$ cd server
$ mongod


# Start the server
$ cd server
$ npm run dev


# Start the client
$ cd client
$ npm start
```

# Structure

```
.
├── server
│   ├── controllers
│   │   ├── mongoDB.js
│   │   ├── recipe.route.js
│   │   ├── router.js
│   │   └── ...
│   ├── models
│   │   ├── recipe.model.js
│   │   └── ...
│   ├── server.js
│   ├── server.test.js
│   └── ...
├── client
│   ├── public
│   │   ├── images
│   │   │   └── ...
│   │   ├── index.html
│   │   └── ...
│   ├── src
│   │   ├── components
│   │   │   ├── MyComponent
│   │   │   │   ├── __tests__
│   │   │   │   │   ├── MyComponent.test.js
│   │   │   │   │   └── ...
│   │   │   │   ├── MyComponent.js
│   │   │   │   └── ...
│   │   │   └── ...
│   │   ├── contexts
│   │   │   └── ...
│   │   ├── pages
│   │   │   └── ...
│   │   ├── theme
│   │   │   ├── MuiCustomTheme.js
│   │   │   └── ...
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── serviceWorker.js
│   │   ├── test-utils.js
│   │   └── ...
│   └── ...
├── .env
└── ...
```

# Tests

## Client

Currently we have unit & integration tests, running on Jest using
react-testing-library. Tests can be found inside `__tests__` folders which sit
next to the react components the particular file is testing. See this structure
for an example:

```
├ ...
├── MyComponent
│   ├── __tests__
│   │   └── MyComponent.test.js
│   └── MyComponent.js
...
```

### Running unit & integration tests

By default our test suite 'Jest', runs in an interactive watch mode. This means
that whenever you make a change to a react component or test file, and tests
affected will be automatically re-run. Run the suite with

```bash
$ npm test
```

You can type `w` to see all the options in the interactive shell.

Typing `a` will re-run **all** tests.

Alternatively you can just run all tests, without the watch mode with:

```bash
$ npm run test:all
```

### Test coverage

Test coverage can be produced with running

```bash
$ npm run test:coverage
```

Results our output to the shell and a nice interactive webpage is also built,
this can be found in `client/coverage/`. Open the `index.html` file inside
`client/coverage/Icov-report/` in a browser to view this.

### End to End tests

In addition to unit & integration tests, we also have e2e tests which are built
and run with cypress (an amazing testing tool). To run the e2e tests, you will
need the database, server and client all running locally before you run them.

These tests behave like a user interacting with the site, so it all needs to be
up and running. Follow the steps above to get everything up and running. Once
you have, navigate to the `client` directory and run

```bash
$ npm run cypress:run
```

Alternatively, Cypress comes with a great UI that you can interactive with,
and this also runs in watch mode. Start this up with

```bash
$ npm run cypress:open
```

And click 'Run all specs' to run the tests.

_Note: this will open a new Cypress window, and a Cypress controlled browser but
interact with these!_
