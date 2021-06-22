## Installation

To install the application locally run the following terminal commands from the root folder.

```bash
git clone https://github.com/PabloK/discount_code_api.git
npm i -g @vercel/ncc
npm install
```

### Creating a development database

Development requires a cosmos db database which requires an azure account. Go [here](https://azure.microsoft.com/en-gb/free/) to create a free account.

## Build

To build the application locally run the following terminal command from the root folder, after installing.

```bash
npm run compile
```

## Run

To run the application locally run the following terminal command from the root folder, after installing.

```bash
npm run start
```

## Test

To run tests unittests run the following terminal command from the root folder, after installing.

```bash
npm -s run test:unit
```
