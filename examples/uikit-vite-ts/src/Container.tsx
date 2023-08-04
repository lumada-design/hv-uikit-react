import { ReactNode } from "react";
import { css } from "@emotion/css";
import { Global, GlobalProps } from "@emotion/react";
import {
  HvButton,
  HvContainer,
  HvHeader,
  HvHeaderActions,
  HvTooltip,
  theme,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { Help, ThemeSwitcher } from "@hitachivantara/uikit-react-icons";

const globalStyles: GlobalProps["styles"] = {
  "code::before, code::after": { content: '"`"' },
};

export const Container = ({ children }: { children: ReactNode }) => {
  const { selectedTheme, selectedMode, changeTheme } = useTheme();

  const handleChangeTheme = () => {
    changeTheme(selectedTheme, selectedMode === "wicked" ? "dawn" : "wicked");
  };

  return (
    <div>
      <Global styles={globalStyles} />
      <HvHeader>
        <HvHeaderActions>
          <HvTooltip title="UI Kit documentation">
            <HvButton
              icon
              component="a"
              href="https://lumada-design.github.io/uikit/master"
              target="_blank"
            >
              <Help />
            </HvButton>
          </HvTooltip>
          <HvTooltip title="Change theme">
            <HvButton icon onClick={handleChangeTheme}>
              <ThemeSwitcher />
            </HvButton>
          </HvTooltip>
        </HvHeaderActions>
      </HvHeader>
      <HvContainer
        component="main"
        maxWidth="lg"
        className={css({
          paddingTop: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: theme.spacing(2),
        })}
      >
        {children}
      </HvContainer>
    </div>
  );
};
