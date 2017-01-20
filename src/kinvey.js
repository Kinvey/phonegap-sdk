import HTML5Kinvey from 'kinvey-html5-sdk';
import { KinveyError } from 'kinvey-node-sdk/dist/errors';
import Client from './client';
import User from './user';
import Push from './push';

class Kinvey extends HTML5Kinvey {
  /**
   * Initializes the SDK with your app's information. The SDK is initialized when the returned
   * promise resolves.
   *
   * @param {Object}    options                                            Options
   * @param {string}    [options.apiHostname='https://baas.kinvey.com']    Host name used for Kinvey API requests
   * @param {string}    [options.micHostname='https://auth.kinvey.com']    Host name used for Kinvey MIC requests
   * @param {string}    [options.appKey]                                   App Key
   * @param {string}    [options.appSecret]                                App Secret
   * @param {string}    [options.masterSecret]                             App Master Secret
   * @param {string}    [options.encryptionKey]                            App Encryption Key
   * @param {string}    [options.appVersion]                               App Version
   * @return {Promise}                                                     A promise.
   *
   * @throws  {KinveyError}  If an `options.appKey` is not provided.
   * @throws  {KinveyError}  If neither an `options.appSecret` or `options.masterSecret` is provided.
   */
  static initialize(options = {}) {
    // Check that an appKey or appId was provided
    if (!options.appKey) {
      return Promise.reject(
        new KinveyError('No App Key was provided. ' +
          'Unable to create a new Client without an App Key.')
      );
    }

    // Check that an appSecret or masterSecret was provided
    if (!options.appSecret && !options.masterSecret) {
      return Promise.reject(
        new KinveyError('No App Secret or Master Secret was provided. ' +
          'Unable to create a new Client without an App Key.')
      );
    }

    // Initialize the client
    const client = Client.initialize(options);

    // Load the active user
    return User.loadActiveUser(client);
  }
}

// Add Push module
Kinvey.Push = Push;

// Export
export default Kinvey;
