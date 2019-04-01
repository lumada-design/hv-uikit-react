/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";

const parseDescription = description => {
  return description.split("-")[0];
};

const ObjectDescription = ({ obj, classes }) => (
  <>
    <div>&#123;</div>
    <ul className={classes.objectDescription}>
      {Object.keys(obj).map(key => (
        <li>
          {key}
          {" : "}
          {obj[key].name}
        </li>
      ))}
    </ul>
    <div>&#125;</div>
  </>
);

const EnumList = ({ array, classes }) => (
  <div>
    oneOf(
    <ul className={classes.enumList}>
      {array.map(elem => (
        <li>{elem.value}</li>
      ))}
    </ul>
    )
  </div>
);

const ListOfShapes = ({ obj }) => (
  <ListOfSomethingWithStyles>
    <ObjectDescriptionWithStyles obj={obj} />
  </ListOfSomethingWithStyles>
);

const ListOfSomething = ({ children, classes }) => (
  <div>
    arrayOf(
    <div className={classes.listOfSomething}>{children}</div>)
  </div>
);

const ObjectDescriptionWithStyles = withStyles(styles, { withTheme: true })(
  ObjectDescription
);
const EnumListWithStyles = withStyles(styles, { withTheme: true })(EnumList);
const ListOfSomethingWithStyles = withStyles(styles, { withTheme: true })(
  ListOfSomething
);

export {
  parseDescription,
  ListOfShapes,
  ObjectDescriptionWithStyles as ObjectDescription,
  EnumListWithStyles as EnumList,
  ListOfSomethingWithStyles as ListOfSomething
};
