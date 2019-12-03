/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import materialButtonConfiguration from "./materialButtonConfiguration";
import buttonTypes from "./buttonTypes";

const materialContained = {
  color: materialButtonConfiguration.color.primary,
  variant: materialButtonConfiguration.variant.contained
};

const materialOutlined = {
  color: materialButtonConfiguration.color.primary,
  variant: materialButtonConfiguration.variant.outlined
};

const materialText = {
  color: materialButtonConfiguration.color.primary,
  variant: materialButtonConfiguration.variant.text
};

const categoryValues = Object.freeze({
  primary: "primary",
  secondary: "secondary",
  ghost: "ghost",
  ghostSecondary: "ghostSecondary",
  semantic: "semantic"
});

const variantValues = Object.freeze({
  primary: "primary",
  inspireRed: "inspireRed"
});

/**
 * Receives a desired HvButton category and variant and generates an appropriate material ui configuration.
 *
 * @param {Object} classes - The styling to apply to the buttons.
 * @param {String} colorType - the old category switching property that is deprecated.
 * @returns {Object} - An Object with the color and variant values required by the material ui button.
 * @deprecated
 */
const legacyConfiguration = (classes, colorType) => {
  switch (colorType) {
    default:
    case buttonTypes.primary:
      return {
        ...materialContained,
        classes: {
          containedPrimary: classes.primary,
          root: classes.root,
          disabled: classes.primaryDisabled
        }
      };
    case buttonTypes.secondary:
      return {
        ...materialOutlined,
        classes: {
          outlinedPrimary: classes.secondary,
          root: classes.root,
          disabled: classes.secondaryDisabled
        }
      };
    case buttonTypes.link:
      return {
        ...materialText,
        classes: {
          textPrimary: classes.ghost,
          root: classes.root,
          disabled: classes.ghostDisabled
        }
      };
  }
};

/**
 * Receives a desired HvButton category and variant and generates an appropiate material ui configuration.
 *
 * @param {Object} classes - The styling to apply to the buttons.
 * @param {String} category - category of button to use. primary, secondary, ghost...etc.
 * @param {String} variant - variant of button to use. primary, inspireRed...etc .
 * @returns {Object} - An Object with the color and variant values required by the material ui button.
 */
const getMaterialConfiguration = (classes, category) => {
  const styling = {
    root: classes.root,
    containedPrimary: classes.primary,
    outlinedPrimary: classes.secondary,
    textPrimary: classes.ghost,
    disabled: classes.primaryDisabled
  };

  switch (category) {
    default:
    case categoryValues.primary:
      return {
        ...materialContained,
        classes: styling
      };
    case categoryValues.secondary:
      return {
        ...materialOutlined,
        classes: {
          ...styling,
          disabled: classes.secondaryDisabled
        }
      };
    case categoryValues.ghost:
      return {
        ...materialText,
        classes: {
          ...styling,
          disabled: classes.ghostDisabled
        }
      };
    case categoryValues.ghostSecondary:
      return {
        ...materialText,
        classes: {
          ...styling,
          textPrimary: classes.ghostSecondary,
          disabled: classes.ghostSecondaryDisabled
        }
      };
    case categoryValues.semantic:
      return {
        ...materialText,
        classes: {
          ...styling,
          textPrimary: classes.semantic,
          disabled: classes.semanticDisabled
        }
      }
  }
};

/**
 * Receives a desired HvButton category and variant and generates an appropiate material ui configuration.
 *
 * @param {Object} classes - The styling to apply to the buttons.
 * @param {String} category - category of button to use. primary, secondary, ghost...etc.
 * @param {String} variant - variant of button to use. primary, inspireRed...etc .
 * @param {String} colorType - the old category switching property that is deprecated.
 * @returns {Object} - An Object with the color and variant values required by the material ui button.
 */
const materialConfigurationFactory = (classes, category, colorType) => {
  if (colorType) {
    // compatibility path
    return legacyConfiguration(classes, colorType);
  }
  return getMaterialConfiguration(classes, category);
};

export default materialConfigurationFactory;
export {
  categoryValues,
  variantValues,
  materialContained,
  materialOutlined,
  materialText
};
