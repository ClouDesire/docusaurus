---
id: customer-cloud-credentials
title: Customer Cloud Credentials
sidebar_label: Customer Cloud Credentials
---

Customers can provide credentials to provision [bare vm](vm.md) and [docker
applications](docker.md) on their own public [cloud provider
account](clouds.md).

## AWS

You can use your AWS account on the platform by providing:

* Identifier: a unique description useful for recognizing this credentials among
  the others
* Access key: the access key ID (for example, AKIAIOSFODNN7EXAMPLE)
* Secret key: the secret access key (for example,
  wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY)
* Resource name: the ARN identifying your amazon account in the form `arn:aws:iam::<account-id>:role/OrganizationAccountAccessRole`. Replace `<account-id>` with your account numeric ID (e.g: 012345678901)

Obtain the credentials on the [IAM](https://console.aws.amazon.com/iam/home) section of the AWS console.

## Azure

To configure a Cloud Credential for azure, you need to provide:

* Identifier: a unique description useful for recognizing this credentials among
  the others
* Identity: `f752ce48-618a-44f8-b5ef-47b5ab9b25b2` (Application ID)
* Credential: `51wYIN41AC.UU29tzeT9l_xx89~1Pw~MDK` (Application secret)
* Endpoint: `https://management.azure.com/subscriptions/d7759627-d2df-4caa-8f02-6fa88b694b4f` (Subscription id)
* OAuth endpoint: `https://login.microsoftonline.com/96fabb56-8782-4f37-b6f2-ae41118a6b43/oauth2/token` (Tenant id)

You can obtain Azure credentials on the [Azure portal](https://portal.azure.com) by configuring the following objects: 

* an **Azure Application Registration**, one per Azure Tenant
* an **Azure Subscription**, one per Sustained Tenant Subscription

Before going throught the istructons below, you need to use Notepad, or equivalent text editor, to keep track on the produced information needed for the final step.

### Configure Azure Application Registration

* Go to the [Azure portal](https://portal.azure.com) dashboard
* Access the **Azure Active Directory** [service](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Overview)
* Under **Manage** menu section, click on **App registrations** [menu](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps) 
* Create a new app with the **New registration** button
  * Choose a name of your preference and fill the **Name** field, and also paste it in notepad as key value pair  
`App Reg Name=...your app reg name...`
  * Leave defaults for remaining settings
  * Press **Register** button
* Now you are inside the just created App Registration object and you can see all the related details. If not, click and go inside the object.
* Look for the **Essentials** Section
  * Copy **Application (client) ID** field value and paste it in notepad  
  `Application (client) ID= xxxxxx`
  * Copy **Directory (tenant) ID** field value and paste it notepad  
  `Directory (tenant) ID= yyyyyyy`
* Under **Manage** menu section, go in **Certificates & secrets** menu
  * Under the **Client secret** section, create a new secret by pressing the **New client secret** button
    * Open the **Expire** listbox and select your preferred expiration time for this credential
    * Press the **Add** button
  * Copy from the secret **Value** column the value and paste it in notepad  
  `secret= zzzz`

### Grant access to Azure Subscription

* Go to the [Azure portal](https://portal.azure.com) dashboard
* Access the Subscriptions [service](https://portal.azure.com/#blade/Microsoft_Azure_Billing/SubscriptionsBlade)
* Click and enter in your **Azure subscription** (the name is equal to Azure Sustained Tenant Subscription you have already created)
  * Copy **Subscription ID** and paste it on notepad  
  `Subscription ID= wwwwww`
* Go in the **Access control (IAM)** menu of your subscription
* Click on **Add role assignments (Preview)** Button inside the **Grant access to this resource** box
  * Select **Contributor** as Role
  * Press **Next**
  * Click on **+ Select members**
    * On lateral side, Select field, digit the **App Reg Name** you have in your notepad
    * Click on the appeared icon
    * The App Registration Name goes to the **Selected members** section
    * Click on **Select** Button
  * Click on **Next** Button
  * Click on **Review + assign** Button

Now you are ready to create a new Cloud Credential on the Cloudesire panel.
In the notepad you should have:

    App Reg Name=...your app reg name...
    Application (client) ID= xxxxxx
    Directory (tenant) ID= yyyyyyy
    secret= zzzz
    Subscription ID= wwwwww
    
### Create Cloud Credential for Azure

* Open Cloudesire Dashboard
* Open Menu **Cloud Credentials**
* Press the **Add** button
	* In Cloud Providers, select **Azure: Global**
	* Give your preferred name on **Identifier**. You will refer to it when Cloud Credential is required.
	* Identity field value=Application (client) ID
	* Credential field value=secret value
	* In notepad create the following String URL using the Subscription ID value you have already: 
	* Endpoint field value= https://management.azure.com/subscriptions/subscriptios_id
	* In notepad create the following String URL using the Directory (tenant) ID value you have already: 
	* Oauth endpoint field value= https://login.microsoftonline.com/Directory_(tenant)_ID/oauth2/token
	* Save

