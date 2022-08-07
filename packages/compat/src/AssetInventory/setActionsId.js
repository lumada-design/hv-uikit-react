import { setId } from "@hitachivantara/uikit-react-core";

/**
 * Sets individual ids for each action, using the action id and the data id.
 *
 * @param actions
 * @param id
 * @returns {*}
 */
const setActionsId = (actions, id) => {
  return actions?.map((action) => ({ ...action, id: setId(action.id, id) }));
};

export default setActionsId;
