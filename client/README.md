# React Starter Code

This repository contains software practices metrics tool code equipped with
essential configurations and dependencies.

## Getting Started

Follow the installation instructions below to set up the project.

## Installation

### 1. Set Up Your Environment

Refer [Get Started](../README.md#getting-started) for setting up repository and
install dependencies.

### 2. Start the application

1. Once the dependencies are installed, you can start the application by running
the following command in terminal:

```bash
npm run start:dev
```

The above command will execute the specified script in the `scripts` section of
the `package.json` file, typically used
for starting the development server.

### 3. Access the Application

1. Once the development server is running, open your web browser and go to the address
   [http://localhost:5173](http://localhost:5173) and access the application.

## Test the Application

1. This repository consists of unit, integration, E2E tests for client.
2. While running the E2E tests make sure you are running the client and server.

```bash
# command to run unit & integration tests
$ npm run test

# command to run E2E tests.
$ npm run test-e2e
```

## Test Coverage

1. Inside the starter code's base directory, run the following command in terminal
to generate test coverage report for the application.

```bash
npm run coverage
```

## Linting & formatting

Linting and formatting are essential for maintaining code quality and consistency
throughout a project.

**1. Check for Linting Issues:**

   ```bash
   npm run lint
   ```

   This command runs the linter to check for any syntax errors, code style
   violations, or potential bugs in your codebase. It provides a report of any
   issues found, helping you identify areas for improvement.

**2. Fix Linting Issues Automatically:**

   ```bash
   npm run lint-fix
   ```

   This command not only checks for linting issues but also attempts to
   automatically fix them where possible. It's useful for quickly addressing
   common issues and ensuring that your code follows the defined coding standards.

**3. Check for CSS Lint Issues:**

   ```bash
   npm run lint:css
   ```

   This command runs the linter to check for any css syntax errors, code style
   violations, or potential bugs in your codebase. It provides a report of any
   issues found, helping you identify areas for improvement.

**4. Fix CSS Linting Issues Automatically:**

   ```bash
   npm run lint-:css
   ```

   This command not only checks for css linting issues but also attempts to
   automatically fix them where possible. It's useful for quickly addressing
   common issues and ensuring that your code follows the defined coding standards.

**5. Format Codebase:**

   ```bash
   npm run format
   ```

   This command formats your codebase according to the configured code style
   rules. It helps maintain consistency in code formatting across different
   files and modules, making the codebase easier to read and understand.

**6. Format check:**

   ```bash
   npm run format-check
   ```

   This command runs the formatter to check for any css formatting violations in
   your codebase. It provides a report of any issues found, helping you identify
   areas for improvement.

## Build the application

1. Once inside the code's base directory, run the following command in terminal
to build the application.

```bash
npm run build
```

The above command will perform tasks such as bundling and minifying Typescript
code, processing stylesheets and optimizing assets.
