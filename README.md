# WfgTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## Load Environment variables

You need to set some environment variables related with the server authentication to run the project. This variables are located in src/app/environments/environment.ts

You have to change this part of the environment object

```TypeScript
{
  ...
  username: 'Your username here',
  userAndPassword: 'Your base64 user and password here'
  ...
}
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
