// import { useContext } from "react";
import { useTheme, HvAccordion, HvBox } from "@hitachivantara/uikit-react-core";
// import { GeneratorContext } from "generator/GeneratorContext";
import { styles } from "./Typography.styles";
import { getVarValue } from "generator/utils";

const typographyToShow = [
  "display",
  "title1",
  "title2",
  "title3",
  "title4",
  "body",
  "label",
  "caption1",
  "caption2",
];

const Typography = () => {
  const { activeTheme } = useTheme();
  // const { customTheme, updateCustomTheme, updateChangedValues } =
  //   useContext(GeneratorContext);

  return (
    <div className={styles.root}>
      {typographyToShow.map((t) => {
        const typography = activeTheme?.typography[t];
        return (
          <HvAccordion expanded label={t} className={styles.label}>
            <HvBox css={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: typography.color,
                }}
              ></div>
              <span>{getVarValue(typography.fontSize)}</span>
              <span>{getVarValue(typography.letterSpacing)}</span>
              <span>{getVarValue(typography.lineHeight)}</span>
              <span>{getVarValue(typography.fontWeight)}</span>
            </HvBox>
          </HvAccordion>
        );
      })}
    </div>
  );
};

export default Typography;
