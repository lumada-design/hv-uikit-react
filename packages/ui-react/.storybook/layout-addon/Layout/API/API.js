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
import PropsTable from "../PropsTable";

const HvAPI = ({ classes, propsMetaData }) => (
  <React.Fragment>
    <h3>Prop Types</h3>
    <div className={classes.props}>
      <PropsTable propsMetaData={propsMetaData} />
    </div>
  </React.Fragment>
);
export default HvAPI;
