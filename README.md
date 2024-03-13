# Software Practices Metrics Tool

The Software Practices Metrics Tool is an open-source project aimed at assisting teams in measuring
 and enhancing their adherence to industry-recommended software practices. Follows client-server
  architecture, the tool harnesses React for the client-side interface and Express Node.js for
   the server. It offers comprehensive insights into crucial practices like code review and
    trunk-based development, empowering teams to elevate the quality and efficiency of their
     projects. Presently, it supports projects housed in Azure DevOps repositories.

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

Additionally, configure your development environment by installing the following
 Visual Studio Code extensions:

- **Code Spell Checker**: Helps to catch spelling errors in your code and comments.
- **Error Lens**: Highlights and annotates errors and warnings directly on your code.
- **ESLint**: Provides linting for JavaScript and TypeScript files to maintain code quality.
- **Markdownlint**: Ensures proper formatting and adherence to Markdown standards in your Markdown files.
- **Prettier - Code Formatter**: Automatically formats your code to maintain consistent styling.
- **Todo Tree**: Helps to manage and visualize TODO comments in your code.
- **YAML**: Provides syntax highlighting and validation for YAML files.

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

### Configure server configuration file

To connect the Software Practices Metrics Tool to your Azure DevOps repositories, you need
 to configure the server configuration file named `server-config.json`. This file contains
  the necessary settings for authentication and repository connection.

Below is an example of the `server-config.json` file:

```json
{
"targetBranch": "main",
"organization": "Soliton",
"projectName": "my_project",
"repositoryId": "my_repository",
"authToken": "my_auth_token",
"squads": []
}
```

**Server Configuration File Breakdown:**

The `server-config.json` file in server directory contains the necessary settings to connect
 the Software Practices Metrics Tool to your Azure DevOps repositories. Below is a breakdown
  of each configuration option:

- **`targetBranch`:**  
The default branch in your Azure DevOps repository.

- **`organization`:**  
The name of your Azure DevOps organization.

- **`projectName`:**  
The name of your project within the Azure DevOps organization.

- **`repositoryId`:**  
The ID of the repository you want to connect to.

- **`authToken`:**  
Your personal access token (PAT) for authentication. You can follow the steps outlined
 [here](#steps-to-create-azure-devops-token) to create a PAT.

- **`squads`:**  
An optional field for defining squads or teams associated with the project. You can follow
 steps outlined [here](#using-squads-in-server-configjson-file) to configure squads.

Make sure to replace the placeholder values (`my_project`, `my_repository`, `my_auth_token`, etc.)
 with your actual Azure DevOps project details and personal access token.

Once you've configured the `server-config.json` file, you'll be ready to connect the tool to
 your Azure DevOps repositories.

### Run the Project

Launch the server and client components of the tool to start analyzing your project's
 software practices metrics.

```bash
# Start the server
$ cd server
$ npm run start:dev

# Start the client
$ cd ../client
$ npm run dev
```

Once both the server and client components are running, you can access the application
 by navigating to <http://localhost:5173> in your web browser.

Keep in mind that if there are any validation errors in the server configuration file
 (server-config.json), the server won't run properly. Ensure that you have correctly
  configured the necessary settings such as the target branch, organization, project name,
   repository ID, and authentication token before starting the server.

## Steps to create Azure devops Token

1. Sign up to [Azure Devops](https://dev.azure.com/).

2. Find Personal access tokens in user settings (beside profile picture).

3. Click on Personal access tokens.

4. Create new Token by clicking on `New Token`.

5. Enter a name for your token.

6. Choose the organization where you want to use the token.

7. Set the expiration, scopes as `Custom defined` and tick `Read` for Code.

8. Click on `Create`.

9. Ensure to copy and save the token value as **it won't be recoverable if lost.**

## Using squads in server-config.json file

1. Please refer [Steps to get developer uuid](#steps-to-get-developer-uuid) &
 [Steps to get reviewer uuid](#steps-to-get-reviewer-uuid)
to know how to get the uuids using our tool before starting with below steps.

2. Update squads in `server-config.json` with relevant details
 for filtering in the application. Refer below format.

    ```JSON
    squads:[
        {
            "squadName": "Squad_name",
            "developers": {
                "9e1413a9-2b7c-6556-b441-e1eabfed5d43": "Developer_name"
            },
            "reviewers": {
                "4c56f2d9-f179-65fd-af3d-0650c183e580": "Reviewer_name"
            }
        }
    ]
    ```

3. Ensure entering unique squad name to avoid confusion. And enter the details
of developers and reviewers as array of key value pairs specified in the below
format.
   - `developer_uuid (or) reviewer_uuid : developer_name (or) reviewer_name`

### Steps to get developer uuid

1. Open the application & got to code review page.

2. And use browser dev tools to inspect on code review table.

3. Using the select in dev tools, click on the author name in the code review
 table and go to inspect tab to get developer name and uuid
  from the title tag of the html element.

4. Also you can get uuid from data-uuid tag of html element.

5. Copy and paste the name & uuid in `server-config.json` in specified format.

### Steps to get reviewer uuid

1. Open the application & got to code review page.

2. Check in votes history timeline or current votes timeline for reviewers.

3. And use browser dev tools to inspect on timeline table.

4. Using the select in dev tools, click on the reviewer name in the timeline
 table and go to inspect tab to get reviewer name and uuid from
  the title tag of the html element.

5. Also you can get uuid from data-uuid tag of html element.

6. Copy and paste the name & uuid in `server-config.json` in specified format.

### Note

1. Squads are useful when you are working
 on large repository with a high volume of pull requests or you are
 finding it difficult to search your team pull requests.

2. Squads are optional configuration.

3. In a squad, reviewers are not required fields, while at least one developer
 is mandatory. Refer below format.

    ```JSON
   squads:[
      {
         "squadName": "Squad_name",
         "developers": {
            "9e1413a9-2b7c-6556-b441-e1eabfed5d43": "Developer_name"
         }
      }
   ] 
   ```

4. If you set reviewers for squads and select them in the application,
 only pull requests containing those reviewers will be filtered.

5. A reviewer is recognized as such for a pull request only if they've given
 any vote on it.

6. Ensure you enter same name for developers & reviewers section in the
 `server-config.json` which will be displayed in the dashboard to avoid confusion.

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
