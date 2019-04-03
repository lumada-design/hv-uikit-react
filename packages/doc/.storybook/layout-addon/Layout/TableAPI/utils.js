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

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";

const Enum = ({ classes, array }) => (
  <div>
    oneOf(
    <ul className={classes.enum}>
      {array.map((elem, idx) => (
        <li key={idx}>{elem.value}</li>
      ))}
    </ul>
    )
  </div>
);

const Shape = ({ classes, obj }) => (
  <>
    <div>&#123;</div>
    <ul className={classes.shape}>
      {Object.keys(obj).map((key, idx) => (
        <li key={idx}>
          {key}
          {" : "}
          {obj[key].name}
        </li>
      ))}
    </ul>
    <div>&#125;</div>
  </>
);

const List = ({ classes, children }) => (
  <div>
    arrayOf(
    <div className={classes.list}>{children}</div>)
  </div>
);

const ListOfShape = ({ classes, obj }) => (
  <div>
    arrayOf(&#123;
    <ul className={classes.shape}>
      {Object.keys(obj.value).map((key, idx) => (
        <li key={idx}>
          {key}
          {" : "}
          {obj.value[key].name}
        </li>
      ))}
    </ul>
    &#125;)
  </div>
);

const parseDescription = description => {
  return description.split("-")[0];
};

const parseType = (type, classes) => {
  let typeValue;
  let Type;

  switch (type.name) {
    case "instanceOf":
      typeValue = type.value;
      break;
    case "enum":
      Type = withStyles(styles, { withTheme: true })(Enum);
      typeValue = <Type array={type.value} />;
      break;
    case "arrayOf":
      if (type.value.name === "shape") {
        Type = withStyles(styles, { withTheme: true })(ListOfShape);
        typeValue = <Type obj={type.value} />;
      } else {
        Type = withStyles(styles, { withTheme: true })(List);
        typeValue = <Type>{type.value.name}</Type>;
      }
      break;
    case "shape":
      Type = withStyles(styles, { withTheme: true })(Shape);
      typeValue = <Type obj={type.value} />;
      break;
    default:
      typeValue = type.name;
  }

  return typeValue;
};

export { parseType, parseDescription };
