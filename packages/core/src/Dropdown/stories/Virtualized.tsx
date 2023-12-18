import { HvDropdown } from "@hitachivantara/uikit-react-core";

export const Virtualized = () => {
  const values = [...Array(1500)].map((_, i) => ({
    id: `${i}`,
    label: `value  ${i}`,
  }));

  return (
    <HvDropdown
      aria-label="More than 1000 items"
      values={values}
      virtualized
      height={350}
      hasTooltips
      showSearch
    />
  );
};
