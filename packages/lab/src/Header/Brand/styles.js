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
    brandContainer: {
      position: "relative",
      display: "inherit",
      alignItems: "center",
      height: "100%",
      marginRight: `${theme.hv.spacing.lg}px`
    },
    [theme.breakpoints.down("md")]: {
      brandContainer: {
        marginRight: `${theme.hv.spacing.md}px`
      }
    },
    [theme.breakpoints.down("sm")]: {
      brandContainer: {
        position: "absolute",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }
    },
    iconContainer: {
      display: "inherit",
      maxHeight: "46px"
    },
    companyLogoTextContainer: {
      height: "46px",
      display: "flex",
      alignItems: "center"
    },
    separator: {
      width: `${theme.hv.spacing.sm}px`,
      height: `${theme.hv.spacing.md}px`,
      borderRight: `1px solid ${theme.hv.palette.atmosphere.atmo5}`
    },
    separatorPadding: {
      width: `${theme.hv.spacing.sm}px`
    },
    separatorBox: {
      display: "flex"
    },
    productLogoTextContainer: {
      height: "46px",
      display: "flex",
      alignItems: "center"
    },
    paddingTextLeft: { paddingLeft: `${theme.hv.spacing.xs}px` }
  });

export default styles;
