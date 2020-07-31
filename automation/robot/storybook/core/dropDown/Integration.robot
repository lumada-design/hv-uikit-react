*** Setting ***
Resource      _resources.resource


*** Test Cases ***
focus other clicked element when dropdown is opened
    [Documentation]    https://github.com/lumada-design/hv-uikit-react/issues/1783
    ...    focus clicked element and keep dropdown opened when other page elements are clicked
    Go To                            ${components}asset-inventory--three-views
    Wait Until Element Is Enabled    ${dropdown}
    Click Element                    ${dropdown}
    Wait Until Page Contains         TimeHorizon descending
    Click Element                    ${lastDismissButton}
    Element Should Be Focused        ${dropdown} div
    Page Should Not Contain          TimeHorizon descending


*** Variables ***
${lastDismissButton}    id:post-id_9
