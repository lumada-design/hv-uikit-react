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
import PropTypes from "prop-types";
import { HvButton, buttonTypes } from "@hv-ui/react/core";
import HvLink from "@hv-ui/react/core/Link";

const ActionsList = ({ classes, eventId, dismiss, close }) => (
  <div className={classes.root}>
    <HvLink route="events" params={{ eventId }}>
      <HvButton
        style={{ borderBottom: "none" }}
        colorType={buttonTypes.secondary}
        className={classes.button}
      >
        View
      </HvButton>
    </HvLink>
    <HvButton
      colorType={buttonTypes.secondary}
      className={classes.button}
      onClick={() => {
        dismiss({
          variables: {
            id: eventId,
            date: new Date().toISOString()
          }
        });

        close();
      }}
    >
      Dismiss
    </HvButton>
  </div>
);

ActionsList.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  eventId: PropTypes.string.isRequired,
  dismiss: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
};

export default ActionsList;
