*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=components-file-uploader--automation-sample


*** Test Cases ***
file upload sample against WCAG2AA standard
    pa11y result should be equal as file    ${url}    ${CURDIR}/WCAG2AA_fileUpload.json