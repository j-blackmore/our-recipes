# Our Recipes

Hub which hosts your recipes. Create, Edit and View recipes at your pleasure.
Upload an image, the ingredients and it's method, alongwith the timings. Give
it a name and description and you are good to go!

![Tests and Build](https://github.com/j-blackmore/our-recipes/workflows/Tests%20and%20Build/badge.svg)
[![](https://img.shields.io/badge/Version-1.1.0-blue)](https://github.com/j-blackmore/our-recipes/releases/latest)

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

_TODO_
