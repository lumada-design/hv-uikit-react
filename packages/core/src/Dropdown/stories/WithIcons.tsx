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

const PriorityIcon = ({
  Icon,
  label,
}: {
  Icon: React.ElementType;
  label: string;
}) => (
  <span
    className={css({
      lineHeight: "32px",
      display: "flex",
      alignItems: "center",
    })}
  >
    <Icon
      iconSize={{ width: 22, height: 22 }}
      className={css({ float: "left", margin: "5px 5px 5px 0" })}
    />
    <h3>{label}</h3>
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
