# SoundCloud Comments Service

> A Soundcloud (clone) service that handles and displays the comments for a song.

## Related Projects:

- Description Service: https://github.com/rpt23-sdc-scifi/kara-song-description
- Images Service: https://github.com/rpt23-sdc-scifi/kara-soundcloud-images
- Songs Service: https://github.com/rpt23-sdc-scifi/Music
- Related Tracks Service: https://github.com/rpt23-sdc-scifi/George-Related-Tracks
- Hugo's Proxy: https://github.com/rpt23-sdc-scifi/hugo-proxy

## Table of Contents:

1. [Oerview](#overview)
1. [Setup](#setup)
1. [Usage](#usage)
1. [API](#api)
1. [Development](#development)

## Overview:

For Hack Reactor's culminating Systems Design Capstone project, focused on databases and production deployment and optimization, students are asked to create 10 million mock primary records (i.e. songs).

This comments service, which generates between 0 and 10 comments per song, stores up to 100 million records. A seeding script to generate this mock data is provided.

## Setup:

1. Clone this repo and go to its root directory.
1. Run `npm install` to install its dependencies.
1. Seed the database with `npm run seed`.
1. Run `npm run build` to build the browser components.
1. After building the components, run `npm run sever` to start the application in development mode.
1. Access the app at **localhost:4000/{song_id}** where **{song_id}** is the Song ID. A list of comments by song is displayed.

### *Requirements*:

- Node.js
- MongoDB

## API:

### GET COMMENTS: `/api/comments`

- List all existing comments. Can retrieve comments for a specific song.
- Request Parameters:
  - `song_id` [string] [query parameter]
    - Example: **/api/comments/?song_id=1**
- Responses:
  - 200 OK [object] [json]
  - Example:

```javascript
{
  "count": 20011, // [integer] the number of records returned
  "data": [ /* array[object] list of comments */
    {
      "comment_id": "5fc3223c5b11641d723798c8", // [string] Mongo ObjectID; unique identifier
      "user_id": 4, // [integer] ID of associated user
      "song_id": 29, // [integer] ID of associated song
      "content": "Id anim dolor ea aliquip occaecat consectetur.", // [string]
      "time_stamp": 125, // [integer] location in song where comment was made by seconds
    }
  ]
}
```

- GET COMMENTS BY SONG ID: **/api/comments/song/:id**
- GET COMMENTS BY COMMENT ID: **/api/comments/id:id**
  - /api/reviews/:product_id/summary
    - retrieves the average rating/summary for a review of a product
  - /api/reviews/:product_id
    - retrieves all the reviews for a product
- POST: **/api/comments**

  - creates a new review using information prodivided in the request body
    - request body must contain product_id, username, review_heading, review_text, and review_rating

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
