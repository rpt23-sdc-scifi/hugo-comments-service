# Reviews Service

> A service that handles and displays the review information on a product page.

## Related Projects

  - https://github.com/Team-Structure/images-service
  - https://github.com/Team-Structure/Product-Information-Service
  - https://github.com/Team-Structure/seller-catalog

## Table of Contents

1. [Requirements](#requirements)
1. [Usage](#usage)
1. [API](#api)
1. [Development](#development)

## Requirements

- Node.js
- MongoDB

## Usage

1. Clone this repo and go to its root directory.
1. Run `npm install` to install its dependencies.
1. After the dependencies are installed, seed the database with `npm run db:seed`
1. Once the database is seeded, run `npm run build:dev` to build the browser components.
1. After building the components, run `npm run start:dev` to start the application.
1. You will then be able to access the app at **localhost:3001/products/{product_id}** where **{product_id}** is the Product ID number.

The database seeding script `npm run db:seed` seeds Product ID numbers between 1 - 100 so going to http://localhost:3001/products/1 will show review information for the Product with a Product ID of 1.

## API
- POST
  - /api/reviews/add-review
    - creates a new review using information prodivided in the request body
      - request body must contain product_id, username, review_heading, review_text, and review_rating
- GET
  - /api/reviews/:product_id/summary
    - retrieves the average rating/summary for a review of a product
  - /api/reviews/:product_id
    - retrieves all the reviews for a product
- PATCH
  - /api/reviews/update
    - updates an existing review using information provided in the request body
      - request body must contain review_id, in addition to properties to be updated
- DELETE
  - /api/reviews/delete
    - removes an existing review from the database using information provided in the request body
      - request body must contain review_id

## Development

If you would like to contribute to this project, please fork this repository and propose your changes via a Pull Request.

You can install the project's dependencies by going to the root directory of the project and running `npm install`.

#### Currently Developed using...
- Node v12.18.3
- npm v6.14.6
- MongoDB v4.4

### Dependencies
- Express
- React/React Router/react-onclickoutside
- Styled-Components
- Mongoose
### Development Dependencies
- Webpack/Babel
- Jest/Enzyme/SuperTest/Mongodb-Memory-Server
- ESLint w/ Airbrb Style Guide

Refer to package.json file in the root directory for dependency version numbers.

