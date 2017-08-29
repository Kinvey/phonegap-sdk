import { CacheMiddleware as HTML5CacheMiddleware } from 'kinvey-html5-sdk/dist/middleware';
import { Storage } from './storage';

export class CacheMiddleware extends HTML5CacheMiddleware {
  loadStorage(name, key) {
    return new Storage(name, key);
  }
}
