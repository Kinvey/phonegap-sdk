import { Client as NodeClient } from 'kinvey-node-sdk/dist/client';
import Device from './device';
import { isDefined } from 'kinvey-node-sdk/dist/utils';
import Promise from 'es6-promise';
const KEYCHAIN_KEY = '__userID__';

export default class Client extends NodeClient {
  loadActiveUser() {
    return Device.ready()
      .then(() => {
        if (isDefined(global.SecureStorage)) {
          return new Promise((resolve, reject) => {
            const ss = new global.SecureStorage(() => {
              ss.get((userString) => {
                try {
                  resolve(JSON.parse(userString));
                } catch (error) {
                  reject(error);
                }
              }, () => resolve(null), KEYCHAIN_KEY);
            }, (error) => {
              reject(error);
            }, this.keychainAccessGroup, this.keychainAccessGroup);
          });
        }

        return super.loadActiveUser();
      });
  }

  setActiveUser(user) {
    return Device.ready()
      .then(() => {
        if (isDefined(global.SecureStorage)) {
          return new Promise((resolve, reject) => {
            const ss = new global.SecureStorage(() => {
              return new Promise((innerResolve, innerReject) => {
                if (isDefined(this.activeUser)) {
                  // Delete from memory
                  this._activeUser = null;

                  // Delete from secure storage
                  return ss.remove(innerResolve, innerReject, KEYCHAIN_KEY);
                }

                return innerResolve();
              })
                .then(() => {
                  return new Promise((innerResolve, innerReject) => {
                    if (isDefined(user)) {
                      // Save to memory
                      this._activeUser = user;

                      // Save to secure storage
                      return ss.set(innerResolve, innerReject, KEYCHAIN_KEY, JSON.stringify(user));
                    }

                    return innerResolve();
                  });
                })
                .then(() => resolve(user))
                .catch(reject);
            }, (error) => {
              reject(error);
            }, this.keychainAccessGroup, this.keychainAccessGroup);
          });
        }

        return super.setActiveUser(user);
      });
  }
}
