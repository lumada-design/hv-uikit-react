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

storiesOf("Components", module).add("Input", () => <HvInput />, {
  title: "Input box",
  description:
    "A input box that offers clear buttons, info messages, default validations, and custom validations",
  usage: "import HvInput from '@hv/uikit-react-core/dist/Input'",
  examples: [
    {
      title: "1. Simple input",
      description: "Simple input with basic labels",
      src: "components/input/inputSimple"
    },
    {
      title: "2. Input with icon info",
      description: "Showing the info icon instead of the info text bellow the input",
      src: "components/input/inputSimpleWithIconInfo"
    },
    {
      title: "3. Disabled input",
      description:
        "Disabled input not allowing interactions",
      src: "components/input/inputSimpleDisable"
    },
    {
      title: "4. Input in invalid validation state",
      description: "Input created in invalid validation state showing the error message and the failed validation icon",
      src: "components/input/inputSimpleInvalid"
    },
    {
      title: "5. No validation",
      description:
        "Input that disables every type of validations not showing validation icons",
      src: "components/input/inputNoValidation"
    },
    {
      title: "6. Limited",
      description:
        "input that includes validation of the max length of the string accepting up to 5 characters",
      src: "components/input/inputMax"
    },
    {
      title: "7. Limited numeric",
      description:
        "input that only accepts number, includes validation of the max length of the string accepting up to 5 characters",
      src: "components/input/inputMaxNumeric"
    },
    {
      title: "8. Required limited numeric",
      description:
        "Required input, that only accepts number, includes validation of the max length of the string accepting up to 5 characters",
      src: "components/input/inputRequiredMaxNumeric"
    },
    {
      title: "9. Email",
      description:
        "Email required input, that only accepts valid email addresses",
      src: "components/input/inputEmail"
    },
    {
      title: "10. Password",
      description:
        "Password required input that only accepts the value ´password´, the value must be between 6 and 12 characters in length",
      src: "components/input/inputPassword"
    },
    {
      title: "11. Custom validation",
      description:
        "Input with a custom validation function, it validates if the input contains the value `hello`",
      src: "components/input/inputCustomValidation"
    },
    {
      title: "12. Default value",
      description: "Input with an default value already in place",
      src: "components/input/inputDefaultValue"
    },
    {
      title: "13. Event demonstration",
      description: "Input with all event functions enabled",
      src: "components/input/inputEvents"
    },
    {
      title: "14. Custom input props",
      description:
        "Using the input props to inject input custom props, this input will block values when exceeding 25 characters",
      src: "components/input/inputCustomProps"
    },
    {
      title: "15. Change input content with another component",
      description: "Change the input value from outside the Input component",
      src: "components/input/inputUncontrolledValue"
    },
    {
      title: "16. Suggestions",
      description: "Simple input with suggestion list",
      src: "components/input/inputSuggestions"
    },
  ]
});
