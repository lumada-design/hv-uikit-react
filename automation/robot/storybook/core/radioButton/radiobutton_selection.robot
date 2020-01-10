*** Setting ***
Variables                             ../../_resources/storybook_variables.yaml
Resource                              ../../_resources/storybook_keywords.robot
Library                               SeleniumLibrary
Suite Setup                           open storybook
Suite Teardown                        Close Browser
Default Tags                          smoke                                


*** Variables ***
${1stRadioButton}    hv-radiobutton-1-input
${2ndRadioButton}    hv-radiobutton-2-input
${divSelected}       css:div[class*='RadioButtonSelected']
${divUnselected}     css:div[class*='RadioButtonUnselected']


*** Test Cases ***
select radio button
    go to                                ${STORYBOOK_URL}/iframe.html?id=coreradiobutton--radiobuttonlabel
    Wait Until Page Contains Element     ${1stRadioButton}         10s
    Element Should Be Visible            ${divUnselected}
    Click Element                        ${1stRadioButton}         
    Element Should Be Visible            ${divSelected}

unable select radio button when is disabled 
    go to                                ${STORYBOOK_URL}/iframe.html?id=coreradiobutton--radiobuttondisabled
    Wait Until Page Contains Element     ${1stRadioButton}         10s
    Element Should Be Disabled           ${1stRadioButton}         
    Element Should Be Visible            ${divUnselected}

radio button with state management
    go to                                ${STORYBOOK_URL}/iframe.html?id=coreradiobutton--radiobuttonstate
    Wait Until Element Is Enabled        ${1stRadioButton}    10s
    Element Attribute Value Should Be    ${1stRadioButton}    checked    true       
    Element Attribute Value Should Be    ${2ndRadioButton}    checked    ${None}
    Click Element                        ${2ndRadioButton}    
    Element Attribute Value Should Be    ${1stRadioButton}    checked    ${None}    
    Element Attribute Value Should Be    ${2ndRadioButton}    checked    true
