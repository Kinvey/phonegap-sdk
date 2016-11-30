import CoreCacheRequest from 'kinvey-node-sdk/dist/request/src/local';
import Device from '../../device';
import { Client } from 'kinvey-node-sdk/dist/client';
import { isDefined } from 'kinvey-node-sdk/dist/utils';
import Promise from 'es6-promise';
const activeUsers = {};

export default class CacheRequest extends CoreCacheRequest {
  static loadActiveUser(client = Client.sharedInstance()) {
    return Device.ready()
      .then(() => {
        if (isDefined(global.KinveySecureStorage)) {
          const ss = new global.KinveySecureStorage(client.appKey, `${client.appKey}.shared`);

          return new Promise((resolve, reject) => {
            ss.get(resolve, reject, 'activeUser');
          });
        }

        return super.loadActiveUser(client);
      });
  }

  static setActiveUser(client = Client.sharedInstance(), user) {
    return Device.ready()
      .then(() => {
        if (isDefined(global.KinveySecureStorage)) {
          const ss = new global.KinveySecureStorage();

          return Promise.resolve()
            .then(() => {
              return new Promise((resolve, reject) => {
                const activeUser = CacheRequest.getActiveUser(client);

                if (isDefined(activeUser)) {
                  // Delete from memory
                  activeUsers[client.appKey] = null;

                  // Delete from secure storage
                  return ss.remove(resolve, reject, 'activeUser'); // kinveyAuth
                }

                return resolve();
              });
            })
            .then(() => {
              return new Promise((resolve, reject) => {
                if (isDefined(user)) {
                  // Save to memory
                  activeUsers[client.appKey] = user;

                  // Save to secure storage
                  return ss.set(resolve, reject, 'activeUser', user);
                }

                return resolve();
              });
            })
            .then(() => user);
        }

        return super.setActiveUser(client, user);
      });
  }
}
