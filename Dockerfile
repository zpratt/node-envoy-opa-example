FROM node:20.11.0-bookworm as builder

RUN mkdir -p /home/node/install
WORKDIR /home/node/install
COPY package.json /home/node/install
COPY package-lock.json /home/node/install
RUN npm ci

FROM node:20.11.0-bookworm

RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY src /home/node/app/src
COPY index.js /home/node/app
COPY --from=builder /home/node/install/node_modules /home/node/app/node_modules
COPY --from=builder /home/node/install/package.json /home/node/app/package.json
EXPOSE 3000
ENTRYPOINT ["node", "--inspect=0.0.0.0:9229", "index.js"]
