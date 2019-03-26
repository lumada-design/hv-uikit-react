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

import palette from "../palette";

const muiButton = {
  root: {
    color: palette.primary.main,
    cursor: "pointer",
    borderRadius: 0,
    height: 40,
    maxHeight: 44,
    minHeight: 30,
    minWidth: 70,
    margin: 10,
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "14px",
    "&:hover,&:focus": {},
    "&:active": {},
    "&$disabled": {}
  },
  sizeSmall: {
    fontSize: "14px",
    padding: "7px 12px"
  },
  containedPrimary: {
    "&$disabled": {
      backgroundColor: palette.primary.main,
      color: palette.primary.contrastText,
      opacity: "0.5"
    }
  }
};

export default muiButton;
