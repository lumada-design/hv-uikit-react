import React, { useState } from "react";
import PropTypes from "prop-types";
import uniqueId from "lodash/uniqueId";
import { withStyles } from "@material-ui/core";
import File from "../File";
import styles from "./styles";

const FileList = ({
  id,
  classes,
  list,
  progressConjunctionLabel,
  removeFileButtonLabel,
  onFileRemoved
}) => {
  const [fileListId] = useState(id || uniqueId("hv-filelist-"));

  const hasFiles = list.length > 0;

  return (
    hasFiles && (
      <ul id={fileListId} className={classes.list}>
        {list.map(data => (
          <li key={data.id}>
            <File
              id={`${fileListId}-${data.id}`}
              data={data}
              onFileRemoved={onFileRemoved}
              progressConjunctionLabel={progressConjunctionLabel}
              removeFileButtonLabel={removeFileButtonLabel}
            />
          </li>
        ))}
      </ul>
    )
  );
};

FileList.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the Switch Component.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * The files to upload.
   */
  list: PropTypes.arrayOf(PropTypes.shape({})),
  /**
   * Callback fired when file is removed from list.
   */
  onFileRemoved: PropTypes.func,
  /**
   * File upload progress message conjunction.
   */
  progressConjunctionLabel: PropTypes.string.isRequired,
  /**
   * Value of aria-label to apply to remove file button in filelist
   * */
  removeFileButtonLabel: PropTypes.string.isRequired
};

FileList.defaultProps = {
  id: null,
  list: [],
  onFileRemoved: () => {}
};

export default withStyles(styles, { name: "HvFileUploaderFileList" })(FileList);
