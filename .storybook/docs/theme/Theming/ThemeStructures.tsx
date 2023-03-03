import React, { useState } from "react";
import styled from "@emotion/styled";
// @ts-ignore
import { HvDropdown, themes } from "@hitachivantara/uikit-react-core";

export const ThemeStructures = () => {
  const [list] = useState(["-", ...Object.keys(themes)]);
  const [current, setCurrent] = useState("-");

  const StyledDropdown = styled(HvDropdown)({
    width: "200px",
    marginBottom: "16px",
  });

  return (
    <div>
      <StyledDropdown
        value={current}
        options={list.map((name) => ({
          value: name,
          label: name,
        }))}
        onChange={setCurrent}
      />
      <pre>{JSON.stringify(themes[current], undefined, 2)}</pre>
    </div>
  );
};
