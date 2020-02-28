*** Settings ***
Library      SeleniumLibrary
Library      OperatingSystem
Library      Collections
Variables    storybook_variables.yaml

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
    Wait Until Element Is Visible    ${locator}    10s

get constanct css property value
    [Arguments]        ${locator}    ${property}
    [Documentation]
    ...                equal of keyword "get css property value" but wait until 2 seconds to browser fade end
    ...
    ${previous}    get css property value    ${locator}    ${property}
    FOR            ${index}                  IN RANGE                      10
    \              Sleep                     200ms
    \              ${last}                   get css property value        ${locator}        ${property}
    \              Run Keyword If            '${previous}' == '${last}'    Return From Keyword    ${last}
    \              Run Keyword If            '${previous}' == '${last}'    Exit For Loop
    \              ${previous}               Set Variable                  ${last}
    \              Run Keyword If            ${index} == 9                 fail              After 2 seconds The property are still changing
    END

get css property value
    [Arguments]        ${locator}    ${property}
    [Documentation]
    ...                Attention! please check also get constanct css property value to avoid fade problems
    ...
    ...                This keyword retrieves the CSS property value of an element. The element
    ...                is retrieved using the locator.
    ...
    ...                Arguments:
    ...                - locator                          (string)    any Selenium Library supported locator xpath/css/id etc.
    ...                - property_name                    (string)    the name of the css property for which the value is returned.
    ...
    ...                Returns                            (string)    returns the string value of the given css attribute or fails.
    ...
    ...                note: Same output can be get by javascript: "return window.getComputedStyle(document.getElementById("${locator}"), null).getPropertyValue("${attribute name}");
    ...                IE11 webdriver have a bug that returns error running that javascript
    ...    
    ${css}=         Wait Until Keyword Succeeds    5         400ms                    Get WebElement       ${locator}
    ${prop_val}=    Call Method                    ${css}    value_of_css_property    ${property}
    [Return]        ${prop_val}

open storybook
    [Arguments]        ${url}=${STORYBOOK_URL}    ${browser}=${BROWSER}
    [Documentation]
    ...                Open the choosen browser on the storybook url provided with options: \n
    ...                 - *window-size=1920,1080;  start-maximized;  headless*
    ...                Arguments:
    ...                - url         (string)    url address of storybook (by default is assuming variable ${STORYBOOK_URL})
    ...                - browser     (string)    the desired browser ( by defautl is assuming variable ${BROWSER} )
    ...
    Open Browser    ${url}    ${browser}    options=add_argument("--window-size=1920,1080"); add_argument("--start-maximized"); add_argument("--headless")
    Maximize Browser Window

verify element background-color change on mouse over
    [Arguments]    ${locator}
    [Documentation]    mouse over element and verify background-color change
    Mouse Over    css:body
    ${value}                       get constanct css property value    ${locator}    background-color
    mouse over                     ${locator}
    Wait Until Keyword Succeeds    5                                   500ms         verify css element property has different value    ${locator}    background-color    ${value}
   
verify css element property value
    [Arguments]    ${locator}    ${property}    ${value}
    ${current_value}    get constanct css property value    ${locator}    ${property}
    Should Be Equal     ${current_value}                    ${value}      error message: the css element property don't have the correct value

verify css element property has different value
    [Arguments]    ${locator}    ${property}    ${value}
    ${current_value}       get constanct css property value    ${locator}    ${property}
    Should Not Be Equal    ${current_value}                    ${value}      error message: the css element property should have different value of "${value}"

verify element is not focused
    [Arguments]        ${locator}
    ${value}           Run Keyword And Return Status    Element Should Be Focused    ${locator}
    Should Be Equal    ${value}                         ${False}                     error message: The element is focused

clean input
    [Arguments]       ${locator}
    Run Keyword If    '${BROWSER.lower()}'=='ie'    Press Keys    ${locator}    CTRL+A+DELETE    #IE11 vs chrome keyboards case incompatible
    ...               ELSE                          Press Keys    ${locator}    CTRL+a+DELETE

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
    ...   work around for react consider as a human action, otherwise using 'press keys' directly will be reverted by react  
    ...    
    Set Focus To Element    ${locator}
    Press Keys              none          @{keys}

wait until element attribute contain
    [Arguments]    ${locator}    ${attribute}    ${expected}
    [Documentation]    retry 5 times every second until keyword succeed \n necessary for Internet Explorer synchronization
    Wait Until Keyword Succeeds    5x    1s    element attribute value should contain    ${locator}    ${attribute}    ${expected} 

wait until element attribute not contain
    [Arguments]    ${locator}    ${attribute}    ${unexpected}
    [Documentation]    retry 5 times every second until keyword succeed \n necessary for Internet Explorer synchronization
    Wait Until Keyword Succeeds    5x    1s    element attribute value should not contain    ${locator}    ${attribute}    ${unexpected}
    
wait until css attribute contain
    [Arguments]    ${locator}    ${property}    ${value}
    [Documentation]    retry 5 times every second until keyword succeed \n necessary for Internet Explorer synchronization    
    Wait Until Keyword Succeeds    5x    1s    verify css element property value    ${locator}    ${property}    ${value}
    
wait until css attribute not contain
    [Arguments]    ${locator}    ${property}    ${value}
    [Documentation]    retry 5 times every second until keyword succeed \n necessary for Internet Explorer synchronization    
    Wait Until Keyword Succeeds    5x    1s    verify css element property has different value    ${locator}    ${property}    ${value}

restore default windows size 1920 1080
    Set Window Size    1920    1080    True