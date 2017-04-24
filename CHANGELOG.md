# Changelog
## [3.5.0](https://github.com/Kinvey/phonegap-sdk/tree/v3.5.0) (2017-04-24)
[Full Changelog](https://github.com/Kinvey/phonegap-sdk/compare/v3.4.5...v3.5.0)<br/>

### Added
_None_

### Removed
_None_

### Changed
- Registered `Popup` class using new `usePopupClass()` static function on `User` class. Removed config in `webpack.config` used to replace the `Popup` class when a bundle is generated. This makes it easier for other people to utilize the SDK with their own `Webpack` and `Browserify` bundles.
- Update [kinvey-js-sdk](https://www.npmjs.com/package/kinvey-js-sdk) dependency to [v3.5.0](https://github.com/Kinvey/js-sdk/tree/v3.5.0).
- Update [kinvey-html5-sdk](https://www.npmjs.com/package/kinvey-html5-sdk) dependency to [v3.5.0](https://github.com/Kinvey/html5-sdk/tree/v3.5.0).

### Merged Pull Requests
_None_

### Closed Issues
_None_

## [v3.4.5](https://github.com/Kinvey/phonegap-sdk/tree/v3.4.4) (2017-04-13)
[Full Changelog](https://github.com/Kinvey/phonegap-sdk/compare/v3.4.4...v3.4.5)<br/>

**Changes**
- Update package dependencies.

## [v3.4.4](https://github.com/Kinvey/phonegap-sdk/tree/v3.4.4) (2017-03-27)
[Full Changelog](https://github.com/Kinvey/phonegap-sdk/compare/v3.4.2...v3.4.4)<br/>

**Changes**
- Update package dependencies.

## [v3.4.2](https://github.com/Kinvey/phonegap-sdk/tree/v3.4.2) (2017-03-16)
[Full Changelog](https://github.com/Kinvey/phonegap-sdk/compare/v3.4.1...v3.4.2)<br/>

**Changes**
- Update package dependencies.

## [v3.4.1](https://github.com/Kinvey/phonegap-sdk/tree/v3.4.1) (2017-02-24)
[Full Changelog](https://github.com/Kinvey/phonegap-sdk/compare/v3.4.0...v3.4.1)<br/>

**Changes**
- Replace package `kinvey-node-sdk` with `kinvey-js-sdk`.

## [v3.4.0](https://github.com/Kinvey/phonegap-sdk/tree/v3.4.0) (2017-02-09)
[Full Changelog](https://github.com/Kinvey/phonegap-sdk/compare/v3.3.5...v3.4.0)<br/>

**Changes**
- Used rack API to replace `CacheMiddleware` and `HttpMiddleware`. [#10](https://github.com/Kinvey/phonegap-sdk/pull/10)

**Updated Dependencies:**
- Updated `kinvey-html5-sdk` to `v3.4.0`.
- Updated `kinvey-node-sdk` to `v3.4.0`.

## [v3.3.5](https://github.com/Kinvey/phonegap-sdk/tree/v3.3.5) (2017-01-25)
[Full Changelog](https://github.com/Kinvey/phonegap-sdk/compare/v3.3.4...v3.3.5)<br/>

**Changes:**
- Fix a bug that causes a `TypeError` when unregistering a device for push notifications. Add push notification unit tests. [#6](https://github.com/Kinvey/phonegap-sdk/pull/6)

**Updated Dependencies:**
- Updated `kinvey-html5-sdk` to `v3.3.5`.
- Updated `kinvey-node-sdk` to `v3.3.5`.

## [3.3.4](https://github.com/Kinvey/phonegap-sdk/tree/v3.3.4) (2017-01-12)
[Full Changelog](https://github.com/Kinvey/phonegap-sdk/compare/v3.3.3...v3.3.4)<br/>

**Updated Dependencies:**
- Updated `kinvey-html5-sdk` to `v3.3.4`.
- Updated `kinvey-node-sdk` to `v3.3.4`.

## [3.3.3](https://github.com/Kinvey/phonegap-sdk/tree/v3.3.3) (2016-12-16)
[Full Changelog](https://github.com/Kinvey/phonegap-sdk/compare/v3.3.2...v3.3.3)<br/>

**Updated Dependencies:**
- Updated `kinvey-html5-sdk` to `v3.3.3`.
- Updated `kinvey-node-sdk` to `v3.3.3`.

## [v3.3.2](https://github.com/Kinvey/phonegap-sdk/tree/v3.3.2) (2016-12-03)

**Updated Dependencies:**
- Update `kinvey-html5-sdk` to `v3.3.2`.
- Update `kinvey-node-sdk` to `v3.3.2`.

## [v3.3.1](https://github.com/Kinvey/phonegap-sdk/tree/v3.3.1) (2016-12-02)

**Updated Dependencies:**
- Update `kinvey-html5-sdk` to `v3.3.1`.
- Update `kinvey-node-sdk` to `v3.3.1`.

## [v3.3.0](https://github.com/Kinvey/phonegap-sdk/tree/v3.3.0) (2016-11-22)

**Updated Dependencies:**
- Update `kinvey-html5-sdk` to `v3.3.0`.
- Update `kinvey-node-sdk` to `v3.3.0`.

## [v3.2.3](https://github.com/Kinvey/phonegap-sdk/tree/v3.2.3) (2016-10-08)

**Enhancements:**

- Make `Kinvey.Push` module a singleton.

**Bug Fixes:**

- Fix bug that prevented registering for push notifications.
- Unregister from `phonegap-plugin-push` properly.

## [v3.2.1](https://github.com/Kinvey/phonegap-sdk/tree/v3.2.1) (2016-10-08)

**Bug Fixes:**

- Fixed typo for importing `CacheRequest` in `Push` module.

## [v3.2.1](https://github.com/Kinvey/phonegap-sdk/tree/v3.2.1) (2016-10-08)

**Bug Fixes:**

- Fixed bug that prevented device registration for push notifications.

## [v3.2.0](https://github.com/Kinvey/phonegap-sdk/tree/v3.2.0) (2016-09-23)
[Full Changelog](https://github.com/Kinvey/phonegap-sdk/compare/3.1.1...3.2.0)<br/>
[SDK Core Changelog](https://github.com/Kinvey/javascript-sdk-core/blob/master/CHANGELOG.md)

**Implemented enhancements:**

- Removed `Popup`, `Device`, and rack implementations.

## [v3.1.1](https://github.com/Kinvey/phonegap-sdk/tree/v3.1.1) (2016-09-22)
[Full Changelog](https://github.com/Kinvey/phonegap-sdk/compare/3.1.0...3.1.1)<br/>
[SDK Core Changelog](https://github.com/Kinvey/javascript-sdk-core/blob/master/CHANGELOG.md)

**Implemented enhancements:**

- Added files to integrate [TravisCI](https://travis-ci.org/Kinvey/phonegap-sdk), [CodeClimate](https://codeclimate.com/github/Kinvey/phonegap-sdk), and [CodeCov](https://codecov.io/gh/Kinvey/phonegap-sdk).
