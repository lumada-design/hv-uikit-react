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
import Theme from "../../samples/foundation/theme";
import HvProvider from "@hv/uikit-react-core/src/Provider";

storiesOf("Foundation/Theming", module)
  .add("Intro", () => <Theme />)
  .add("Provider",() => <HvProvider></HvProvider>, {
    title: "Provider",
    description:
      "a wrapper of material ui provider used to inject theme objects to the components inside",
    usage: "import HvProvider from '@hv/uikit-react-core/dist/Provider'",
    examples: [
      {
        title: "1. HvProvider basic usage",
        src: "foundation/provider/simpleProvider"
      },
      {
        title: "2. HvProvider with wicked theme usage",
        src: "foundation/provider/wickedProvider"
      }
    ]
  })
