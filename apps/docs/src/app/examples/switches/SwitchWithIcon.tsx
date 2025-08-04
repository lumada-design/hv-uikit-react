import { useState } from "react";
import {
  HvBaseSwitch,
  HvButtonBase,
  theme,
} from "@hitachivantara/uikit-react-core";

export default function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <HvButtonBase
      className="relative items-center rounded-full [&_.HvBaseSwitch-root]:bg-transparent"
      onClick={() => setChecked((prev) => !prev)}
      component="div"
    >
      <HvBaseSwitch
        size="medium"
        value="on"
        checked={checked}
        aria-label="Switch"
        onChange={(_evt, newChecked) => setChecked(newChecked)}
        color={checked ? "warning" : "border"}
      />
      <div
        className="bg-white border-1 border-borderString rounded-full w-28px h-28px flex items-center justify-center absolute top-2px cursor-pointer transition-left duration-200 ease"
        style={{
          left: checked ? 25 : 3,
          borderColor: checked
            ? theme.colors.warning
            : theme.colors.borderStrong,
        }}
      >
        {checked ? <div className="i-ph-sun" /> : <div className="i-ph-moon" />}
      </div>
    </HvButtonBase>
  );
}
