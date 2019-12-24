# WebCompat to Bugzilla Extension
This extension is a handy tool for WebCompat.com contributors to cross post a webcompat.com issue to a bugzilla bug. You can visit https://addons.mozilla.org/en-US/firefox/addon/webcompat-to-bugzilla/ to download the addon. If it's useful for you, don't hestitate to rate the addon!

## How to use?
Install the extension, while visiting an issue which URL begins with https://webcompat.com/issues/, you can click on the button toolbar, select you want to 1) File a bug or 2) Add to see also with a bug ID or common bugs. Click submit will open a new tab on https://bugzilla.mozilla.org and you can continue your works.

## How to help developer?
You can checkout the code, install web-ext node module, then use web-ext run to test this extension. Use web-ext build to package this extension and upload to AMO.

### How it works?
There are 3 major parts: popup.html and popup.js handle the popup windows after clicking on tool bar icon; background.js handles the message from popup.js to follow up actions and some background tasks (enable/disable the icon, load common bugs from cloud); content_scripts adds functions when user go to webcompat related pages.

## TODO
* More handy features
