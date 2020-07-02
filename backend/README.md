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

To export the database run the next command

```bash
$ prisma export
```
This creates a new file called export-__TIMESTAMP__.zip where __TIMESTAMP__ represents the exact time of the export.
Example: export-2020-06-25T04:36:43.314Z.zip

To import the database to a new service run the next command

```bash
$ prisma import --data export-__TIMESTAMP__.zip
```

To build the project run the next command

```bash
$ npm run build
```

Heroku post build
```bash
$ npm run heroku-postbuild
```
