# political-emails

📧 Read emails from politicians without subscribing

## Local development

First, [install Node Version Manager](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating). Then, switch to the proper Node & NPM version,

```sh
$ nvm install
$ nvm use
```

Install dependencies,

```sh
$ npm ci
```

Install the [Cloudflare Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/),

```sh
$ npm install wrangler -g
```

Initialize the database,

```sh
$ wrangler d1 execute political-emails-dev --local --file=./schema.sql
```

Run the worker locally,

```sh
$ npm start
```
