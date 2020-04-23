/*
 * Copyright 2020 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { boxShadow } from "../../styles";

if (typeof window !== "undefined") {
  // eslint-disable-next-line global-require
  require("focus-within-polyfill");
}

const styles = theme => {
  const show = {
    top: 46,
    transition: ["top"],
    ...boxShadow(theme.hv.palette.accent.acce1),
    transitionDuration: 500
  };

  const hide = {
    top: 0,
    transition: ["top"],
    boxShadow: "none",
    transitionDuration: 300
  };

  return {
    root: {
      left: 0,
      width: "100%",
      display: "flex",
      justifyContent: "center"
    },
    menubar: {
      position: "relative",
      height: 46,
      backgroundColor: theme.hv.palette.atmosphere.atmo1
    },
    menu: {
      position: "absolute",
      height: 40,
      zIndex: -1,
      backgroundColor: theme.hv.palette.atmosphere.atmo3
    },
    hidden: {
      ...hide
    },
    active: {
      ...show
    },
    list: {
      margin: 0,
      padding: 0,
      display: "inherit",
      "&:hover $active": {
        ...hide
      },
      "& li:hover > $hidden": {
        ...show
      },

      // IE fallback code (using focus-within-polyfill)
      "&.focus-within $active": {
        ...hide
      },
      "& li.focus-within > $hidden": {
        ...show
      },

      "&:focus-within $active": {
        ...hide
      },
      "& li:focus-within> $hidden": {
        ...show
      }
    }
  };
};

export default styles;
