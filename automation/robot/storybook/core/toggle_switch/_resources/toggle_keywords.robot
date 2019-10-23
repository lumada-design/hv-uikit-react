*** Setting ***
Library     SeleniumLibrary
Library    Collections
Resource    ../../../_resources/storybook_keywords.robot

*** Keywords ***
open storybook toggle page
    open storybook
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coretoggle--smoke
    Wait Until Element Is Visible    xpath=(//button)[1]    2s    error message: The page don't was visible in 2 seconds

rotine different toggle css properties
    [Arguments]    ${locator}    ${dict}
    ${list}    Get Dictionary Keys    ${dict}
    FOR        ${key}                 IN                     @{list}
    \          ${value}               Get From Dictionary    ${dict}    ${key}
    \          verify css element property has different value    ${locator}    ${key}    ${value}

get toggle css properties
    [Arguments]    ${locator}    ${list}
    [Documentation]
    ...                Given a list of css properties return a dictionary of that properties with values
    ...
    &{dict}     Create Dictionary
    FOR         ${key}               IN                        @{list}
    \           ${value}=            get css property value    ${locator}    ${key}
    \           Set To Dictionary    ${dict}                   ${key}        ${value}
    [Return]    &{dict}

Verify different toggle check state
    [Arguments]    ${locator}    ${state}
    Wait Until Keyword Succeeds    3    500ms    verify element property has different value    ${locator}    checked    ${state}

verify different toggle css properties
    [Arguments]    ${locator}    ${dict}
    Wait Until Keyword Succeeds    3    500ms    rotine different toggle css properties    ${locator}    ${dict}

verify toogle properties
    [Arguments]    ${locator}        ${dict}
    Wait Until Keyword Succeeds    3    500ms    verify css element properties    ${locator}    ${dict}

Verify toggle check state
    [Arguments]    ${locator}    ${state}
    Wait Until Keyword Succeeds    3    500ms    Element Attribute Value Should Be    ${locator}    checked    ${state}
