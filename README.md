# Kinvey PhoneGap SDK
[Kinvey](http://www.kinvey.com) (pronounced Kin-vey, like convey) makes it ridiculously easy for developers to setup, use and operate a cloud backend for their mobile apps. They don't have to worry about connecting to various cloud services, setting up servers for their backend, or maintaining and scaling them.

This node and bower module makes it very easy to connect your Cordova/Phonegap app with Kinvey.

## How to use

### 1. Sign up for Kinvey
To use the sdk, sign up for Kinvey if you have not already done so. Go to the [sign up](https://console.kinvey.com/#signup) page, and follow the steps provided.

### 2. Install the SDK
You can install the module using npm:

```bash
npm install kinvey-phonegap-sdk --save
```

or

```bash
bower install kinvey-phonegap-sdk --save
```

### 3. Configure the SDK
Now, the sdk is available for use in your project.

If you installed the sdk with npm, import the sdk in your code using `require`.

```javascript
var Kinvey = require('kinvey-phonegap-sdk');
```

If you installed the sdk with bower, add a script tag to your main html file.

```html
<script src="bower_components/kinvey-phonegap-sdk/dist/kinvey-phonegap-sdk.min.js"></script>
```

Next, use `Kinvey.init` to configure your app:

```javascript
Kinvey.init({
  appKey: '<appKey>',
  appSecret: '<appSecret>'
});
```

### 4. Verify Set Up
You can use the following snippet to verify the app credentials were entered correctly. This function will contact the backend and verify that the sdk can communicate with your app.

```javascript
Kinvey.ping().then(function(response) {
  console.log('Kinvey Ping Success. Kinvey Service is alive, version: ' + response.version + ', response: ' + response.kinvey);
}).catch(function(error) {
  console.log('Kinvey Ping Failed. Response: ' + error.description);
});
```

## What’s next?
You are now ready to start building your awesome apps! Next we recommend diving into the [User guide](http://devcenter.kinvey.com/phonegap-v3.0/guides/users) or [Data store guide](http://devcenter.kinvey.com/phonegap-v3.0/guides/datastore) to learn more about our service, or explore the [sample apps](http://devcenter.kinvey.com/phonegap-v3.0/samples) to go straight to working projects.

## Building
The simplest way to build the sdk is by running `npm run bundle`. More advanced tasks are available.

_Note: Before running any tasks you will need to run `npm install` to install any dependencies required._

* `npm run clean`: remove files created by the build process
* `npm run lint`: lint the src files
* `npm run build`: build the sdk
* `npm run bundle`: bundle the sdk for dist

### Flags
The following flags are available when running `gulp bump`:

* `--type <major|minor|patch|prerelease>`: Bumps the package version using the [Semantic Version 2.0.0](http://semver.org/) spec. Defaults to `patch`.
* `--version <version>`: Sets the package version to the provided version.

## Testing
The Kinvey-PhoneGap-SDK is setup to run unit and end to end tests.

_Note: Before running any tests you will need to run `npm install` to install any dependencies required._

### Unit Tests
The steps for running the unit tests is as follows:

1. Open a terminal window and execute `npm test`.

### End to End Tests
The steps for runnin the end to end tests is as follows:

1. Open a terminal window and install the [Appium](https://www.npmjs.com/package/appium) and [Cordova](https://www.npmjs.com/package/cordova) packages globally by executing `npm install -g cordova appium`. Skip this step if you have already installed `Appium` and `Cordova`.
2. Change directory to the location of the project and bundle the project by executing `npm run bundle`.
3. Change directory to `./test/e2e/app' and execute `cordova prepare`.

#### To run End to End Tests for iOS
Make sure you have the latest version of XCode installed and the iPhone 6 Simulator. Please visit [Apple Developer Downloads](https://developer.apple.com/download/) to download the latest version of XCode if you haven't already.

1. Open a terminal window and execute `appium`.
2. Open another terminal window and change directory to the location of the project.
3. Change directory to `./test/e2e/app' and execute `cordova build ios`.
4. Execute `npm run test:e2e`.

#### To run End to End Tests for Android
_Coming soon..._
