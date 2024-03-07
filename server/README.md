# Software Practices Metrics Tool

This repository contains the backend code for API's related to Software Practices Metrics tool.

## Dependencies Used

The server contains the following dependencies:

1. **@ptkdev/logger**: The best alternative to prettify the console.log statement -
   [npm link](https://www.npmjs.com/package/@ptkdev/)
2. **axios**: A popular HTTP client for making HTTP requests. It can be used to send HTTP requests and handle
   responses - [npm link](https://www.npmjs.com/package/axios)
3. **btoa**: Stands for "binary to ASCII," and it is typically used to encode binary data as a base64-encoded ASCII
   string - [npm link](https://www.npmjs.com/package/btoa)
4. **dotenv**: A zero-dependency module that loads environment variables from a .env file into process.env -
   [npm link](https://www.npmjs.com/package/dotenv)
5. **express**: A fast, minimalist web framework for Node.js - [npm link](https://www.npmjs.com/package/express)
6. **joi**: A powerful schema description language and data validator for JavaScript -
   [npm link](https://www.npmjs.com/package/joi)
7. **@joi/date**: A package that extends the functionality of the popular validation library Joi to include additional
   date-related validation features - [npm link](https://www.npmjs.com/package/@joi/date)

## Getting Started

Follow the installation instructions below to set up the project.

## Prerequisites

Make sure you have the following dependencies installed on your machine:

1. Node.js (v20.11.0)
2. Git
3. npm

## Installation

### 1. Copy the contents of this repository

1. Copy all the contents of this Backend code into the preferred directory within your project's repository.

### 2. Install Dependencies

1. Once inside the Backend code's base directory, run the following command to install the required dependencies.

   ```bash
   npm install
   ```

2. The above command reads the `package.json` file and installs all the necessary dependencies listed.

### 3. Set up env file

1. Edit the `.env` file with valid repository details.

   1. Create a organization, repository and project under azure devops.

      - URL: <https://dev.azure.com/>.

   2. Authorization: Create a token in Azure and add the token as password here.

      - Steps to create Token:

        1. Sign up to Azure Devops. - <https://dev.azure.com/>
        2. Click on your profile picture in the top right corner.
        3. Click the Hamburger icon.
        4. click on User Settings.
        5. click on Personal Access Tokens.
        6. Create new Token by clicking on `New Token`.
        7. Enter a name for your token.
        8. Choose the organization where you want to use the token.
        9. Set the expiration, scopes, and any other relevant settings.
        10. Click on `Create`.
        11. Make sure to copy and save the token value because it won't be visible again.

### 4. Start the application

1. Once the dependencies are installed, you can start the application by running the following command in terminal:

   ```bash
   npm run start:dev
   ```

2. The above command will execute the specified script in the `scripts` section of the `package.json` file, typically
   used for starting the development server.

### 5. Access the Application

1. Once the development server is running, open your web browser and go to the address
   [http://localhost:3000](http://localhost:3000) and access the application.

## Release to production

1. TODO: After Integrating with CI/CD update the steps here

## API End Points

1. Swagger Open API specification document can be accessed at the following URL:

   1. <http://localhost:3000/open-api-spec-doc/>
