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
import HvInput from "@hv/uikit-react-core/dist/Input";

storiesOf("Core", module).add("Input", () => <HvInput />, {
  title: "Input box",
  description:
    "A input box that offers clear buttons, info messages, default validations, and custom validations",
  usage: "import HvInput from '@hv/uikit-react-core/dist/Input'",
  examples: [
    {
      title: "1. Simple",
      description: "Simple input with basic labels",
      src: "core/input/inputSimple"
    },
    {
      title: "2. Simple with icon info",
      description: "Simple input with basic labels and icon info",
      src: "core/input/inputSimpleWithIconInfo"
    },
    {
      title: "3. Disabled",
      description:
        "Simple input with basic labels but disable not allowing interactions",
      src: "core/input/inputSimpleDisable"
    },
    {
      title: "4. No validation",
      description:
        "Input that disables every type of validations not showing validation icons",
      src: "core/input/inputNoValidation"
    },
    {
      title: "5. Limited",
      description:
        "input that includes validation of the max length of the string accepting up to 5 characters",
      src: "core/input/inputMax"
    },
    {
      title: "6. Limited numeric",
      description:
        "input that only accepts number, includes validation of the max length of the string accepting up to 5 characters",
      src: "core/input/inputMaxNumeric"
    },
    {
      title: "7. Required limited numeric",
      description:
        "Required input, that only accepts number, includes validation of the max length of the string accepting up to 5 characters",
      src: "core/input/inputRequiredMaxNumeric"
    },
    {
      title: "8. Email",
      description:
        "Email required input, that only accepts valid email addresses",
      src: "core/input/inputEmail"
    },
    {
      title: "9. Password",
      description:
        "Password required input that only accepts the value ´password´, the value must be between 6 and 12 characters in length",
      src: "core/input/inputPassword"
    },
    {
      title: "10. Custom validation",
      description:
        "Input with a custom validation function, it validates if the input contains the value `hello`",
      src: "core/input/inputCustomValidation"
    },
    {
      title: "12. Default value",
      description: "Input with an default value already in place",
      src: "core/input/inputDefaultValue"
    },
    {
      title: "12. Left icon",
      description: "Input with icons aligned to the left",
      src: "core/input/inputLeftIcon"
    },
    {
      title: "13. Event demonstration",
      description: "Input with all event functions enabled",
      src: "core/input/inputEvents"
    },
    {
      title: "14. Custom input props",
      description:
        "Using the input props to inject input custom props, this input will block values when exceeding 250 characters",
      src: "core/input/inputCustomProps"
    },
    {
      title: "15. Change input content with another component",
      description: "Change the input value from outside the Input component",
      src: "core/input/inputUncontrolledValue"
    }
  ]
});
