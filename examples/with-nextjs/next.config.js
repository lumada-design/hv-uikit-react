/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

const path = require("path");
const resolve = require("resolve");
const withImages = require("next-images");
const withCSS = require("@zeit/next-css");

const nextConfig = {
  webpack: (config, options) => {
    const { dir, isServer } = options;

    // eslint-disable-next-line no-param-reassign
    config.externals = [];

    if (isServer) {
      config.externals.push((context, request, callback) => {
        resolve(
          request,
          { basedir: dir, preserveSymlinks: true },
          (err, res) => {
            if (err) {
              return callback();
            }

            // Next.js by default adds every module from node_modules to
            // externals on the server build. This brings some undesirable
            // behaviors because we can't use modules that require CSS files.
            //
            // The lines below blacklist deps (that cannot be put on externals).
            if (
              res.match(/node_modules[/\\].*\.js/) &&
              !res.match(/node_modules[/\\]webpack/) &&
              !res.match(/node_modules[/\\]@hv/) &&
              !res.match(/node_modules[/\\]@material/)
            ) {
              return callback(null, `commonjs ${request}`);
            }

            return callback();
          }
        );
      });
    }

    return config;
  }
};

module.exports = withImages(withCSS(nextConfig));
