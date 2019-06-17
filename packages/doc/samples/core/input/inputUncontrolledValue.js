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
import HvInput from "@hv/uikit-react-core/dist/Input";
import Button from "@hv/uikit-react-core/dist/Button";

const labels = {
  inputLabel: "Label",
  placeholder: "Enter value"
};

const btnStyle = {
  width: "50px",
  height: "50px",
  margin: "10px"
};

function WrapperComp() {
  const [value, setValue] = useState("Initial value");

  // to be possible to change the input value by user action
  const setterValue = value => {
    setValue(value);
  };

  return (
    <>
      <Button style={btnStyle} onClick={() => setValue("First value")}>
        First value{" "}
      </Button>
      <Button style={btnStyle} onClick={() => setValue("Second value")}>
        Second value{" "}
      </Button>
      <Button style={btnStyle} onClick={() => setValue("Third value")}>
        Third value{" "}
      </Button>
      <HvInput labels={labels} inputValue={value} onChange={setterValue} />
    </>
  );
}

export default <WrapperComp />;
