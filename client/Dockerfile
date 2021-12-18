FROM node:14.14.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install

ARG REACT_APP_AUTH=REACT_APP_AUTH
ENV REACT_APP_AUTH=http://localhost:4000
ARG REACT_APP_URL=REACT_APP_URL
ENV REACT_APP_URL=http://localhost/graphql

COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html