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
import HvEmptyState from "@hv/uikit-react-core/dist/EmptyState";

storiesOf("Components", module).add("Empty State", () => <HvEmptyState />, {
  title: "Empty State",
  description: "A splash screen component for information",
  usage: "import HvEmptyState from '@hv/uikit-react-core/dist/EmptyState'",
  examples: [
    {
      title: "1. Simple",
      description: "Basic empty state to provide information",
      src: "components/emptyState/emptyStateSimple.js"
    }
  ]
});
