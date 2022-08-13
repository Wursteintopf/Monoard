FROM node:14
WORKDIR /monoard_api
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn config set network-timeout 600000 -g
RUN yarn install
COPY ./ .
EXPOSE 3001
CMD sh ./run.sh