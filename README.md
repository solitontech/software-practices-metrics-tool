# Software Practices Metrics Tool

**Software Practices Metrics tool** is designed to provide automated analytics
on software practices like code review metrics & trunk-based development. These
analytics & insights derived will help developers & teams to continuously
improve their software delivery efficiency & measure their performance.

## Client README

For details on the client-side interface, check out the [Client README](./client/README.md).

## Server README

For more information about the server-side implementation, please refer to the [Server README](./server/README.md).

## Overview

In today's fast-paced software development environment, adhering to best practices is crucial
 for ensuring code quality, collaboration, and overall project success. The Software Practices
  Metrics Tool offers a robust solution for evaluating and optimizing these practices
   within your development workflow.

### Key Features

- **Code Review Analysis:** Gain insights into the effectiveness of code reviews, including
 metrics on review times, feedback cycles, and reviewer participation.
  
- **Trunk-Based Development Metrics:** Monitor the health of your trunk-based development approach,
 with data on branch lifecycles, merge frequency, and adherence to naming conventions.

## Getting Started

To start using the Software Practices Metrics Tool, follow these simple steps:

### Clone the Repository

To get started, clone the project repository to your local machine. Open your terminal
and execute the following command:

```bash
git clone https://github.com/solitontech/Software-Practices-Metrics-tool.git
```

### Set Up Your Environment

Before proceeding, make sure you have Node.js and npm installed on your system. We recommend using
Node.js version 20.11.1 for compatibility. You can download and install it from the
[official Node.js website](https://nodejs.org/).

Additionally, we recommend to use Visual Studio Code for this codebase. If you haven't already
 installed it, you can download it from the [official VS Code website](https://code.visualstudio.com/).

Once you have Visual Studio Code installed, you can proceed to install the following extensions:

- **[Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)**: Helps to catch spelling errors in your code and comments.
- **[Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)**: Highlights and annotates errors and warnings directly on your code.
- **[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)**: Provides linting for JavaScript and TypeScript files to maintain code quality.
- **[Markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)**: Ensures proper formatting and adherence to Markdown standards in your Markdown files.
- **[Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)**: Automatically formats your code to maintain consistent styling.

You can install these extensions directly from the Visual Studio Code marketplace.
Simply search for each extension by name and click the "Install" button.

Once you have Node.js installed and the recommended extensions set up in Visual Studio Code,
you're ready to proceed with configuring the project environment.

#### Client Setup

```bash
cd client
npm install
```

#### Server Setup

```bash
cd server
npm install
```

### Run the Project

Refer [Configure server configuration file](./server/README.md/configure-server-configuration-file)
to configure server config file.

Launch the server and client of the tool to start analyzing your project's
 software practices metrics.

```bash
# Start the server
$ cd server
$ npm run start:dev

# Start the client
$ cd ../client
$ npm run start:dev
```

Once both the server and client are running, you can access the application
 by navigating to <http://localhost:5173> in your web browser.

Keep in mind that if there are any validation errors in the server configuration file
 (server-config.json), the server won't run properly. Ensure that you have correctly
  configured the necessary settings such as the target branch, organization, project name,
   repository ID, and authentication token before starting the server.

## Contribution Guidelines

We welcome contributions from the community to enhance and expand the functionality of the
 Software Practices Metrics Tool. Please refer to the [Contributing Guidelines](CONTRIBUTING.md)
  for instructions on how to get involved.

## License

The Software Practices Metrics Tool is distributed under the [GNU General Public License (GPL) version 3.0](LICENSE).
 Feel free to use, modify, and distribute the tool in accordance with the terms of this license.

## Contact

For any questions, feedback, or collaboration opportunities, please reach out to
 us at <techops@solitontech.com>.
