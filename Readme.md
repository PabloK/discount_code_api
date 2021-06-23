## Installation

To install the application locally run the following terminal commands from the root folder.

```bash
git clone https://github.com/PabloK/discount_code_api.git
npm install -g @vercel/ncc
npm install
```

### Creating a development database

Development requires a cosmos db database which requires an azure account. Go [here](https://azure.microsoft.com/en-gb/free/) to create a free account.
If running the function app in vscode with the azure function extension and the azure resource manager extension the resources can be created automatically.

## Build

To build the application locally run the following terminal command from the root folder, after installing.

```bash
npm run build
```

## Run

To run the application locally run the following terminal command from the root folder, after installing.

```bash
npm run start
```

## Test

To run tests unit tests run the following terminal command from the root folder, after installing.

```bash
npm -s run test:unit
```