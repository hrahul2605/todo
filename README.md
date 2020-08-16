![logo](./src/assets/icons/app-icon.png)

<p><a href="https://www.producthunt.com/posts/todo-5?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-todo-5" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=229260&theme=dark" alt="Todo - "A simple all-in-one todo list app for tasks and projects." | Product Hunt Embed" style="width: 250px; height: 54px;" width="250px" height="54px" /></a></p>

##### No more jumping around between apps like Google Keep for tasks, Trello for projects, Calenders for weekly planning. Todo does it all - Faster, Easier, Simpler

### Description

A simple all-in-one todo list app for tasks and projects.  
This application is developed using **_react-native_** with help of **_EXPO SDK_**.  
This is a personal project and the app is listed on Google Play Store at https://play.google.com/store/apps/details?id=com.todo.shortcut  
This app currenlty uses local storage of the device to store all the data.  
**NOTE:** This project is currently made for only **_android devices_**  

### Get Started

To get started with this project,

- git clone this project into your local drive by `git clone https://github.com/hrahul2605/todo.git`
- install all the npm packages and dependencies by `npm install` or `yarn install`.
- Make sure you have android-sdk and its tool properly setup in your PC or laptop or simply install android studio. Next,  
   ( I ) Connect your android device to your laptop or PC **OR**
  use an android emulator and then and run `adb devices` to confirm that your device is properly connected & ready.  
  ( II ) Now simply run `yarn start` or `npm start` in one terminal.  
  ( III ) and `yarn run android` in another to launch the application on the device.
- You can also skip the last step, and use expo to launch the app in development mode. By,  
    ( I ) Run `expo start` in the terminal. A QR Code will appear.  
    ( II ) Download the expo client from Google Play Store in your android device, and scan the QR Code.
- Make sure to give `INTERNET` & `SYSTEM_ALERT_WINDOW` permission in `AndroidManifest.xml` file to enable debugging.  
-  Happy hacking !!!

**Tech Stack**

    * React Native with Expo SDK.
    * Redux

**Features**

    * Add new Task.
    * Add reminder to your tasks.
    * Add new Category/Group to categorise all your tasks.
    * Edit all your tasks.
    * Edit Categories into different colors.
    * Edit your task to have a category/group or not.
    * Delete Tasks or Category/Group.
    * Check progress of your Category/Group.
    * Mark your completed tasks.

**Use-Cases**

    * Can be used for daily purposes.
    * Can be used to manage your complex project's containing multiple tasks.

**Upcoming Features**

    * Calender
    * Share your categories/groups to other users.
    * Use of online database replacing local storage.
    * Web & iOS Support

**Credits**

- Designed by [**_Anshudweep Show_**](https://www.behance.net/anshudweepshow/)
- Take a look at the design [here](https://www.behance.net/gallery/101935957/todo-The-best-way-to-get-your-task-done) .
- Also view the website for our app developed by **_Anshudweep Show_** at https://anshudweep.github.io/todo/
- _this project uses [react-native-modern-datepicker](https://github.com/HosseinShabani/react-native-modern-datepicker) in *src/components/DatePicker* for more customisation of the calender_
