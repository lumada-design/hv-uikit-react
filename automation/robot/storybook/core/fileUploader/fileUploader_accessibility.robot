*** Setting ***
Resource         ../../_resources/accessibility.robot
Force Tags       pa11y


*** Test Cases ***
file upload
    pa11y result should be equal as file
    ...    ${components}file-uploader--automation-sample
    ...    ${CURDIR}/WCAG2AA_fileUpload.json
