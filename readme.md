# Address Book application
## An angular addressbook application which use localstorage as persistence layer

The following instructions assume you have already **node**, **npm** and **bower** installed globally. During development I've been using the following versions
```
node v5.4.1
npm 3.3.12
bower 1.7.7
```

### Installation:
Install first npm and bower modules:
```
sudo npm install
bower install
```

### Run in dev mode:
Use the following command:
```
gulp
```
This will run the **gulp** default task which will bundle the unminified application into app.js file and will run a webserver on port ```8888```
The server is using **connect-history-api-fallback** to handle the requests coming from the browser which uses html5 mode.
In order to open the application open the following address: ```http://localhost:8888```.

### Run in prod mode:
Use the following command:
```
gulp build
```
The build process is similar to the dev one with js/css minification step.
It deploys the appication to the dist folder and it runs a web server pointing to it on port ```9999```
In order to open the application open the following address: ```http://localhost:9999```.

## Some notes
### Local storage and promises
The application uses browser local storage as persistence layer; this mechanism is synchronous and wouldn't require the use of promises.
I decided to implement promises into the **localStorageAdapter** in order to have the codebase ready for a possible future implementation of async storage layers (e.g. REST apis).

### Syling/Angular Material Design
Since CSS/styling is not my strong point, I decided to use Angular Material Design which provides consistend styling for all the most common used components (forms/containers).
This has been my first experience with Angular Material Design, probably the code/layout could be improved. 
I also had to mix some layout logic (open/close navbar) in the controllers, that's not clean and probably needs to be moved to a dedicated service.

### Testing
I didn't have enough time to implement any test strategy. If I had time I would have used **karma** and **jasmine** for unit testing and **protractor** as E2E test framework