import { useMemo } from "react";
import { css } from "@emotion/css";
import { HvDropdown } from "@hitachivantara/uikit-react-core";
import {
  Priority1,
  Priority2,
  Priority3,
  Priority4,
  Priority5,
} from "@hitachivantara/uikit-react-icons";

const classes = {
  iconContainer: css({
    lineHeight: "32px",
    display: "flex",
    alignItems: "center",
    gap: 5,
  }),
  icon: css({
    width: 16,
    height: 16,
  }),
};

const PriorityIcon = ({
  Icon,
  label,
}: {
  Icon: typeof Priority1;
  label: string;
}) => (
  <span className={classes.iconContainer}>
    <Icon className={classes.icon} />
    <div>{label}</div>
  </span>
);

export const WithIcons = () => {
  const values = useMemo(() => {
    const icons = [Priority1, Priority2, Priority3, Priority4, Priority5];

    return icons.map((Icon, i) => {
      const label = `Priority P${i + 1}`;

      return {
        id: `p${i + 1}`,
        label: <PriorityIcon Icon={Icon} label={label} />,
        value: label,
      };
    });
  }, []);

  return (
    <HvDropdown aria-label="Dropdown With Icons" values={values} showSearch />
  );
};
