# Prerequisites

1. Make sure you are aware of your Azure organization, project, repository,
 & target branch and add these details in the server-config.json file.

2. Ensure you possess a valid Azure token, otherwise create one by
 following the steps below.

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

1. Update the server-config.json file with relevant details.

2. Create a folder named SoftwarePracticesMetricsTool in
C: => Users => your_user_name => AppData => Local.

3. If you can't find AppData under your directory it might be hidden,
you can view it by checking Hidden items checkbox under View tab of your
file explorer top panel.

4. Copy the configured server-config.json file to SoftwarePracticesMetricsTool
directory.

5. Double click on the exe file of SoftwarePracticesMetricsTool to run the application.

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

4. After applying filters in the json file. Re run the application.

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

7. Refer the overview video [here](https://solitontech.sharepoint.com/:f:/r/sites/SolitonTechnologies/Shared%20Documents/%F0%9F%9A%80%20Utkarsh%20-%20Tech%20Force/TechOps/Tools/SoftwarePracticesMetricsTool?csf=1&web=1&e=amyPFk)
