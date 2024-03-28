# Setup Guide

## Prerequisites

1. Make sure you are aware of your Azure organization, project, repository, &
   target branch and add these details in the `server-config.json` file.

2. Ensure you possess a valid Azure token, otherwise create one by following
   the steps below.

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

## Launching Metrics tool

1. Update the `server-config.json` file with relevant details.

2. Create a folder named `SoftwarePracticesMetricsTool` in below mentioned path.

   ```shell
   C:\Users\<your_user_name>\AppData\Local\SoftwarePracticesMetricsTool
   ```

3. If you can't find `AppData` under your directory it might be hidden, you can
   view it by checking Hidden items checkbox under View tab of your file explorer
   top panel.

4. Copy the configured `server-config.json` file to the newly created
   `SoftwarePracticesMetricsTool` folder.

   ```shell
   C:\Users\<your_user_name>\AppData\Local\SoftwarePracticesMetricsTool\server-config.json
   ```

5. Double click on the installer file to run the application.

## Using squads in server-config.json file

1. Please refer [Steps to get developer uuid](#steps-to-get-developer-uuid) &
   [Steps to get reviewer uuid](#steps-to-get-reviewer-uuid) to know how to get
   the uuids using the metrics tool before starting with below steps.

2. Update squads in `server-config.json` with relevant details for filtering in
   the application. Refer below format.

   ```JSON
   squads:[
     {
        "squadName": "Squad_name",
        "developers": {
           "9e1413a9-2b7c-6556-b441-e1eabfed5d43": "Developer_name_1",
           "9c1413b9-2b7c-8767-c252-e2eacfed5f43": "Developer_name_2"
        },
        "reviewers": {
           "4c56f2d9-f179-65fd-af3d-0650c183e580": "Reviewer_name"
        }
     }
   ]
   ```

3. Ensure entering unique squad name to avoid confusion. And enter the details
   of developers and reviewers as key value pairs specified in the below
   format.

   - `developer_uuid (or) reviewer_uuid : developer_name (or) reviewer_name`

4. After configuring filters in the `server-config.json` file. Re-run the application
   for the changes to take effect.

### Steps to get developer uuid

1. Open the application & got to code review page.

2. Go to the `Author` column of the code review metrics table.

3. Hover over the any one of the author name to see the author name and their uuid

4. Click on the author name to copy the author name and uuid to the clipboard.

5. Copy and paste the name & uuid in `server-config.json` in specified format.

### Steps to get reviewer uuid

1. Open the application & got to code review page.

2. Check in votes history timeline or current votes timeline to open the dialog modal
   for reviewers.

3. Go to the `Reviewed By` column of the votes timeline table.

4. Hover over the any one of the reviewer name to see the name and their uuid.

5. Click on the reviewer name to copy the reviewer name and uuid to the clipboard.

6. Copy and paste the name & uuid in `server-config.json` in specified format.

### Note

1. Squads are useful when you are working on large repository with a high volume
   of pull requests or you are finding it difficult to search your team pull requests.

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

4. If you set reviewers for squads and select them in the application, only pull
   requests containing those reviewers will be filtered.

5. A reviewer is recognized as such for a pull request only if they've given any
   vote on it.

6. Ensure you enter same name for developers & reviewers section in the `server-config.json`
   which will be displayed in the dashboard to avoid confusion.
