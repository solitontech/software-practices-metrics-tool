# Setup Guide

## Prerequisites

Make sure you are aware of your Azure organization, project, repository, &
target branch and add these details in the `server-config.json` file.
You can get the `server-config.json` details as described [here](https://github.com/solitontech/software-practices-metrics-tool/blob/main/server/README.md/#configure-server-configuration-file).

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

## Optional Configuration in server-config.json File

Please refer this [guide](https://github.com/solitontech/software-practices-metrics-tool/blob/main/server/README.md/#optional-configurations-in-server-configjson-file)
to know about how to configure optional squads field.

### Note

After configuring optional configuration, rerun the application.
