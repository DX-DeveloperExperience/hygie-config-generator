# git-webhooks-config-generator

## Motivations

This SPA allows you to generate the `rules.yml` config file for your [Git-Webhooks API](https://github.com/DX-DeveloperExperience/git-webhooks) with a friendly user-interface.

This application will source every Rules and Runnables you've created in your Git-Webhooks project, and display all of them in the UI.

## Use our online generator

You can directly use our generator [here at https://dx-developerexperience.github.io/git-webhooks-config-generator/](https://dx-developerexperience.github.io/git-webhooks-config-generator/).

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

### Run your Git-Webhooks API

This application needs to know all your Rules and Runnables. To get all this data, it calls the Git-Webhooks API. Therefore, you need to start it (development or production).

If the project is not running in `localhost:3000`, please update the `.env` file accordingly:

```
VUE_APP_GIT_WEBHOOKS_API=http(s)://your_git_webhooks_api_server:your_port
```
