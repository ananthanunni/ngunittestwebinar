# Angular Unit Test Webinar TestGround App

This codebase contains both the back end API project and front end Angular project.

## Back End API Project

This is an ASP.NET Core 3.1 API application written in C#. This application provides two backend APIs required for our front end code. The project is located inside `AR.NgUnitTestWebinar` directory. I have excluded the assembly directory with `gitignore` which gets you access to the compiled binaries for the backend.

## Front End Angular Project

This is an Angular 10 application with two simple modules and minimum set of components and services, just to demonstrate writing unit tests for them.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

## Running Application

- Run back end API project
  - Navigate to the directory `AR.NgUnitTestWebinar\AR.NgUnitTestWebinar.Web.Api\bin\Debug\netcoreapp3.1`.
  - Double click `AR.NgUnitTestWebinar.Web.Api.exe`. This should start a console running the backend API at these endpoints
    - http://localhost:5000
    - https://localhost:5001
- Run front end Angular project
  - run `ng serve` from within the Angular project directory. Angular code will begin to compile and start running at `http://localhost:4200`. This app will communicate with the backend API we already started in previous step.
  - Browse to the URL and the app should display a login screen. Enter `ananthan` as the user ID and `password1` as password. Try with other credentials to see how incorrect login is handled.
  - TIP: Keep your browser network tab open and see the XHR traffic. Familialrize with the two API endpoints (`login` and `colors`) and the data being sent and received. Just enough code to write tests on.

## Running Angular Unit Tests

- `ng test` runs begins Angular unit tests to execute.
  - add `--prod = true` to use production build and run tests on it.
  - add `--code-coverage=true` to get a code coverage report in HTML. This will be created in Angular application root directory inside a new directory.

www.bleed6.com | Ananthan Unni
