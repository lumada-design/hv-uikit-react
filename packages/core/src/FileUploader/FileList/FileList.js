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

import React, { useState } from "react";
import PropTypes from "prop-types";
import uniqueId from "lodash/uniqueId";
import File from "../File";

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
          </li>))}
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
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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

export default FileList;
