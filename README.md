# Our Recipes

Hub which hosts your recipes. Create, Edit and View recipes at your pleasure.
Upload an image, the ingredients and it's method, alongwith the timings. Give
it a name and description and you are good to go!

![Tests and Build](https://github.com/j-blackmore/our-recipes/workflows/Tests%20and%20Build/badge.svg)
[![](https://img.shields.io/badge/Version-1.1.0-blue)](https://github.com/j-blackmore/our-recipes/releases/latest)

# Setup

To get started developing on this project, you need to clone the repo (Note: this is cloning using SSH)

```
$ git clone git@github.com:j-blackmore/our-recipes.git
$ cd our-recipes
```

And now install the pacakges using either

```
$ npm run setup
```

Now you have installed, you need to get the server running using

```
$ npm run dev
```

The website is now available at your [`localhost:3000`](http://localhost:3000)

# Scripts

For running in devlopment mode, simply the following from the project root

```
$ npm run dev
```

To run the server and client separately, use the following

```
# for the server
$ npm start

# for the client
$ cd client
$ npm start
```

To convert the react app into a build product, run this

```
$ cd client
$ npm run build
```

You will find the resultant build in `client/build/`

# Structure

_TODO_
