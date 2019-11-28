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
import { storiesOf } from "@storybook/react";
import Tooltip from "@hv/uikit-react-core/dist/Tooltip";

storiesOf("Components", module).add("Tooltip", () => <Tooltip />, {
  title: "Tooltip",
  description: "",
  usage: "import Tooltip from '@hv/uikit-react-core/dist/Tooltip'",
  examples: [
    {
      title: "Single Line Tooltip",
      src: "components/tooltip/simpleTooltip.js"
    },
    {
      title: "Tooltip with Long Text",
      src: "components/tooltip/simpleTooltipLong.js"
    },
    {
      title: "Tooltip with Long Text - Open",
      src: "components/tooltip/simpleTooltipLongOpen.js"
    },
    {
      title: "Multiline Tooltip",
      src: "components/tooltip/multilineNoheaderTooltip.js"
    },
    {
      title: "Multiline Tooltip - Open",
      src: "components/tooltip/multilineNoheaderTooltipOpen.js"
    },
    {
      title: "Multiline Tooltip With Header",
      src: "components/tooltip/multilineWithHeaderTooltip.js"
    },
    {
      title: "Multiline Tooltip With Header - Open",
      src: "components/tooltip/multilineWithHeaderTooltipOpen.js"
    }
  ]
});
