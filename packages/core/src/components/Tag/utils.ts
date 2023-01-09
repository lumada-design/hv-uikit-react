export const getOnDeleteCallback = (tagIsDisabled, providedOnDelete) => {
  const nullCallback = () => {};

  let deleteCallback;

  if (tagIsDisabled && providedOnDelete) {
    deleteCallback = nullCallback;
  } else if (tagIsDisabled && !providedOnDelete) {
    deleteCallback = undefined;
  } else {
    deleteCallback = providedOnDelete;
  }

  return deleteCallback;
};

export const hasDeleteAction = (onDeleteAction) => !!onDeleteAction;

export const hasClickAction = (onClickAction) => !!onClickAction;
