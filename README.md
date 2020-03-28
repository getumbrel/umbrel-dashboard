# Umbrel Dashboard UI
![live.getumbrel.com](https://github.com/getumbrel/umbrel-dashboard/workflows/live.getumbrel.com/badge.svg?branch=master)

## Install Dependencies
```
yarn install
```

## Run locally
1. Run
```
yarn serve
```
2. Open http://localhost:8080/ 

## Deploy to a local Umbrel node
1. Run 
```
yarn deploy-local
```
2. Enter SSH password of `umbrel` user
3. Open http://umbrel.local/

## Compile and minify for production
```
yarn build
```

## Lint and fix files
```
yarn lint
```