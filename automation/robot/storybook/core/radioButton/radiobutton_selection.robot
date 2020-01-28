*** Setting ***
Variables                             ../../_resources/storybook_variables.yaml
Resource                              ../../_resources/storybook_keywords.robot
Library                               SeleniumLibrary
Suite Setup                           open storybook
Suite Teardown                        Close Browser
Default Tags                          smoke                                


*** Variables ***
${1stRadioButton}         hv-radiobutton-1-input
${2ndRadioButton}         hv-radiobutton-2-input
${radioSelected}          css:div[class*='RadioButtonSelected']
${radioNotSelected}       css:div[class*='RadioButtonUnselected']
${1stRadioButtonLabel}    css:#hv-radiobutton-1>span:nth-of-type(2)


*** Test Cases ***
select radio button by clicking in input
    go to                                ${STORYBOOK_URL}/iframe.html?id=coreradiobutton--radiobuttonlabel
    Wait Until Page Contains Element     ${1stRadioButton}         10s
    Element Should not Be Visible        ${radioSelected}
    Element Should Be Visible            ${radioNotSelected}
    Click Element                        ${1stRadioButton}
    Element Should Be Visible            ${radioSelected}
    Element Should not Be Visible        ${radioNotSelected}

select radio button by clicking in label
    go to                                ${STORYBOOK_URL}/iframe.html?id=coreradiobutton--radiobuttonlabel
    Wait Until Page Contains Element     ${1stRadioButton}         10s
    Element Should not Be Visible        ${radioSelected}
    Element Should Be Visible            ${radioNotSelected}
    Click Element                        ${1stRadioButtonLabel}
    Element Should Be Visible            ${radioSelected}
    Element Should not Be Visible        ${radioNotSelected}

unable select radio button when is disabled
    go to                                ${STORYBOOK_URL}/iframe.html?id=coreradiobutton--radiobuttondisabled
    Wait Until Page Contains Element     ${1stRadioButton}         10s
    Run Keyword And Ignore Error         Click Element             ${1stRadioButton}
    Element Should Be Disabled           ${1stRadioButton}
    Element Should Be Visible            ${radioNotSelected}
    Element Should not Be Visible        ${radioSelected}

unable unselect checked radio button when is disabled
    go to                                ${STORYBOOK_URL}/iframe.html?id=coreradiobutton--radiobuttoncheckeddisabled
    Wait Until Page Contains Element     ${1stRadioButton}         10s
    Run Keyword And Ignore Error         Click Element             ${1stRadioButton}
    Element Should Be Disabled           ${1stRadioButton}
    Element Should Be Visible            ${radioSelected}
    Element Should not Be Visible        ${radioNotSelected}

radio button with state management
    go to                                ${STORYBOOK_URL}/iframe.html?id=coreradiobutton--radiobuttonstate
    Wait Until Element Is Enabled        ${1stRadioButton}         10s
    Element Attribute Value Should Be    ${1stRadioButton}         checked              true
    Element Attribute Value Should Be    ${2ndRadioButton}         checked              ${None}
    Click Element                        ${2ndRadioButton}
    Element Attribute Value Should Be    ${1stRadioButton}         checked              ${None}
    Element Attribute Value Should Be    ${2ndRadioButton}         checked              true
