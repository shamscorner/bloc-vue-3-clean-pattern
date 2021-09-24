# Separating business logic from UI frameworks (React, Vue, Svelte, Angular, etc.) using clean architecture pattern

![Moving away from the framework](https://raw.githubusercontent.com/shamscorner/images/main/bloc-pattern.png)

A Vue 3 project with Typescript to mimic the Bloc architecture pattern. (Flutter way)

If you want to create a frontend application, there are many frameworks to choose from (React, Vue.js, Angular, Svelte, etc.). Let's say you select one of these frameworks and start developing your project. But on the long run if you want to change with something else, you have to change the entire codebase from start to finish. And that's why moving away from frameworks and separating the core business logics will give you the ultimate power to avoid those mistakes in the future.

I have read this awesome blog post - [moving away from framework on frontend using clean architecture](http://xurxodev.com/frontend-clean_architecture/) and decided to use that approach on my own. Turned out, implementing the clean architecture pattern on (Vue 3 + Typescript) project is not that big of a deal.

## Overview

In this demo project you will find 2 folders,

* `core` - the core business logic
* `vue3-app` - the UI framework to show the frontend views

This is basically a `products - cart` project where you will see the following functionalities,

* add products to cart
* remove products from cart
* filters products by their title
* adjust the product's quantity
* finally, you will see the total number of product items and their total price.

## Project Structures

### Inside the `core` folder
Inside the `src` folder, you will find 3 folders. One for the `common` functionalities and the other two are responsible for `products` and `cart` management respectively. The breakdown is as follows,

- **products**
	- data
		- data level repositories
		- in memory repositories
		- API level repositories
		- data models
	- domain
		- entities
		 	- product
			- product item
		- repositories
			- product repository
		- usecases
			- get products usecase
	- presentation
		- ProductPloc
		- ProductState
- **cart**
	- data
		- data level repositories
		- in memory repositories
		- API level repositories
		- data models
	- domain
		- entities
			- cart 
			- cart item
		- repositories
			- cart repository
		- usecases
			- add product to cart usecase
			- edit quantity of cart item usecase
			- get cart usecase
			- remove item from cart usecase
	- presentation
		- CartPloc
		- CartState
- **common**
	- dependencies
		- dependencies locator
	- domain
		- DataError
		- Either
		- EitherAsync
	- presentation
		- Ploc

**note:** When you use BLoC with Clean Architecture, it makes more sense to call them PLoC (Presentation Logic Component). For more details, check out this article - [moving away from framework on frontend using clean architecture](http://xurxodev.com/frontend-clean_architecture/) 



### Inside the `vue3-app` folder

This Vue 3 project is made with the "[Vitesse](https://github.com/antfu/vitesse)" starter template created by Anthony Fu (Vue core team member) but configured with the clean architectural pattern instead of monolithic architecture. If you want to use this modified version, check out [this repository](https://github.com/shamscorner/vitesse-stackter-clean-architect).

Here you will find the following folders under `src/`,

- cart
	- components
	- pages
- common
	- components
	- layouts
	- logic
	- modules
	- pages
	- styles
	- use-ploc-state
- products
	- components
	- pages

As you can see, this is very similar with the base folder structure of the `core` setup mentioned earlier.

## Why move away from the framework?

These are the advantages you will encounter while developing your project.

* It is well structured and you will find the attributes you are looking for pretty easily.
* Everything is modular design by its nature.
* You can infinitely introduce new feature without breaking any changes.
* UI library or framework is not tightly coupled to the business logic. So if you want to change your frontend framework from **vue** to **react** later for some reason, just replace the UI part and you are good to go.

## How to run this demo project?

**step 1** - clone this repository
```
$ git clone https://github.com/shamscorner/bloc-vue-3-clean-pattern.git [your repo name]
```

**step 2** - setup `core`

```
$ cd core
$ pnpm install
$ pnpm build
$ yalc publish
```
**note:** install [pnpm](https://pnpm.io/) and [yalc](https://www.npmjs.com/package/yalc)

**step 3** - setup `vue app`
```
$ cd vue3-app
$ pnpm install
$ yalc add vue-bloc-core
$ pnpm install
```

Checkout [this article](https://www.viget.com/articles/how-to-use-local-unpublished-node-packages-as-project-dependencies/) if you want some more in-depth explanation.

**step 4** - running the app
```
$ pnpm dev
```

### If you want to make some changes to the `core` folder, then you have to do the following after each changes.

```
$ cd core
$ pnpm build
$ yalc push
```

and in the vue app, restart the server. If that doesn't work, then run this command as well.

```
$ cd vue3-app
$ yalc update
```

Happy Coding :)