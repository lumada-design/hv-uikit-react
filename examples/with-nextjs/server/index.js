/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

require("dotenv").config();

const express = require("express");
const compression = require("compression");
const next = require("next");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const httpPort = process.env.HTTP_PORT || 80;
const dev = process.env.NODE_ENV !== "production";
const host = dev ? "127.0.0.1" : process.env.HOST;
const app = next({ dev });
const handle = app.getRequestHandler();

const ROOT_URL = `http://${host}:${httpPort}`;

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(compression());
    server.use(bodyParser.json()); // support json encoded bodies
    server.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
    server.use(cookieParser());

    server.get("*", (req, res) => handle(req, res));

    server.listen(httpPort, err => {
      if (err) throw err;
      console.log(`> Ready on ${ROOT_URL}`); // eslint-disable-line no-console
    });
  })
  .catch(err => {
    console.error(err.stack); // eslint-disable-line no-console
    process.exit(1);
  });
