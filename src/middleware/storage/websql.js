import { Promise } from 'es6-promise';
import { WebSQLAdapter as HTML5WebSQLAdapter } from 'kinvey-html5-sdk/dist/middleware/src/storage/websql';
import isFunction from 'lodash/isFunction';

export class WebSQLAdapter extends HTML5WebSQLAdapter {
  constructor(name = 'kinvey', key) {
    super(name);
    this.key = key;
  }

  openTransaction(collection, query, parameters, write = false) {
    return new Promise((resolve, reject) => {
      try {
        const db = global.sqlitePlugin.openDatabase({ name: this.name, key: this.key });
        super.openTransaction(collection, query, parameters, write, db)
          .then((response) => {
            if (db && isFunction(db.close)) {
              db.close(() => resolve(response), reject);
            }
          })
          .catch(reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  static load(name, key) {
    return new Promise((resolve, reject) => {
      window.sqlitePlugin.selfTest(() => resolve(new WebSQLAdapter(name, key)), reject);
    });
  }
}
