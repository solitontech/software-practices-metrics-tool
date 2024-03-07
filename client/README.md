# React Starter Code

This repository contains software practices metrics tool code equipped with
essential configurations and dependencies.

## Dependencies Used

This frontend react code contains the following dependencies:

1. **React:** A declarative, efficient, and flexible Javascript library for
   building user interfaces.
2. **Vite:** A fast build tool that provides a lightning-fast development server
   and optimized production builds.
3. **Vitest:** A unit testing framework built on top of Vite with many modern
   features built-in.
4. **Tanstack Query** Powerful asynchronous state management for TS/JS, React
5. **React Testing Library:** A popular testing utility for React applications,
   provides a set of utilities that encourages best practices for
   maintainability, accessibility and test readability.
6. **Mock Service Worker:** An API mocking library that allows you to write
   client-agnostic mocks and reuse them across any frameworks, tools and
   environments.
7. **Material UI:** A popular React UI framework that implements Google's
   Material Design principles.

## Getting Started

Follow the installation instructions below to set up the project.

## Prerequisites

Make sure you have the following dependencies installed on your machine:

1. Node.js
2. Git
3. npm
4. Docker Desktop

## Installation

### 1. Copy the contents of this repository:

1. Copy all the contents of this starter code into the preferred directory
   within your project's repository.

### 2. Install Dependencies:

1. Once inside the starter code's base directory, run the following command to
   install the required dependencies.
   ```bash
   npm install
   ```
2. The above command reads the `package.json` file and installs all the
   necessary dependencies listed.

### 3. Start the application:

1. Once the dependencies are installed, you can start the application by running
   the following command in terminal:
   ```bash
   npm run dev
   ```
2. The above command will execute the specified script in the `scripts` section
   of the `package.json` file, typically used for starting the development
   server.

### 4. Access the Application:

1. Once the development server is running, open your web browser and go to the
   address [http://localhost:5173](http://localhost:5173) and access the
   application.

## Test the Application:

1.  This starter code comes pre-built with configurations for testing done using
    `Vitest` and `React Testing Library`.
2.  Once inside the starter code's base directory, run the following command in
    terminal to run the test scripts.
    ```bash
    npm run test
    ```
3.  This Repository contains a few placeholder test files that helps you get
    started with writing unit tests for your react application.
4.  This starter code also comes pre-built with configurations and placeholder
    request handlers for mocking API requests using `Mock Service Worker`.

## Test Coverage:

1.  This starter code comes pre-built with configurations for test coverage
    using `Vitest`.
2.  Once inside the starter code's base directory, run the following command in
    terminal to generate test coverage report for the application.
    ```bash
    npm run coverage
    ```

## Build the application:

1.  Once inside the starter code's base directory, run the following command in
    terminal to build the application.
    ```bash
    npm run build
    ```
2.  The above command will perform tasks such as bundling and minifying
    Typescript code, processing stylesheets and optimizing assets.

## Containerize the application:

### 1. Manual Containerization

1.  To convert the application into an docker image, execute the following
    command in the terminal.

    ```docker-compose
    docker build -t <image_name>:<version> <Dockerfile's directory>
    ```

    `image_name` - Unique identifier of an application's image.  
    `version` - Number that uniquely identifies incremental versions of an
    application's image. `Dockerfile's directory` - File location of the
    Dockerfile.

    An example build command can be found below:

    ```docker-compose
    docker build -t starter-code:0.1 .
    ```

2.  To run the above built docker image in an isolated container, execute the
    following command in the terminal.

    ```docker-compose
    docker run -d -p 80:80 --name <container_name> <image_name>
    ```

    `container_name` - Name of the container that spins up.  
    `image_name` - Name of the image that would be run inside the container.

    **Note:** The `image_name` should match the `image_name` from the above
    step.

### 2. Using docker compose file

1.  To build as well as run the image in an isolated container using
    `docker-compose` file, execute the following command in the terminal.

    ```docker-compose
    docker-compose up
    ```

    **Note:** Make sure to have `Docker Desktop` open before running the above
    commands.
