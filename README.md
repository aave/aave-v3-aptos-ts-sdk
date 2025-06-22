# aave-v3-aptos-ts-sdk

[![Logo](./pics/logo.png)](https://aptos.aave.com/)

![Node CI](https://github.com/aave/aave-v3-aptos-ts-sdk/workflows/Node.js%20CI/badge.svg)
![check-code-coverage](https://img.shields.io/badge/coverage-96.33%25-green)

> **PREREQUISITES:**
>
> - NodeJS 20+
> - pnpm / yarn (see package.json)

Aave's typescript sdk for Aptos. Please note that it is currently under WIP!

## Installation

`aave-v3-aptos-ts-sdk` could be used as a library for frameworks or as a stand-alone bundled js file which can be easily loaded into the browser.

### Library (Node.js/React/Vue.js) usage

> npm install @aave/aave-v3-aptos-ts-sdk

### Browser usage

If you want to use `aave-v3-aptos-ts-sdk` in the browser directly, you can add the following script to your html file:

```ts
<script
    type="text/javascript"
    src="https://cdn.jsdelivr.net/npm/@aave/aave-v3-aptos-ts-sdk@x.x.x/bundle.js"
></script>
```

whereby the x.x.x is one of the available released versions.

In your code, once the script is fully loaded, just use `window.aptosSdk` to access all `aave-v3-aptos-ts-sdk` exports.

```ts
<script>console.log("Aave Aptos Sdk ", window.aptosSdk);</script>
```

## Documentation

- [`TypeDoc API`](https://aave.github.io/aave-v3-aptos-ts-sdk/) is available for all exported classes, interfaces and methods.

## Contributing

We welcome contributions from the community!

If you would like to contribute to `aave-v3-aptos-ts-sdk`, please read the [CONTRIBUTING file](CONTRIBUTING.md).

## License

`aave-v3-aptos-ts-sdk` is released under the [License](LICENSE).

## Powered By

`aave-v3-aptos-ts-sdk` is developed with love by Aave Labs
