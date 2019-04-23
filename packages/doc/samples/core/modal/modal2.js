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

import React, { useState } from "react";
import HvButton from "@hv/uikit-react-core/dist/Button";
import Unlock from "@hv/uikit-react-icons/dist/Unlock.S";
import {
  HvModal,
  HvModalActions,
  HvModalContent,
  HvModalTitle
} from "@hv/uikit-react-core/dist";

const SimpleModal = ({ buttonMessage, title, content, actions }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <HvButton onClick={() => setOpen(true)}>{buttonMessage}</HvButton>
      <HvModal open={open} onClose={() => setOpen(false)}>
        {title}
        {content}
        {actions}
      </HvModal>
    </div>
  );
};

export default (
  <SimpleModal
    buttonMessage="Custom icon"
    title={<HvModalTitle customIcon={<Unlock />}>Are you sure?</HvModalTitle>}
    content={(
      <HvModalContent>
        Switching to model view will clear all the fields in your visualization.
        You will need to re-select your fields.
      </HvModalContent>
)}
    actions={(
      <HvModalActions>
        <HvButton colorType="secondary" onClick={() => {}}>
          Cancel
        </HvButton>
        <HvButton>Switch anyway</HvButton>
      </HvModalActions>
)}
  />
);
