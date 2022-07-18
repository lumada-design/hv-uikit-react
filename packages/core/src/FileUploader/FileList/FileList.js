import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { setUid } from "../..";
import File from "../File";
import styles from "./styles";

const FileList = ({ id, classes, list = [], removeFileButtonLabel, onFileRemoved }) => {
  const hasFiles = list.length > 0;
  if (!hasFiles) return null;

  return (
    <ul id={id} className={classes.list}>
      {list.map((data) => (
        <File
          key={data.id}
          id={setUid(id, data.id)}
          data={data}
          onFileRemoved={onFileRemoved}
          removeFileButtonLabel={removeFileButtonLabel}
        />
      ))}
    </ul>
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
   * Value of aria-label to apply to remove file button in filelist
   * */
  removeFileButtonLabel: PropTypes.string.isRequired,
};

export default withStyles(styles, { name: "HvFileUploaderFileList" })(FileList);
