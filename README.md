# hygie-config-generator

## Motivations

This SPA allows you to generate the `.rulesrc` config file for your [Hygie API](https://github.com/DX-DeveloperExperience/hygie) with a friendly user-interface.

This application will source every Rules and Runnables you've created in your Git-Webhooks project, and display all of them in the UI.

## Use our online generator

You can directly use our generator [here at https://dx-developerexperience.github.io/hygie-config-generator/](https://dx-developerexperience.github.io/hygie-config-generator/).

Or you can clone this project and customize it.

## Project setup

### Install it

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Run your Hygie API

This application needs to know all your Rules and Runnables. To get all this data, it calls the Hygie API. Therefore, you need to start it (development or production).

If the project is not running in `localhost:3000`, please update the `.env` file accordingly:

```
VUE_APP_HYGIE_API=http(s)://your_hygie_api_server:your_port
```
