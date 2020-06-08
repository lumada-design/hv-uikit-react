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

go to url and wait until element is visible
    [Arguments]    ${page}    ${locator}    ${seconds}
    [Documentation]    go to 'url' and wait the 'seconds' until 'element' is visible
    Go To                            ${page}
    Wait Until Element Is Visible    ${locator}    ${seconds}

get constanct css property value
    [Arguments]        ${locator}    ${property}
    [Documentation]
    ...     equal of keyword "get css property value" but wait until 2 seconds to browser fade end
    ...
    ${previous}    get css property value    ${locator}    ${property}
    FOR            ${index}                  IN RANGE                      10
    \              Sleep                     200ms
    \              ${last}                   get css property value    ${locator}    ${property}
    \              Run Keyword If            '${previous}' == '${last}'
    ...            Return From Keyword       ${last}
    \              Run Keyword If            '${previous}' == '${last}'    Exit For Loop
    \              ${previous}               Set Variable                  ${last}
    \              Run Keyword If            ${index} == 9
    ...            fail                      After 2 seconds The property are still changing
    END

get css property value
    [Arguments]        ${locator}    ${property}
    [Documentation]
    ...    Attention! please check also get constanct css property value to avoid fade problems
    ...
    ...    This keyword retrieves the CSS property value of an element. The element
    ...    is retrieved using the locator.
    ...
    ...    Arguments:
    ...    - locator          any Selenium Library supported locator xpath/css/id etc.
    ...    - property_name    the name of the css property for which the value is returned.
    ...
    ...    Returns            returns the string value of the given css attribute or fails.
    ...
    ...    note: Same output can be get by javascript:
    ...    window.getComputedStyle(document.getElementById("${l}"), null).getPropertyValue("${a}");
    ...    IE11 webdriver have a bug that returns error running that javascript
    ...
    ${css}=         Wait Until Keyword Succeeds    5    400ms
    ...             Get WebElement       ${locator}
    ${prop_val}=    Call Method    ${css}    value_of_css_property    ${property}
    [Return]        ${prop_val}

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

verify css element property value
    [Arguments]    ${locator}    ${property}    ${value}
    ${current_value}    get constanct css property value    ${locator}    ${property}
    Should Be Equal     ${current_value}     ${value}     css incorrect value

verify css element property has different value
    [Arguments]    ${locator}    ${property}    ${value}
    ${current_value}       get constanct css property value    ${locator}    ${property}
    Should Not Be Equal    ${current_value}                    ${value}

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
    ...                Cleans the input locator and sets with the string value.
    ...
    Clean input        ${locator}
    Input Text         ${locator}    ${string}

set focus and press keys
    [Arguments]    ${locator}    @{keys}
    [Documentation]
    ...   work around for react consider as a human action,
    ...   otherwise using 'press keys' directly will be reverted by react
    ...
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

wait until css attribute contain
    [Arguments]    ${locator}    ${property}    ${value}
    [Documentation]    necessary for Internet Explorer synchronization
    Wait Until Keyword Succeeds    5x    1s
    ...    verify css element property value    ${locator}    ${property}    ${value}

wait until css attribute not contain
    [Arguments]    ${locator}    ${property}    ${value}
    [Documentation]    necessary for Internet Explorer synchronization
    Wait Until Keyword Succeeds    5x    1s
    ...   verify css element property has different value    ${locator}    ${property}    ${value}

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
    [Arguments]    ${csslocator}    ${limit}    ${timeout}
    Wait For Condition
    ...    return document.querySelectorAll('${csslocator}'.replace('css:','')).length == ${limit}
    ...    timeout=${timeout}