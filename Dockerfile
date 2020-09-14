FROM node:12-buster-slim AS umbrel-dashboard-builder

ARG STAGING_DEPLOYMENT=false

# make the 'app' folder the current working directory
WORKDIR /app

# copy 'package.json'
COPY package.json ./

# copy 'yarn.lock'
COPY yarn.lock ./

# install dependencies
RUN yarn

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production
RUN yarn build

# copy index.html to 404.html as http-server serves 404.html on all non "/" routes
RUN cp ./dist/index.html ./dist/404.html

FROM node:12-buster-slim AS umbrel-dashboard

RUN yarn global add http-server

COPY --from=umbrel-dashboard-builder /app/dist/ /dist

EXPOSE 3004
CMD [ "http-server", "-p 3004", "/dist" ]
