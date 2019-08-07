FROM node:slim
RUN mkdir /hv-uikit-react
COPY ./ /hv-uikit-react
WORKDIR /hv-uikit-react

RUN npm config set unsafe-perm true
RUN npm ci --silent
RUN npm run bootstrap

CMD ["npm", "run", "automation"]

EXPOSE 9002
