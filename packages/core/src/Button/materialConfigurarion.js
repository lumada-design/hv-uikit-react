import materialButtonConfiguration from "./materialButtonConfiguration";

const materialContained = {
  color: materialButtonConfiguration.color.primary,
  variant: materialButtonConfiguration.variant.contained,
};

const materialOutlined = {
  color: materialButtonConfiguration.color.primary,
  variant: materialButtonConfiguration.variant.outlined,
};

const materialText = {
  color: materialButtonConfiguration.color.primary,
  variant: materialButtonConfiguration.variant.text,
};

const categoryValues = Object.freeze({
  primary: "primary",
  secondary: "secondary",
  ghost: "ghost",
  ghostSecondary: "ghostSecondary",
  semantic: "semantic",
  icon: "icon",
});

/**
 * Receives a desired HvButton category and generates an appropriate material ui configuration.
 *
 * @param {Object} classes - The styling to apply to the buttons.
 * @param {String} category - category of button to use. primary, secondary, ghost...etc.
 * @returns {Object} - An Object with the color and variant values required by the material ui button.
 */
const getMaterialConfiguration = (classes, category) => {
  const styling = {
    root: classes.root,
    containedPrimary: classes.primary,
    outlinedPrimary: classes.secondary,
    textPrimary: classes.ghost,
    startIcon: classes.startIcon,
  };

  switch (category) {
    default:
    case categoryValues.primary:
      return {
        ...materialContained,
        classes: {
          ...styling,
          disabled: classes.primaryDisabled,
        },
      };
    case categoryValues.secondary:
      return {
        ...materialOutlined,
        classes: {
          ...styling,
          disabled: classes.secondaryDisabled,
        },
      };
    case categoryValues.ghost:
      return {
        ...materialText,
        classes: {
          ...styling,
          disabled: classes.ghostDisabled,
        },
      };
    case categoryValues.ghostSecondary:
      return {
        ...materialText,
        classes: {
          ...styling,
          textPrimary: classes.ghostSecondary,
          disabled: classes.ghostSecondaryDisabled,
        },
      };
    case categoryValues.semantic:
      return {
        ...materialText,
        classes: {
          ...styling,
          textPrimary: classes.semantic,
          disabled: classes.semanticDisabled,
        },
      };
    case categoryValues.icon:
      return {
        ...materialText,
        classes: {
          ...styling,
          disabled: classes.ghostDisabled,
        },
      };
  }
};

export default getMaterialConfiguration;
export { categoryValues, materialContained, materialOutlined, materialText };
