import { HvDropdown } from "@hitachivantara/uikit-react-core";

export const WithDefinedHeight = () => {
  const values = [...Array(100)].map((_, i) => ({
    id: `${i}`,
    label: `value  ${i}`,
  }));

  return (
    <HvDropdown
      aria-label="With defined height"
      values={values}
      height={350}
      hasTooltips
      showSearch
    />
  );
};
