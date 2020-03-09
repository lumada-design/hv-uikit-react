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

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center"
  },
  container: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center"
    }
  },
  containerMessageOnly: {
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "row"
    },
    "& $textContainer": {
      marginLeft: 0
    }
  },
  iconContainer: {},
  textContainer: {
    background: "transparent",
    maxWidth: "510px",
    overflow: "hidden",
    [theme.breakpoints.up("sm")]: {
      marginLeft: `${theme.hv.spacing.sm}px`
    }
  },
  titleContainer: {
    margin: "5px 0",
    [theme.breakpoints.only("xs")]: {
      marginTop: `${theme.hv.spacing.sm}px`
    }
  },
  messageContainer: {},
  actionContainer: {
    marginTop: `${theme.hv.spacing.sm}px`,
    "& a": {
      ...theme.hv.typography.inlineLink,
      textDecoration: "none"
    }
  }
});

export default styles;
