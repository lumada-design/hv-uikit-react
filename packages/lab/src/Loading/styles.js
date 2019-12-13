/*
 * Copyright 2019 Hitachi Vantara Corporation
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

const interval = 0.11;

const styles = theme => ({
  loading: {
    textAlign: "center"
  },

  centerPosition: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  inlinePosition: {
    marginTop: "5px"
  },

  loadingBar: {
    display: "inline-block",
    backgroundColor: theme.hv.palette.accent.acce1,

    "&.regular": {
      animation: "loading-regular 1s ease-in-out infinite",
      width: "4px",
      height: "14px",
      margin: "3px",

      "&:nth-child(1)": {
        animationDelay: "0"
      },
      "&:nth-child(2)": {
        animationDelay: `${interval * 2}s`
      },
      "&:nth-child(3)": {
        animationDelay: `${interval * 4}s`
      }
    },

    "&.small": {
      animation: "loading-small 1s ease-in-out infinite",
      width: "2px",
      height: "10px",
      margin: "4px 2px 2px 2px",

      "&:nth-child(1)": {
        animationDelay: "0"
      },
      "&:nth-child(2)": {
        animationDelay: `${interval}s`
      },
      "&:nth-child(3)": {
        animationDelay: `${interval * 2}s`
      }
    }
  },

  "@keyframes loading-regular": {
    "0%": {
      transform: "scale(1)",
      backgroundColor: theme.hv.palette.accent.acce1
    },
    "50%": {
      transform: "scale(1, 1.9)",
      backgroundColor: theme.hv.palette.accent.acce3
    }
  },

  "@keyframes loading-small": {
    "0%": {
      transform: "scale(1)",
      backgroundColor: theme.hv.palette.accent.acce1
    },
    "50%": {
      transform: "scale(1, 1.9)"
    }
  },

  loadingText: {
    marginTop: "20px"
  }
});

export default styles;
