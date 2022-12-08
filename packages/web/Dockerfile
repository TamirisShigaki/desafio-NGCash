FROM node:16

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN npm install

ADD . .

RUN npm install

ENTRYPOINT ["/entrypoint.sh"]

CMD ["npm", "run", "dev"]
