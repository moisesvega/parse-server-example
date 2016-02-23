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

# Uncomment if you want to access cloud code outside of your container
# A main.js file must be present, if not Parse will not start

VOLUME /parse
WORKDIR /parse

CMD npm install && npm start
