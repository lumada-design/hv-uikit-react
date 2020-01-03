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
  root: {},
  dropzoneContainer: {
    position: "relative",
    width: "100%",
    display: "flex",
    border: `1px dotted ${theme.hv.palette.atmosphere.atmo6}`,
    cursor: "pointer",
    background: `${theme.hv.palette.atmosphere.atmo2}`,
    "&:hover": {
      background: `${theme.hv.palette.atmosphere.atmo1}`,
      border: `1px dotted ${theme.hv.palette.accent.acce1}`
    }
  },
  dragAction: {
    background: `${theme.hv.palette.atmosphere.atmo1}`,
    border: `1px dotted ${theme.hv.palette.accent.acce1}`
  },
  inputArea: {
    opacity: 0,
    width: "100%",
    position: "absolute",
    height: "100%",
    cursor: "pointer"
  },
  dropArea: {
    display: "flex",
    margin: `${theme.hv.spacing.md}px auto`,
    minHeight: 40
  },
  dropzoneLabelsGroup: {
    display: "flex",
    marginBottom: 5,
    "& p:nth-child(1)": {
      marginRight: `${theme.hv.spacing.sm}px`
    },
    "& p:nth-child(3)": {
      marginRight: `${theme.hv.spacing.sm}px`,
      marginLeft: "auto"
    }
  },
  dropzoneAreaLabels: {
    display: "flex",
    width: 115,
    margin: "auto"
  },
  dropzoneAreaIcon: {
    margin: "auto",
    marginRight: `${theme.hv.spacing.sm}px`
  },
  dragText: {
    ...theme.hv.typography.normalText
  },
  selectFilesText: {
    ...theme.hv.typography.highlightText
  },
  inputLabelInfo: {
    position: "absolute",
    opacity: 0,
    width:"100%",
    height:"100%"
  }
});

export default styles;
