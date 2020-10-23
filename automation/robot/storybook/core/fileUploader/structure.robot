*** Setting ***
Resource       ../_keywords.resource
Suite Setup    Run Keywords
...            Go To    ${tests}file-uploader--automation-sample
...            AND    Wait Until Element Is Enabled    ${button_removeFile}


*** Test Cases ***
remove files one by one
    Click Element                       ${button_removeFile}
    Wait Until Page Does Not Contain    file 1.png
    Page Should Contain Element         ${button_removeFile}    limit=3
    Repeat Keyword                      3 times
    ...   Click Element                 ${button_removeFile}
    Page Should Not Contain Element     ${button_removeFile}

dropZone is clickable
    Choose File    ${dropZone-inputArea}    ${SUITE_SOURCE}


*** Variables ***
${dropZone-inputArea}    css:input[type=file]
${button_removeFile}     css:button[aria-label='Remove File']
