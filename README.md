# Kinvey PhoneGap SDK [![Build Status](https://travis-ci.org/Kinvey/phonegap-sdk.svg?branch=master)](https://travis-ci.org/Kinvey/phonegap-sdk) [![Code Climate](https://codeclimate.com/github/Kinvey/phonegap-sdk/badges/gpa.svg)](https://codeclimate.com/github/Kinvey/phonegap-sdk)

[Kinvey](http://www.kinvey.com) (pronounced Kin-vey, like convey) makes it ridiculously easy for developers to setup, use and operate a cloud backend for their mobile apps. They don't have to worry about connecting to various cloud services, setting up servers for their backend, or maintaining and scaling them.

## Installation

#### Using npm
Install and save the Kinvey PhoneGap SDK:

```javascript
npm install --save kinvey-phonegap-sdk
```

Import the Kinvey PhoneGap SDK (ES6/TypeScript):

```javascript
import Kinvey from 'kinvey-phonegap-sdk';
```

A [TypeScript](https://www.typescriptlang.org/) type definition file is included in the distribution and will automatically be picked up by the TypeScript compiler.

#### Using the Kinvey CDN

```html
<script src="https://download.kinvey.com/js/kinvey-phonegap-sdk-3.5.0.min.js"></script>
```

A [TypeScript](https://www.typescriptlang.org/) type definition file is available at

```html
https://download.kinvey.com/js/kinvey.d.ts
```

You will then be able to access Kinvey PhoneGap SDK via `window.Kinvey`.

## Browser Compatibility

The Kinvey PhoneGap SDK supports the following browsers and versions of PhoneGap/Cordova:

- On macOS: Safari, Chrome, Firefox
- On iOS: Safari, Chrome
- On Windows: Chrome, Firefox, Edge, Internet Explorer 11
- On Android: Chrome (Performance depends on device)
- On PhoneGap/Cordova: 5.x+

## Documentation

For more detailed documentation, see http://devcenter.kinvey.com/phonegap

## License
See [LICENSE](LICENSE) for details.

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for details on reporting bugs and making contributions.

