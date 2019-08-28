*** Setting ***
Library     SeleniumLibrary
Resource    ../../../_resources/storybook_keywords.robot

*** Keywords ***
open storybook button page
    open storybook
    Go To                            ${STORYBOOK_URL}/${BUTTON_PAGE}
    Wait Until Element Is Visible    xpath=(//button)[1]    2s    error message: The page don't was visible in 2 seconds 

verify button css properties
    [Arguments]        ${locator}    ${css}
    [Documentation]
    ...                Fails if CSS properties of element do not match with a given dictionary of properties
    ...
    Wait Until Keyword Succeeds    5    500ms    verify css element properties    ${locator}    ${css}

verify button background-color change with mouse over
    [Arguments]    ${locator}
    remove mouse over button
    ${value}                       get constanct css property value    ${locator}    background-color
    Mouse Over                     ${locator}
    Wait Until Keyword Succeeds    5                                   500ms         verify css element property has different value    ${locator}    background-color    ${value}

verify CSS properties do not changes with mouse over
    [Arguments]    ${locator}
    remove mouse over button    
    ${value}                       get constanct css property value    ${locator}    background-color
    Mouse Over                     ${locator}
    Wait Until Keyword Succeeds    5                                   500ms         verify css element property value    ${locator}    background-color    ${value}
    
remove mouse over button
    Mouse Over    //body

remove focus
    Click Element    //body
