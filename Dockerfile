FROM node:8.9.1

RUN mkdir /interview-scheduler
RUN apt-get update && apt-get install -y curl \
                                         build-essential

ADD . /interview-scheduler
WORKDIR /interview-scheduler

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .