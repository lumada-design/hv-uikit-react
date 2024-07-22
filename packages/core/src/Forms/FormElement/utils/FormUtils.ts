import React from "react";
import { InputBaseComponentProps } from "@mui/material";

import { HvFormElementContextValue } from "../context/FormElementContext";
import { HvFormElementDescriptorsContextValue } from "../context/FormElementDescriptorsContext";

interface Descriptor {
  id?: string;
  htmlFor?: string;
}
/**
 * Scans the element's children looking for the children IDs that match the different form element types.
 * This function will produce an object that has a key for each provided name
 * Inside each key there will be an array with each id of the found descriptor.
 *
 * @param {Array} children - The children inside the form element to scan.
 * @param {Object} descriptors - Initial descriptors map (used for recursion).
 *
 */
const findDescriptors = (
  children: React.ReactNode,
  descriptors: {
    input: Descriptor[];
    label: Descriptor[];
    description: Descriptor[];
    controlled: Descriptor[];
    errormessage: Descriptor[];
    HvCalendarHeader?: Descriptor[];
  } = {
    input: [],
    label: [],
    description: [],
    controlled: [],
    errormessage: [],

    // TODO: refactor this out
    HvCalendarHeader: [],
  },
) => {
  React.Children.forEach(children, (child: any) => {
    if (child?.type?.formElementType && child.props?.id) {
      descriptors[child.type.formElementType as keyof typeof descriptors]?.push(
        {
          id: child.props?.id,
          htmlFor: child.props?.htmlFor,
        },
      );
    }

    if (child?.type?.formElementType !== "formelement") {
      findDescriptors(child?.props?.children, descriptors);
    }
  });

  return descriptors;
};

const getIdReferenceListFor = (
  formElementType: string,
  descriptors: any,
  filterFor: string | null = null,
) => {
  const referenceList = descriptors?.[formElementType]
    ?.filter((d: any) => d.htmlFor !== filterFor)
    ?.map((d: any) => d.id)
    .join(" ")
    .trim();

  return referenceList !== "" ? referenceList : undefined;
};

const getIdReferenceFor = (
  formElementType: string,
  descriptors: any,
  filterFor = null,
) => {
  const referenceList = descriptors?.[formElementType]
    ?.filter((d: any) => d.htmlFor !== filterFor)
    ?.map((d: any) => d.id)?.[0];

  return referenceList !== "" ? referenceList : undefined;
};

const buildFormElementPropsFromContext = (
  name?: string,
  disabled?: boolean,
  readOnly?: boolean,
  required?: boolean,
  context?: HvFormElementContextValue,
) => {
  return {
    name: name || context?.elementName,
    disabled: disabled !== undefined ? disabled : context?.elementDisabled,
    readOnly: readOnly !== undefined ? readOnly : context?.elementReadOnly,
    required: required !== undefined ? required : context?.elementRequired,
    status: context?.elementStatus,
  };
};

const buildAriaPropsFromContext = (
  props: InputBaseComponentProps,
  context: HvFormElementDescriptorsContextValue,
  isInvalid: boolean,
  inputId?: string,
) => {
  const arias: React.AriaAttributes = {
    "aria-labelledby":
      props?.["aria-labelledby"] !== undefined
        ? props?.["aria-labelledby"]
        : getIdReferenceListFor("label", context?.descriptors, inputId),
    "aria-describedby":
      props?.["aria-describedby"] !== undefined
        ? props?.["aria-describedby"]
        : getIdReferenceListFor("description", context?.descriptors),
    "aria-controls":
      props?.["aria-controls"] !== undefined
        ? props?.["aria-controls"]
        : getIdReferenceListFor("controlled", context?.descriptors),
  };

  if (isInvalid) {
    arias["aria-invalid"] = isInvalid;
    arias["aria-errormessage"] =
      props?.["aria-errormessage"] !== undefined
        ? props?.["aria-errormessage"]
        : getIdReferenceFor("errormessage", context?.descriptors);
  }

  return arias;
};

export {
  findDescriptors,
  getIdReferenceListFor,
  getIdReferenceFor,
  buildFormElementPropsFromContext,
  buildAriaPropsFromContext,
};
