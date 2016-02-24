FROM node:latest

RUN mkdir parse

ENV APP_ID jarvis
ENV MASTER_KEY jarvisMasterKey
ENV DATABASE_URI mongodb://localhost:27017/dev

# Optional (default : 'parse/cloud/main.js')
# ENV CLOUD_CODE_MAIN cloudCodePath

# Optional (default : '/parse')
# ENV PARSE_MOUNT mountPath

EXPOSE 1337

VOLUME /parse
WORKDIR /parse

CMD npm install && gulp
