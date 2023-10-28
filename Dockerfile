# Build step #1: build the React front end
FROM node:alpine as build-step
WORKDIR /variable_stars
ENV PATH /variable_stars/node_modules/.bin:$PATH
COPY . ./
COPY package.json package-lock.json ./
RUN npm install
RUN npm run build

# Build step #2: build an nginx container
FROM nginx:stable-alpine
COPY --from=build-step /variable_stars/build /usr/share/nginx/html
COPY backend/nginx/nginx.conf /etc/nginx/conf.d/default.conf