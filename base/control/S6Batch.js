/**
 * S6Batch is a class to execute a Google Apps Script function asynchronously using Google Cloud Pub/Sub.
 */
class S6Batch {
  /**
   * This method publishes a message to the Google Cloud Pub/Sub topic that will trigger the Google Apps Script function.
   * @param {string} functionName - The name of the Google Apps Script function to execute.
   * @param {Object} job - The data that will be passed to the Google Apps Script function.
   */
  static batch(functionName, job) {
    S6Validate.mandatory("functionName", functionName);
    const userAccessToken = ScriptApp.getOAuthToken();
    const secret = S6Batch._makeToken();

    const webappUrl = S6Batch._getScriptUrl();
    const data = {
      functionName: functionName,
      job: job
    };
    const message = {
      webappUrl: webappUrl,
      data: data, // Replace with your data
      token: secret, // Unique token for authentication
      userAccessToken: userAccessToken
    };
    console.log(message);

    const encodedMessage = Utilities.base64EncodeWebSafe(JSON.stringify(message));
    const pubSubUrl = "https://pubsub.googleapis.com/v1/projects/s6-g-tools/topics/batch.job:publish";

    const serviceAccount = S6Batch._getPubSubServiceAccount();
    const token = serviceAccount.getAccessToken();

    const options = {
      method: 'post',
      contentType: 'application/json',
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: JSON.stringify({
        messages: [{
          data: encodedMessage
        }]
      }),
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(pubSubUrl, options);
    const responseCode = response.getResponseCode();
    const responseBody = response.getContentText();

    console.log('Response code:', responseCode);
    console.log('Response body:', responseBody);
  }

  /**
   * This method generates a unique token to be used as an authentication mechanism.
   * @returns {string} A unique token.
   * @private
   */
  static _makeToken() {
    var res = Utilities.getUuid();
    CacheService.getScriptCache().put(res + "", res);
    return res;
  }

  /**
   * This method validates a token to ensure that it was not used previously and removes it at the same time. 
   * @param {string} token - The token to validate.
   * @returns {boolean} True if the token is valid, false otherwise.
   * @private
   */
  static _consumeToken(token) {
    var res = false;
    const tokenCache = CacheService.getScriptCache();
    const tokenValue = tokenCache.get(token);

    if (tokenValue !== null) {
      res = true;
      tokenCache.remove(token); // Remove the token from the cache after validation
    }
    return res;
  }

  /**
   * This method returns the URL of the Google Apps Script web app that will be triggered by the message sent to Google Cloud Pub/Sub.
   * @returns {string} The URL of the Google Apps Script web app.
   * @private
   */
  static _getScriptUrl() {
    var res = ScriptApp.getService().getUrl();
    const deployments = S6Batch._getLatestDeployments();

    if (!res.includes(`/exec?id=${deployments.deploymentId}`)) {
      var domain = S6Utility.getDomainName();
      res = `https://script.google.com/a/macros/${domain}/s/${deployments.deploymentId}/dev`;
    }
    return res;
  }

  /**
 * Gets the latest deployment information of the script.
 * @return {object} Latest deployment information.
 */
  static _getLatestDeployments() {
    const id = ScriptApp.getScriptId();
    const token = ScriptApp.getOAuthToken();

    const uri = `https://script.googleapis.com/v1/projects/${id}/deployments`;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      muteHttpExceptions: true,
    };

    const response = UrlFetchApp.fetch(uri, options);

    if (response.getResponseCode() !== 200) {
      console.log(response.getContentText());
      return [];
    }

    const { deployments } = JSON.parse(response.getContentText());

    return deployments[0];
  }

  /**
   * Gets the service account secret from the Secret Manager and returns it as a JSON object.
   * @return {object} The service account secret as a JSON object.
   */
  static _getSecretForServiceAccount() {
    var res = EMPTY;

    // resource ID of the secret to retrieve
    const resourceId = 'projects/538345115646/secrets/ServiceAccount';

    // Version of the secret to retrieve
    const version = 'latest';
    const url = `https://secretmanager.googleapis.com/v1/${resourceId}/versions/${version}:access`;
    console.log(url);

    const accessToken = ScriptApp.getOAuthToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const options = {
      method: "GET",
      headers: headers,
    };

    const response = UrlFetchApp.fetch(url, options);
    const base64Secret = JSON.parse(response.getContentText()).payload.data;
    res = JSON.parse(Utilities.newBlob(Utilities.base64Decode(base64Secret)).getDataAsString());

    // Do something with the secret
    return res;
  }

  /**
   * Gets an OAuth2 service account client for Google Cloud Pub/Sub.
   * @return {OAuth2.Service} The OAuth2 service account client for Google Cloud Pub/Sub.
   * @throws {Error} If authentication fails.
   */
  static _getPubSubServiceAccount() {
    const privateKey = S6Batch._getSecretForServiceAccount();

    const serviceAccount = OAuth2.createService('GooglePubSub')
      .setTokenUrl('https://oauth2.googleapis.com/token')
      .setPrivateKey(privateKey.private_key)
      .setIssuer(privateKey.client_email)
      .setPropertyStore(PropertiesService.getScriptProperties())
      .setCache(CacheService.getScriptCache())
      .setLock(LockService.getScriptLock())
      .setScope(['https://www.googleapis.com/auth/pubsub']);

    if (!serviceAccount.hasAccess()) {
      throw new Error('Failed to authenticate with the service account: ' + serviceAccount.getLastError());
    }

    return serviceAccount;
  }
}
function doPost(e) {
  console.log(e);
  console.log(Session.getActiveUser().getEmail());
  const requestData = JSON.parse(e.postData.contents);
  const token = requestData.token;
  console.log(token);

  // Verify the token is the same as the one sent in the original Pub/Sub message
  // You can store the sent tokens in a time-limited cache (e.g., using CacheService)
  // and check if the received token exists in the cache

  if (S6Batch._consumeToken(token)) {
    const data = requestData.data;
    console.log(data);
    const job = data.job;
    const functionName = data.functionName;
    this[functionName](job);
    console.log("WebApp", functionName, 'Request processed successfully')
    return ContentService.createTextOutput('Request processed successfully');
  }
  else {
    console.log("WebApp", "Invalid token")
    return ContentService.createTextOutput('Invalid token')
      .setMimeType(ContentService.MimeType.TEXT);
  }
}


