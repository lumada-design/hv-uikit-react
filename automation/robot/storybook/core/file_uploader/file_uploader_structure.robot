*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke

*** Variables ***
${file_location}         ${CURDIR}\\sample.txt
${dropZone-inputArea}    automationfileuploader1-dropzone-button
${fileLine}              //ul[contains(@id,'fileuploader1-filelist')]/li

*** Test Cases ***
dropZone is clickable
    Go To                            ${STORYBOOK_URL}/iframe.html?id=corefileuploader--dropzonearea
    Wait Until Element Is Enabled    ${dropZone-inputArea}    10s
    Choose File                      ${dropZone-inputArea}   ${file_location}

remove files one by one
    Go To                               ${STORYBOOK_URL}/iframe.html?id=corefileuploader--dropzonearea
    Wait Until Element Is Enabled       ${fileLine}                      10s
    ${fileName}                         Get Text                         xpath:(${fileLine})[2]/p
    Click element                       xpath:(${fileLine})[2]/button
    Wait Until Page Does Not Contain    ${fileName}                      2s
    verify element count                ${fileLine}                      3
    Click element                       xpath:(${fileLine})[2]/button
    verify element count                ${fileLine}                      2
    Click element                       xpath:(${fileLine})[2]/button
    verify element count                ${fileLine}                      1
    Click element                       xpath:(${fileLine})[1]/button
    verify element count                ${fileLine}                      0

label when file exceeds the maximum size
    Go To                            ${STORYBOOK_URL}/iframe.html?id=corefileuploader--dropzonearea
    Wait Until Element Is Enabled    ${fileLine}                       10s
    Element Text Should Be           xpath:((${fileLine})[3]//p)[2]    The file exceeds the maximum upload size

label when file type not allowed
    Go To                            ${STORYBOOK_URL}/iframe.html?id=corefileuploader--dropzonearea
    Wait Until Element Is Enabled    ${fileLine}                       10s
    Element Text Should Be           xpath:((${fileLine})[4]//p)[2]    File type not allowed for upload

truncated label is ccs ellipsis
    Go To                                ${STORYBOOK_URL}/iframe.html?id=corefileuploader--dropzonearea
    Wait Until Element Is Enabled        ${fileLine}                       10s
    verify css element property value    xpath:((${fileLine})[4]//p)[1]    text-overflow    ellipsis