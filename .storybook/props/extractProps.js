import { extractComponentProps } from "@storybook/docs-tools/dist/esm";

import sortProps from "./sortProps";

const extractSubSection = (extractedProps, propName, defaultValues = {}) => {
  const prop = extractedProps.find((prop) => prop.propDef.name === propName);
  if (prop) {
    if (prop?.docgenInfo?.type?.name === "shape" && prop?.docgenInfo?.type?.value) {
      prop.propDef.description += "<br><strong>Check the " + propName + " section bellow.</strong>";
      prop.propDef.type.summary = "Object";
      prop.propDef.type.detail = null;

      let docgenDefaultValues = {};
      if (prop.docgenInfo.defaultValue?.value) {
        try {
          eval("docgenDefaultValues = " + prop.docgenInfo.defaultValue.value);
        } catch (e) {}
      }

      return Object.keys(prop.docgenInfo.type.value).map((name) => {
        const { name: type, description, required } = prop.docgenInfo.type.value[name];
        const propDef = {
          name,
          description,
          required,
          type: {
            summary: type,
          },
        };

        let defaultValue = null;
        if (defaultValues[name] != null) {
          defaultValue = defaultValues[name];
        } else if (docgenDefaultValues[name]) {
          defaultValue = docgenDefaultValues[name];
        }

        if (defaultValue) {
          propDef.defaultValue = {
            summary: type === "string" ? '"' + defaultValue + '"' : defaultValue,
          };
        }

        return propDef;
      });
    }
  }
};

const enhance = (extractedProps, component) => {
  return extractedProps.map((x) => x.propDef);
};

export const extractProps = (component) => {
  const extractedProps = extractComponentProps(component, "props");
  if (extractedProps.length === 0) {
    return [];
  }

  const result = {
    sections: {
      properties: sortProps(enhance(extractedProps, component)),
      classes: sortProps(extractSubSection(extractedProps, "classes"), ["root"]),
      labels: sortProps(
        extractSubSection(
          extractedProps,
          "labels",
          component.defaultLabels ? component.defaultLabels : {}
        )
      ),
    },
  };

  return result;
};
