import { PhoneGapDevice } from '../src/device';
import packageJSON from '../package.json';
import jsdom from 'mocha-jsdom';
import chai from 'chai';
const expect = chai.expect;

describe('Device', function () {
  describe('isPhoneGap()', function() {
    jsdom({
      url: 'file://test/src/index.html'
    });

    it('should return true if the document.URL property does not contain http:// or https://', function() {
      expect(PhoneGapDevice.isPhoneGap()).to.be.true;
    });
  });

  describe('toJSON()', function() {
    jsdom({
      url: 'http://test/src/index.html'
    });

    it('should return an object with platform information', function() {
      const json = PhoneGapDevice.toJSON();
      const platform = json.platform;
      expect(platform).to.deep.equal({ name: 'phonegap' });
    });

    it('should return an object with kinveySDK information', function() {
      const json = PhoneGapDevice.toJSON();
      const kinveySDK = json.kinveySDK;
      expect(kinveySDK).to.deep.equal({
        name: packageJSON.name,
        version: packageJSON.version
      });
    });
  });

  describe('toJSON() on a real device', function() {
    jsdom({
      url: 'file://test/src/index.html'
    });

    before(function() {
      global.device = {
        model: 'iPad2,5',
        cordova: '6.0.0',
        platform: 'iOS',
        version: '9.3.2'
      };
    });

    after(function() {
      delete global.device;
    });

    it('should return an object with device information', function() {
      const json = PhoneGapDevice.toJSON();
      const device = json.device;
      expect(device).to.deep.equal({ model: global.device.model });
    });

    it('should return an object with platform information', function() {
      const json = PhoneGapDevice.toJSON();
      const platform = json.platform;
      expect(platform).to.deep.equal({
        name: 'phonegap',
        version: global.device.cordova
      });
    });

    it('should return an object with os information', function() {
      const json = PhoneGapDevice.toJSON();
      const os = json.os;
      expect(os).to.deep.equal({
        name: global.device.platform,
        version: global.device.version
      });
    });
  });

  describe('toJSON() in a web browser', function() {
    jsdom({
      url: 'http://test/src/index.html'
    });

    it('should return an object with device information', function() {
      const json = PhoneGapDevice.toJSON();
      const device = json.device;
      expect(device).to.deep.equal({ model: global.navigator.userAgent });
    });

    it('should return an object with os information', function() {
      const userAgent = global.navigator.userAgent.toLowerCase();
      const rChrome = /(chrome)\/([\w]+)/;
      const rFirefox = /(firefox)\/([\w.]+)/;
      const rIE = /(msie) ([\w.]+)/i;
      const rOpera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
      const rSafari = /(safari)\/([\w.]+)/;
      const rAppleWebkit = /(applewebkit)\/([\w.]+)/;
      const browser = rChrome.exec(userAgent) ||
                      rFirefox.exec(userAgent) ||
                      rIE.exec(userAgent) ||
                      rOpera.exec(userAgent) ||
                      rSafari.exec(userAgent) ||
                      rAppleWebkit.exec(userAgent) ||
                      [];
      const json = PhoneGapDevice.toJSON();
      const os = json.os;
      expect(os).to.deep.equal({
        name: browser[1],
        version: browser[2]
      });
    });
  });
});
