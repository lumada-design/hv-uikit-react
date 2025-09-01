import { ReactNode } from "react";

export type ContentTypeInfo = {
  /**
   * The id of the content type
   */
  id: string;

  /**
   * The label of the content type.
   */
  label: string;

  /**
   * The description of the content type.
   */
  description?: string;

  /**
   * The icon of the content type, as a ReactNode.
   */
  icon: ReactNode;
};

export type UseContentTypeInfo = () => ContentTypeInfo;
