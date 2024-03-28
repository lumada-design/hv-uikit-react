import { css, CSSInterpolation } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvContainer,
  HvContainerProps,
  HvTypography,
  theme,
  useWidth,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvContainer> = {
  title: "Components/Container",
  component: HvContainer,
};
export default meta;

export const Main: StoryObj<HvContainerProps> = {
  args: {
    maxWidth: "md",
    fixed: false,
    disableGutters: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
    component: { control: { disable: true } },
  },
  render: (args) => {
    const styles: { [key: string]: CSSInterpolation } = {
      content: {
        border: "1px solid",
        borderColor: theme.colors.atmo4,
        backgroundColor: theme.colors.atmo3,
        height: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      },
      row: { display: "flex", flexDirection: "row" },
    };

    const width = useWidth();

    return (
      <HvContainer {...args}>
        <div className={css(styles.content)}>
          <div className={css(styles.row)}>
            <HvTypography variant="label">Current width:</HvTypography>
            <HvTypography variant="body">{width}</HvTypography>
          </div>
          <div className={css(styles.row)}>
            <HvTypography variant="label">maxWidth:</HvTypography>
            <HvTypography variant="body">{args.maxWidth}</HvTypography>
          </div>
        </div>
      </HvContainer>
    );
  },
};
