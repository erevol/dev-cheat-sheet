# Dev Cheat Sheet BackEnd

### Install Locally

To get the app running locally clone the repository

```bash
$ git clone https://github.com/erevol/dev-cheat-sheet
```

Move into backend folder and install the dependencies

```bash
$ cd dev-cheat-sheet
$ cd backend
$ npm install
```

You can run de the app by using the following command in your command-line
```bash
$ npm run dev
```

Prisma playground will be opened at `http://localhost:4444`

To seed the database run the next command

```bash
$ prisma seed
```

To build the project run the next command

```bash
$ npm run build
```

Heroku post build
```bash
$ npm run heroku-postbuild
```
