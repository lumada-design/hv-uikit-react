*** Setting ***
Resource          ../../_resources/keywords.resource
Suite Setup       open storybook
Suite Teardown    Close Browser
Default Tags      smoke


*** Variables ***
${1stRadioButton}         id:radio1-input
${2ndRadioButton}         id:radio2-input
${radioSelected}          css:div[class*='RadioButtonSelected']
${radioNotSelected}       css:div[class*='RadioButtonUnselected']
${1stRadioButtonLabel}    xpath://span[text()='Label']

*** Test Cases ***
select radio button by clicking in input
    go to                                ${components}selectors-radio--label
    Wait Until Page Contains Element     ${1stRadioButton}
    Element Should not Be Visible        ${radioSelected}
    Element Should Be Visible            ${radioNotSelected}
    Click Element                        ${1stRadioButton}
    Element Should Be Visible            ${radioSelected}
    Element Should not Be Visible        ${radioNotSelected}

select radio button by clicking in label
    go to                                ${components}selectors-radio--label
    Wait Until Page Contains Element     ${1stRadioButton}
    Element Should not Be Visible        ${radioSelected}
    Element Should Be Visible            ${radioNotSelected}
    Click Element                        ${1stRadioButtonLabel}
    Element Should Be Visible            ${radioSelected}
    Element Should not Be Visible        ${radioNotSelected}

unable select radio button when is disabled
    go to                                ${components}selectors-radio--disabled
    Wait Until Page Contains Element     ${1stRadioButton}
    Run Keyword And Ignore Error         Click Element    ${1stRadioButton}
    Element Should Be Disabled           ${1stRadioButton}
    Element Should Be Visible            ${radioNotSelected}
    Element Should not Be Visible        ${radioSelected}

unable unselect checked radio button when is disabled
    go to                                ${components}selectors-radio--checked-disabled
    Wait Until Page Contains Element     ${1stRadioButton}
    Run Keyword And Ignore Error         Click Element    ${1stRadioButton}
    Element Should Be Disabled           ${1stRadioButton}
    Element Should Be Visible            ${radioSelected}
    Element Should not Be Visible        ${radioNotSelected}

radio button with state management
    go to                                ${components}selectors-radio--with-state
    Wait Until Element Is Enabled        ${1stRadioButton}
    Element Attribute Value Should Be    ${1stRadioButton}    checked    true
    Element Attribute Value Should Be    ${2ndRadioButton}    checked    ${None}
    Click Element                        ${2ndRadioButton}
    Element Attribute Value Should Be    ${1stRadioButton}    checked    ${None}
    Element Attribute Value Should Be    ${2ndRadioButton}    checked    true
