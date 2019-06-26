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
import Barchart from "@hv/uikit-react-lab/dist/Barchart";

storiesOf("Lab", module).add("Barchart", () => <Barchart />, {
  title: "Barchart",
  description: "",
  usage: "import Barchart from '@hv/uikit-react-core/dist/Barchart'",
  examples: [
    {
      title: "Simple Vertical Bar with use single",
      descr: "Tooltip with single line",
      src: "lab/barchart/simpleVerticalWithUseSingle.js"
    },
    {
      title: "Simple Vertical Bar",
      descr: "Tooltip with multiple line",
      src: "lab/barchart/simpleVertical.js"
    },
    {
      title: "Grouped Vertical Bar",
      src: "lab/barchart/groupVertical.js"
    },
    {
      title: "Stacked Vertical Bar",
      src: "lab/barchart/stackVertical.js"
    },
    {
      title: "Simple Horizontal Bar  with use single",
      src: "lab/barchart/simpleHorizontalWithUseSingle.js"
    },
    {
      title: "Simple Horizontal Bar",
      src: "lab/barchart/simpleHorizontal.js"
    },
    {
      title: "Grouped Horizontal Bar",
      src: "lab/barchart/groupHorizontal.js"
    },
    {
      title: "Stacked Horizontal Bar",
      src: "lab/barchart/stackHorizontal.js"
    },
  ]
});
