# Contributing to aave-v3-aptos-ts-sdk

Thank you for considering contributing to aave-v3-aptos-ts-sdk!

## Reporting Bugs

If you discover a bug, please create a [new issue](https://github.com/aave/aave-v3-aptos-ts-sdk/issues/new?assignees=&labels=issue) on our GitHub repository.

In your issue, please include a clear and concise description of the bug, any relevant code snippets, error messages, and steps to reproduce the issue.

## Installation

To start developing with `aave-v3-aptos-ts-sdk`, you must install all the necessary dev dependencies. You can do so by running the following command:

```sh
npm install
```

This will install all the required packages listed in the package.json file, allowing you to update, fix, or improve `aave-v3-aptos-ts-sdk` in any way you see fit.

## Contributing Code

We welcome contributions in the form of bug fixes, enhancements, and new features.

To contribute code, please follow these steps:

1. Fork the `aave-v3-aptos-ts-sdk` repository to your own account.
2. Create a new branch from the `main` branch for your changes.
3. Make your changes and commit them to your branch.
4. Push your branch to your fork.
5. Create a pull request from your branch to the develop branch of the `aave-v3-aptos-ts-sdk` repository.

> **NOTE:** When creating a pull request, please include a clear and concise title and description of your changes, as well as any relevant context or background information.

## Code Style

Please ensure that your code follows the existing code style used in the project.

You can run the following command to format your code before committing:

```sh
npm run fmt
```

## Tests

Please ensure that your changes include any necessary tests.

We use [jest library](https://jestjs.io/fr/) for unit testing.
  
You can run the following command to run the tests:

```sh
npm run build
```

and then

```sh
npm run test
```

## License

By contributing to `aave-v3-aptos-ts-sdk`, you agree that your contributions will be licensed under this License.

## Documentation

`aave-v3-aptos-ts-sdk` provides complete documentation of all available functions and objects.

To generate the documentation for a specific branch, run the following command:

```sh
npm run doc
```

The documentation will be generated inside each of the packages in the `./docs/documentation/html` directory.
