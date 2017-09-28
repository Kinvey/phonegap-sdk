import { Storage as HTML5Storage } from 'kinvey-html5-sdk/dist/middleware/src/storage';
import { WebSQLAdapter } from './websql';
import Device from '../../device';

export class Storage extends HTML5Storage {
  constructor(name, key) {
    super(name);
    this.key = key;
  }

  loadAdapter() {
    return Device.ready()
      .then(() => {
        return WebSQLAdapter.load(this.name, this.key);
      })
      .then((adapter) => {
        if (!adapter) {
          return super.loadAdapter();
        }

        return adapter;
      });
  }
}
