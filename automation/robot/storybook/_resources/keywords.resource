*** Settings ***
Library     SeleniumLibrary    timeout=15s    #version 4.3.0
Library     OperatingSystem
Library     Collections
Library     String
Resource    variables.resource

*** Keywords ***
element attribute value should contain
    [Arguments]       ${locator}               ${attribute}    ${expected}
    ${value}          Get Element Attribute    ${locator}      ${attribute}
    Should Contain    ${value}                 ${expected}     ignore_case=True

element attribute value should not contain
    [Arguments]           ${locator}               ${attribute}    ${expected}
    ${value}              Get Element Attribute    ${locator}      ${attribute}
    Should Not Contain    ${value}                 ${expected}     ignore_case=True

open storybook
    [Arguments]        ${url}=${STORYBOOK_URL}    ${browser}=${BROWSER}
    [Documentation]
    ...   Open the chosen browser on the storybook url provided with options: \n
    ...    - *window-size=1920,1080;  start-maximized;  headless*
    ...   Arguments:
    ...   - url        url address of storybook (by default is assuming variable ${STORYBOOK_URL})
    ...   - browser    the desired browser ( by defautl is assuming variable ${BROWSER} )
    Open Browser    ${url}    ${browser}
    ...             options=add_argument("--window-size=1920,1080");\ add_argument("--headless")
    Maximize Browser Window

verify element is not focused
    [Arguments]        ${locator}
    ${value}           Run Keyword And Return Status    Element Should Be Focused    ${locator}
    Should Be Equal    ${value}    ${False}    error message: The element is focused

clean input
    [Arguments]       ${locator}
    Run Keyword If    '${BROWSER.lower()}'=='ie'
    ...    Press Keys    ${locator}    CTRL+A+DELETE   #IE11 keyboards case incompatible
    ...    ELSE
    ...    Press Keys    ${locator}    CTRL+a+DELETE

force input
    [Arguments]        ${locator}    ${string}
    [Documentation]
    ...    Cleans the input locator and sets with the string value.
    Clean input        ${locator}
    Input Text         ${locator}    ${string}

set focus and press keys
    [Arguments]    ${locator}    @{keys}
    [Documentation]
    ...   work around for react consider as a human action,
    ...   otherwise using 'press keys' directly will be reverted by react
    Set Focus To Element    ${locator}
    Press Keys              none          @{keys}

wait until element attribute contain
    [Arguments]    ${locator}    ${attribute}    ${expected}
    [Documentation]    necessary for Internet Explorer synchronization
    Wait Until Keyword Succeeds    5x    1s
    ...    element attribute value should contain    ${locator}    ${attribute}    ${expected}

wait until element attribute not contain
    [Arguments]    ${locator}    ${attribute}    ${value}
    [Documentation]    necessary for Internet Explorer synchronization
    Wait Until Keyword Succeeds    5x    1s
    ...    element attribute value should not contain    ${locator}    ${attribute}    ${value}

restore default windows size 1920 1080
    Set Window Size    1920    1080    True

get elements text
    [Arguments]    ${csslocator}
    ${csslocator}=    Replace String        ${csslocator}    css:    ${EMPTY}
    ${values}         Execute Javascript
    ...   return Array.from(document.querySelectorAll("${csslocator}"))
    ...   \.map(function(el){return el.innerText.trim();}).join(',')
    #not supported on ie11
    #return Array.from(document.querySelectorAll("${csslocator}"))
    #.map(el => el.innerText).join(',')
    [Return]          ${values}

elements text should be
    [Arguments]    ${csslocator}    ${text}
    ${values}          get elements text    ${csslocator}
    Should Be Equal    ${values}            ${text}          ignore_case=True

elements text should not be
    [Arguments]    ${csslocator}    ${text}
    ${values}              get elements text    ${csslocator}
    Should Not Be Equal    ${values}            ${text}          ignore_case=True

wait until page contains elements
    [Documentation]    workaround while it is not possible use seleniumLibrary 4.4 with: \n
    ...                *'Wait Until Page Contains Element ... limit=x'*
    [Arguments]    ${csslocator}    ${limit}
    Wait For Condition
    ...    return document.querySelectorAll('${csslocator}'.replace('css:','')).length == ${limit}