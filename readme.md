----------------------------------------------------------------------
##  ExersEyes Mobile App - ReadMe 
----------------------------------------------------------------------

‘Development Of A Mobile Application To Provide Assistance With Exercise To A Visually-Impaired User’

Author: Inzamamul Haque
ec12326@qmul.ac.uk || inz.haque@me.com
Student Number 120167085
BSc (Hons) Computer Science with Industrial Experience
April 2016

School of Electronic Engineering and Computer Science
Queen Mary, University of London
London, E1 4NS
The United Kingdom

Undergraduate Final Year Project
Supervisor: Dr. Tony Stockman

----------------------------------------------------------------------
## General Overview
----------------------------------------------------------------------

This project is part of the final year project that is to be undertaken by BSc (Hons) Computer Science students during the final year of their degree. This project makes up 15% of the degree classification.

This is a mobile application developed using the Ionic framework that aims to provide assistance to visually impaired users to navigate predefined routes. The usage of haptic as well as audio feedback is implemented to try accomplish these aims. Usage of the Google Maps JavaScript API has been used to also implement wayfinding metholodologies that aim to achieve these goals. 

For the accompanying project report and documentation for this report, please contact Inzamamul via ec12326@qmul.ac.uk or via inz.haque@me.com


----------------------------------------------------------------------
## Installation
----------------------------------------------------------------------
To install the application please follow the following steps;

1. Install node.js (available via https://nodejs.org/en/download/)

2. Install the Ionic and Cordova command line interface (CLI) 

$ npm install -g cordova ionic

3. Install the iOS and/or Android SDKs (this step can be skipped if you plan to only run it in localhost): 

3a.
For iOS devices download the latest version of Xcode (via https://itunes.apple.com/us/app/xcode/id497799835?mt=12) (N.B. Will only work on machines running Mac OS X). Install deploy tools: 

$ npm install -g ios-sim
$ npm install -g ios-deploy

3b.
For Android devices download the latest version of Android Studio (via http://developer.android.com/sdk/installing/index.html?pkg=studio). Proceed to include the SDK's tools and platform-tools directory in your PATH. On machines running Mac OS X, this can be done by modifying ~/.profile and inserting the below; 

export PATH=${PATH}:/Development/android-sdk/platform-tools:/Development/android-sdk/tools

4. Download the Exers-Eyes repo from GitHub:

$ git clone https://github.com/inzamamul/exers-eyes.git

5. Change into the exers-eyes directory

$ cd exers-eyes

6. Add platforms to project and build project (skip if you only want to run in localhost)

$ ionic platform add ios && ionic build ios
$ ionic build ios && ionic build android

7. Run project in localhost

$ ionic serve 

7a. Or alternatively, emulate on iOS / Android emulator. (N.B. replace "ios" with "android" based on whether to emulate on iOS or Android systems)

$ ionic emulate ios 

7b. Or alternatively, run on a connected iOS device (N.B. replace "ios" with "android" based on whether to run on iOS or Android systems)

$ ionic run ios --device

----------------------------------------------------------------------
## Usage 
----------------------------------------------------------------------

1. Open app and signup as a new user


2. Enter personal details such as name and age on the settings page. The user weight is needed to compute the calorie burn that is induced from completed exercises. Tap "Save Details" when completed.

3. Navigate to "Dashboard" using tabs. Tap "Lets Begin!" to begin setting up an activity.

4. Select a route near you from the list of available routes. 

5. If not near the start location of the route, relocate yourself near the start location of the route. 

6. Once near the start of the route, the timer will begin counting as well as the dynamic directions service that will update based on your location along the route. 

The device will now provide you with haptic and audio feedback depending on if you leave the route in the form of a single vibration and voice notification if you leave the inner bounds of the route, and a double vibration and voice notification if you leave the outer bounds of the route. 

Once you have completed the route, or have decided to end your exercise early, tap on the "Finish Activity" button. 

7. You are no presented with an overview of the completed activity. You are presented with the option of sharing the route details via native applications stored on your device (such as Facebook, Twitter or WhatsApp), or to complete the activity and then be able to view this activity added to the list of your already completed activities. 

8. You are now presented with a list of all your completed activities using ExersEyes. If you wish you may add extra activities using the "Add New Activity" form, underneath the list. 

9. To logout, proceed to the "Settings" page by using the tabs controller, and tap the "Log Out" button where you will be redirected back to the "Login" page. 
