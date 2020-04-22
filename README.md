# Our Recipes

Hub which hosts your recipes. Create, Edit and View recipes at your pleasure.
Upload an image, the ingredients and it's method, alongwith the timings. Give
it a name and description and you are good to go!

![Tests and Build](https://github.com/j-blackmore/our-recipes/workflows/Tests%20and%20Build/badge.svg)
[![](https://img.shields.io/badge/Version-1.1.0-blue)](https://github.com/j-blackmore/our-recipes/releases/latest)

_This is currently a work in progress and needs updating_

# Setup

_TODO_

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
│   │   ├── containers
│   │   │   └── ...
│   │   ├── controllers
│   │   │   └── ...
│   │   ├── theme
│   │   │   ├── MuiCustomTheme.js
│   │   │   └── ...
│   │   ├── index.js
│   │   ├── serviceWorker.js
│   │   └── ...
│   └── ...
├── .env
└── ...
```

# Tests

_TODO_
