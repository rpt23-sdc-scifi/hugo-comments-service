# SoundCloud Comments Service

> A Soundcloud (clone) service that handles and displays the comments for a song.

&nbsp;

## Related Projects:

- Description Service: https://github.com/rpt23-sdc-scifi/kara-song-description
- Images Service: https://github.com/rpt23-sdc-scifi/kara-soundcloud-images
- Songs Service: https://github.com/rpt23-sdc-scifi/Music
- Related Tracks Service: https://github.com/rpt23-sdc-scifi/George-Related-Tracks
- Hugo's Proxy: https://github.com/rpt23-sdc-scifi/hugo-proxy

## Table of Contents:

1. [Oerview](#overview)
1. [Usage](#usage)
1. [API](#api)
1. [Development](#development)

## Overview:

For Hack Reactor's culminating Systems Design Capstone project, focused on databases and production deployment and optimization, students are asked to create 10 million mock primary records (i.e. songs).

This comments service, which generates between 0 and 10 comments per song, stores up to 100 million records. A seeding script to generate this mock data is provided.

## API:

### `/api/comments` GET

- List all existing comments. Can retrieve specific comments based on diferent search critiera.
- Request Parameters:
  - QUERY PARAMETERS:
    - `song_id`: [integer] *optional*
    - `user_id`: [integer] *optional*
    - `time_stamp`: [integer] *optional*
    - `content`: [string] *optional*
      - Example: **/api/comments/?song_id=125**
- Request Body: N/A
- Responses:
  - `200 OK` [object] [json]
    - Example:
      ```javascript
      {
        "count": 20011, // [integer] number of comments returned
        "data": [ /* array[object] list of comments */
          {
            "comment_id": "5fc3223c5b11641d723798c8", // [string] Mongo ObjectID; unique identifier
            "user_id": 4, // [integer] ID of associated user
            "song_id": 29, // [integer] ID of associated song
            "content": "Id anim dolor ea aliquip.", // [string] comment text
            "time_stamp": 125, // [integer] comment timestamp in song by seconds
          }
        ]
      }
      ```
  - `400 BAD REQUEST` [object] [json] > *returns an error message*

&nbsp;

### `/api/comments/{commentId}` GET

- Retrieve one comment based on a unique ID identifier.
- Request Parameters:
  - PATH PARAMETERS:
    - `commentId`: [string] *required*
    - Example: **/api/comments/5fc3223c5b11641d723798c8**
- Request Body: N/A
- Responses:
  - `200 OK` [object] [json]
    - Example:
      ```javascript
      {
        "comment_id": "5fc3223c5b11641d723798c8", // [string] Mongo ObjectID; unique identifier
        "user_id": 4, // [integer] ID of associated user
        "song_id": 29, // [integer] ID of associated song
        "content": "Id anim dolor ea aliquip.", // [string] comment text
        "time_stamp": 125, // [integer] comment timestamp in song by seconds
      }
      ```
  - `400 BAD REQUEST` [object] [json] > *returns an error message*

&nbsp;

### `/api/comments` POST
- Create a new comment.
- Request Parameters: N/A
- Request Body: [json]
    - `user_id`: [integer] *required*
    - `song_id`: [integer] *required*
    - `content`: [string] *required*
    - `time_stamp`: [string] *required*
  - Example:
    ```javascript
    {
      "user_id": 45,
      "song_id": 182,
      "content": "WTF??? This song is terrible.",
      "time_stamp": 333,
      "random": true
    }
    ```
- Responses:
  - `201 OK` [object] [json] > *returns the created comment*
  - `400 BAD REQUEST` [object] [json] > *returns an error message*

&nbsp;

### `/api/comments/{commentId}` PATCH
- Update one or many properties of an existing comment based on a unique ID identifier.
- Request Parameters:
  - PATH PARAMETERS:
    - `commentId`: [string] *required*
        - Example: **/api/comments/5fc3223c5b11641d723798c8**
- Request Body: [json]
    - `user_id` [integer] *optional*
    - `song_id` [integer] *optional*
    - `content` [string] *optional*
    - `time_stamp` [string] *optional*
  - Example:
    ```javascript
    {
      "user_id": 35,
      "content": "Wow, this is the best song EVER!!!",
    }
    ```
- Responses:
  - `200 OK` [object] [json] > *returns the updated comment*
  - `400 BAD REQUEST` [object] [json] > *returns an error message*

&nbsp;

### `/api/comments/{commentId}` DELETE
- Delete an existing comment based on a unique ID identifier.
- Request Parameters:
  - PATH PARAMETERS:
    - `commentId`: [string] *required*
      - Example: **/api/comments/5fc3223c5b11641d723798c8**
- Request Body: N/A
- Responses:
  - `200 OK` [object] [json] > *returns the deleted comment*
  - `400 BAD REQUEST` [object] [json] > *returns an error message*

&nbsp;

## Development:

If you would like to contribute to this project, please fork this repository and propose your changes via a Pull Request.

You can install the project's dependencies by going to the root directory of the project and running `npm install`.

### Setup:

1. Clone this repo and go to its root directory.
1. Run `npm install` to install its dependencies.
1. Seed the database with `npm run seed`.
1. Run `npm run build` to build the browser components.
1. After building the components, run `npm run sever` to start the application in development mode.
1. Access the app at **localhost:4000/{song_id}** where **{song_id}** is the Song ID. A list of comments by song is displayed.
1. Run tests with `npm run tests`.

#### _Requirements_:

- Node.js
- MongoDB

#### _Currently Developed using..._:

- Node 14.9.0
- npm 6.14.8
- MongoDB 4.4.0

#### _Dependencies_:

- Express
- React
- Styled-Components
- Mongoose
- Axios

#### _Development Dependencies_:

- Webpack/Babel
- Chai/Mocha
- Brotli

Refer to package.json file in the root directory for dependency version numbers.
