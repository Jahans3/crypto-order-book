# OrderBook Web Index

This project visualises order flow of XBT/USD and ETH/USD in real time.

### Getting Started

1. Install dependencies: `$ yarn`
2. Install eslint and use the local config: `.eslintrc.json`
3. Install prettier and use the local config: `.prettierrc.json`
4. Run the project locally: `$ yarn start`

### Core Tools

* [React](https://reactjs.org/)
* [Recoil](https://recoiljs.org/)
* [D3](https://d3js.org/)
* [Styled Components](https://styled-components.com/)
* [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Worker)

### App Overview

`order flow socket` `---->` [`order flow worker`](src/workers/orderFlowWorker/index.ts) `---->` [`order flow service`](src/services/orderFlowService/index.ts)

This app uses a [worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker) as a proxy to connect to the websocket API. 
This is done to offload some heavy array processing and fast incoming websocket messages away from the UI thread.

### Contributing

Before contributing please ensure you have ESLint and Prettier set up and pointing to the configs in the root of this project.

#### Git

Working branch: `develop`

Production branch: `master`

Branches should follow the below format:

`<type>/<brief-description>` E.g. `feat/add-new-coin-pair` or `fix/bar-chart-bug`

Commits should follow [Angular commit format](https://gist.github.com/brianclements/841ea7bffdb01346392c):

`<type>(<scope>): <subject>` E.g. `feat(Index): add new context provider` or `docs(readme): specify angular commit format`

#### Deploying

Deployments are handled via Netlify. A new build is deployed when updates are pushed to `master`.
