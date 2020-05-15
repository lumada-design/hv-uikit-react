*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Test Setup        Run Keywords
...               Go To    ${iframeVerticalNavigation}    AND
...               Wait Until Element Is Visible    ${listbox}   10s
Suite Teardown    Close Browser
Force Tags        smoke


*** Test Cases ***
navigate between levels
    Click Element                ${option: Advanced server DS530}
    Wait Until Page Contains     Variant X-333    5s
    Click Element                ${option: Variant X-333}
    Wait Until Page Contains     Component KY-121    5s
    Wait Until Page Contains     Component HS-921    5s
    return on navigation
    Wait Until Page Contains     Advanced server DS530    5s    #navigation title text
    return on navigation
    Wait Until Page Contains     Advanced server DS120    5s

search on first level
    Click Element                       ${option: Advanced server DS530}
    Wait Until Element Is Visible       ${searchInput}    5s
    force input text                    ${searchInput}    335
    Wait Until Page Does Not Contain    Variant X-333    3s
    Page Should Contain                 Variant X-335

search on 2nd level
    Click Element                       ${option: Advanced server DS530}
    Wait Until Element Is Visible       ${option: Variant X-333}    5s
    Click Element                       ${option: Variant X-333}
    Wait Until Element Is Visible       ${searchInput}    5s
    force input text                    ${searchInput}    921
    Wait Until Page Does Not Contain    Component KY-121    5s
    Page Should Contain                 Component HS-921

select action values settings Profile Help
    Element Text Should Be           (//ul[@role='listbox'])[2]    Profile\nSettings\nHelp


*** Variables ***
${iframeVerticalNavigation}         ${STORYBOOK_URL}/iframe.html?id=coreverticalnavigation--verticalnavigation4
${listbox}    	                    css:ul[role='listbox']
${option: Advanced server DS530}    xpath://li[contains(.,'Advanced server DS530')]
${option: Variant X-333}            xpath://li[contains(.,'Variant X-333')]
${searchInput}                      css:input[placeholder=Search]
${navigationTitle}                  css:[role=button][class*=titleContainer]


*** Keywords ***
force input text
    [Arguments]    ${locator}    ${text}
    Wait Until Keyword Succeeds    3x    750ms
    ...    force    ${locator}    ${text}

force
    [Arguments]          ${locator}    ${text}
    Input Text           ${locator}    ${text}
    Sleep                500ms   #time to react clean input
    ${value}             Get Element Attribute    ${locator}    value
    Run Keyword If       "${value}"==""
    ...    Press Keys    ${locator}    ${text}

return on navigation
    Wait Until Keyword Succeeds    3x    750ms
    ...    Click Element           ${navigationTitle}