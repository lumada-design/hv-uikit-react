*** Settings ***
Library     SeleniumLibrary    timeout=15s    #version 4.5.0
Library     String
Resource    _variables.resource

*** Keywords ***
element attribute value should contain
    [Documentation]
    ...   attribute must has a specific substring
    [Arguments]       ${locator}               ${attribute}    ${expected}
    ${value}          Get Element Attribute    ${locator}      ${attribute}
    Should Contain    ${value}                 ${expected}     ignore_case=True

element attribute value should not contain
    [Documentation]
    ...   attribute can not has a specific substring
    [Arguments]           ${locator}               ${attribute}    ${expected}
    ${value}              Get Element Attribute    ${locator}      ${attribute}
    Should Not Contain    ${value}                 ${expected}     ignore_case=True

elements text should be
    [Documentation]
    ...   compare text of node list
    [Arguments]    ${csslocator}    ${text}
    ${values}          get elements text    ${csslocator}
    Should Be Equal    ${values}            ${text}          ignore_case=True

elements text should not be
    [Documentation]
    ...   compare text of node list
    [Arguments]    ${csslocator}    ${text}
    ${values}              get elements text    ${csslocator}
    Should Not Be Equal    ${values}            ${text}          ignore_case=True

force input
    [Documentation]
    ...    Cleans the input locator and sets with the string value.
    ...     - note: check "clean input" documentation
    [Arguments]    ${locator}    ${string}
    Click Element   ${locator}
    Repeat Keyword  12 times    Press Keys  ${locator}   BACKSPACE

    Input Text     ${locator}   ${string}
    
    

get elements text
    [Documentation]
    ...    get text of a node list
    [Arguments]    ${csslocator}
    ${csslocator}=    Remove String    ${csslocator}    css:
    ${values}         Execute Javascript
    ...   return Array.from(document.querySelectorAll("${csslocator}"))
    ...   \.map(function(el){return el.innerText.trim();}).join(',')
    #not supported on ie11
    #return Array.from(document.querySelectorAll("${csslocator}"))
    #.map(el => el.innerText).join(',')
    [Return]          ${values}

html body should be focused
    [Documentation]    ie11 has focus on css:html the other browser on css:body
    Run Keyword If    '${BROWSER.lower()}'=='ie'
    ...    Element Should Be Focused    css:html
    ...    ELSE
    ...    Element Should Be Focused    css:body

reduce selenium speed for ie keyboard events
    [Documentation]   avoid error on IE webdriver when is sent keyboard instruction "too fast"
    [Arguments]    ${time}
    Run Keyword If    '${BROWSER.lower()}'=='ie'    Set Selenium Speed    ${time}

open browser webdriver
    [Documentation]
    ...   Opens browser with blank page and window-size=1920,1080 (width,height),
    ...   by default,  runs on headless mode, except on IE which does not support it \n
    ...   Arguments:
    ...   - url        (by default about:blank)
    ...   - browser    (by defautl is assuming Global variable ${BROWSER} )
    [Arguments]        ${url}=about:blank    ${browser}=${BROWSER}
    Open Browser    ${url}    ${browser}
    ...             options=add_argument("--headless");add_argument("--lang=en-US")
    Set Window Size    1920    1080

scroll to element
    [Documentation]    work around for selenium keyword "Scroll Element Into View"
    ...                MoveTargetOutOfBoundsException error
    ...                - ${element}  must be a css locator
    [Arguments]    ${element}
    ${element}    Remove String    ${element}    css:
    Execute Javascript             document.querySelector("${element}").scrollIntoView(true);

select dropdown value
    [Documentation]    selects a dropdown value given the dropdown locator and value to select
    [Arguments]    ${dropdown}    ${value}
    Wait Until Element Is Enabled       ${dropdown}
    Click Element                       ${dropdown}
    Wait Until Element Is Visible       css:ul[role='listbox']
    Click Element                       //li[@role='option' and text()='${value}']
    Wait Until Element Is Not Visible   css:ul[role='listbox']

set focus and press keys
    [Documentation]
    ...   - work around for react consider as a human action
    ...   - otherwise using 'press keys' directly will be reverted by react
    [Arguments]    ${locator}    @{keys}
    Set Focus To Element    ${locator}
    Press Keys              none          @{keys}

wait until element attribute contain
    [Documentation]    wait 5 seconds for asynchronous condition
    [Arguments]    ${locator}    ${attribute}    ${expected}
    Wait Until Keyword Succeeds    5x    1s
    ...    element attribute value should contain    ${locator}    ${attribute}    ${expected}

wait until element attribute not contain
    [Documentation]    wait 5 seconds for asynchronous condition
    [Arguments]    ${locator}    ${attribute}    ${value}
    Wait Until Keyword Succeeds    5x    1s
    ...    element attribute value should not contain    ${locator}    ${attribute}    ${value}
