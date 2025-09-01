export const ServiceDefinitions = {
  /**
   * The {@const UseCreateNewContentAction} service represents an action for
   * creating new content from the default-app application.
   *
   * Create new content actions are displayed on a menu or dropdown button.
   *
   * Instances of this service are React hook functions of type
   * {@link UseCreateNewContentAction}.
   */
  UseCreateNewContentAction: {
    id: "default-app/services:UseCreateNewContentAction",
  },

  /**
   * The {@const UseContentTypeInfo} service represents UI information for a
   * type of the given content of a given application, including the content
   * type's identifier, label, description and icon.
   *
   * Instances of this service are React hook functions, of type
   * {@link UseContentTypeInfo}.
   */
  UseContentTypeInfo: {
    id: "default-app/services:UseContentTypeInfo",
  },
};
