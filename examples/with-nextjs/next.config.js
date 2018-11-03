/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

const path = require('path');

module.exports = {
  webpack: (config, { buildId, dev }) => {
    config.resolve = {
      alias: {
        someAlias: "alias path"
      },
      modules: [path.resolve(__dirname, "/app"), "node_modules"],
      symlinks: false
    };
    return config;
  }
};
