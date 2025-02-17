# URL Shortener

A simple and efficient URL Shortener application that allows users to create short versions of links, making them easier to share and communicate. For instance, transforming `https://some.place.example.com/foo/bar/biz` into `https://short.ly/abc123` simplifies the process, especially in situations like podcasts or print media.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Extra Credit](#extra-credit)
- [Linter and Tests](#linter-and-tests)
- [Clean up containers](#clean-up-containers)

## Features

- Create short URLs easily using a user-friendly web interface.
- Unique slug generation to ensure no duplicate short URLs.
- Redirect users from the short URL to the original stored URL.
- Display a 404 Not Found page for invalid slugs.
- Provided URL validation to ensure that only valid URLs are shortened.

## Requirements

- Build a web page with a form for entering a URL.
- Upon form submission, return a shortened version of the URL.
- Save a record of the shortened URL in a database.
- Ensure the slug of the URL is unique.
- When the shortened URL is accessed, redirect users to the stored URL.
- Display a 404 Not Found page for invalid slugs.

## Technology Stack

- **Project** Is a monorepo managed by NPM workspaces
- **Frontend:** React with TypeScript
- **Backend:** Node.js with TypeScript, DDD and inversify, express, micro-orm
- **Database:** MongoDB
- **Containerization:** Docker

## Installation

1. Clone this repository to your local machine:

    ```sh
    git clone https://github.com/your-username/url-shortener.git
    cd url-shortener
    ```

2. Add or copy `.env` to the root:

    ```sh
    cp .env.sample .env
    ```

3. [DEV env] Build and run the application using Docker:

    ```sh
    npm run docker:up
    ```

    Access the application at `http://localhost:3000`

4. Or [PROD env] Build and run the application using Docker:

    ```sh
    npm run docker:up:prod
    ```

    Access the application at `https://localhost`

## Usage

1. Open your browser and navigate to DEV env with `http://localhost:3000` or PROD env with `https://localhost`
2. Enter a valid URL into the input field and submit the form.
3. The application will return a shortened URL that you can use to redirect back to the original URL.
4. If you access an invalid slug, a 404 Not Found page will be displayed.

## Extra Credit

- [not supported currently] Support user accounts so individuals can view URLs they have created.
- Validate the provided URL is an actual URL and display an error message for invalid entries.
- Implement functionality to easily copy the shortened URL to the clipboard.
- [not supported currently] Allow users to modify the slug of their URL
- Track visits to the shortened URLs to gather analytics on usage.
- Add rate-limiting to prevent abuse of the service.
- Update the API to follow a known specification (such as JSON:API).

## Linter and Tests

1. Run linter:

    ```sh
    npm run lint:fix
    ```

2. Run tests:

    ```sh
    npm run test
    ```

3. Run type check:

    ```sh
    npm run type-check
    ```

## Clean up containers

1. Stop the used docker containers

    ```sh
    npm run docker:stop
    ```

2. Clean up the used docker containers

    ```sh
    npm run docker:cleanup
    ```

3. Clean up all + remove the used docker images

    ```sh
    npm run docker:purge
    ```
