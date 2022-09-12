import { useParameter } from "@storybook/api";
import { WithTooltip, TooltipLinkList } from "@storybook/components";

import { PARAM_KEY } from "config";
import useThemeSwitcher from "hooks/useThemeSwitcher";
import Switcher from "components/Switcher";
import ColorIcon from "components/icons/ColorIcon";

const Tool: React.FC = () => {
  const themes = useParameter<Theme[]>(PARAM_KEY);
  const { setTheme } = useThemeSwitcher();

  return themes?.length ? (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltip={
        <TooltipLinkList
          links={themes?.map(({ title, value, color }: Theme) => ({
            id: title,
            title,
            right: color ? <ColorIcon color={color} /> : undefined,
            onClick: () => setTheme((value || title).toLowerCase()),
          }))}
        />
      }
    >
      <Switcher />
    </WithTooltip>
  ) : (
    <Switcher />
  );
};

export default Tool;
