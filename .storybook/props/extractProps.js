import { isForwardRef, isMemo } from "react-is";
import { hasDocgen, extractComponentProps } from "@storybook/addon-docs/dist/esm/lib/docgen";
import { enhancePropTypesProps } from "@storybook/addon-docs/dist/esm/frameworks/react/propTypes/handleProp";
import { enhanceTypeScriptProps } from "@storybook/addon-docs/dist/esm/frameworks/react/typeScript/handleProp";

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
  switch (extractedProps[0].typeSystem) {
    case "JavaScript":
      return enhancePropTypesProps(extractedProps, component);
    case "TypeScript":
      return enhanceTypeScriptProps(extractedProps);
    default:
      return extractedProps.map((x) => x.propDef);
  }
};

export const extractProps = (component) => {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  if (!hasDocgen(component)) {
    if (component.Naked) {
      // wrapped withStyles or withLabels or withId
      // shouldn't be needed because we are https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over
      return extractProps(component.Naked);
    } else if (isForwardRef(component) || component.render) {
      return extractProps(component.render().type);
    } else if (isMemo(component)) {
      return extractProps(component.type().type);
    }
  }

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
