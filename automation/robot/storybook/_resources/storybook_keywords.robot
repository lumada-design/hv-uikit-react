*** Settings ***
Library      SeleniumLibrary
Library      OperatingSystem
Library      Collections
Variables    storybook_variables.yaml

*** Keywords ***
apply storybook theme
    [Arguments]        ${theme}=default
    [Documentation]
    ...                Change storybook as argument theme that can be "dawn" or "wicked"
    ...                if the actual theme is as argument theme don't will do nothing
    ...
    ...                themes assumptions:
    ...                - recognize as wicked theme when "change theme" button color is rgb(204, 204, 204)
    ...    
    ${button}                      Set Variable                       //button[.='Change theme']
    ${color}                       get css property value             ${button}                        color
    ${actual_theme}=               Set Variable If                    '204, 204, 204' in '${color}'    wicked     dawn
    Return From Keyword If         '${actual_theme}' == '${theme}'
    Click Button                   ${button}
    Wait Until Keyword Succeeds    5    1s    verify css element property has different value    ${button}    color    ${color}

compare images
    [Arguments]    ${baseImage}    ${locator}    ${tagName}    ${tolerance}
    [Documentation]
    ...                Compare the baseline image with a captured image of element locator
    ...                Arguments:
    ...                - baseImage    (string)     path to base image       ex: (${dir}/default_ie.png)
    ...                - locator      (string)     web locator o element
    ...                - tagName      (string)     captured image name, it is suggested the format theme_state_locator_browser.png
    ...                - tolerance    (decimal)    % value to tolerate      ex: (0.01 = 1%, max value 1 = 100%)
    ...    
    Create Directory              ${OUTPUTDIR}/results/${SUITE NAME}/${TEST NAME}
    ${path}                       Set Variable                          ${SUITE NAME}/${TEST NAME}/${tagName}
    Capture Element Screenshot    ${locator}                            actual/${path}
    ${rc}                         ${output} =                           Run And Return Rc And Output                compare -metric NCC "${baseImage}" "${OUTPUTDIR}/actual/${path}" "${OUTPUTDIR}/results/${path}"
    ${val}                        Evaluate                              round(${output},2) + float(${tolerance})
    Run Keyword If                round(${val},2)<1                     fail                                        The images do not match
    [Return]                      round(${output},2)

element attribute value should contain
    [Arguments]       ${locator}               ${attribute}    ${expected}
    ${value}          Get Element Attribute    ${locator}      ${attribute}
    Should Contain    ${value}                 ${expected}     ignore_case=True

element attribute value should not contain
    [Arguments]           ${locator}               ${attribute}    ${expected}
    ${value}              Get Element Attribute    ${locator}      ${attribute}
    Should Not Contain    ${value}                 ${expected}     ignore_case=True

wait until element attribute value does not contain
    [Arguments]    ${locator}    ${attribute}    ${expected}    ${retry_interval}
    [Documentation]
    ...    necessary for (and just for) ie synchronization
    ...
    Wait Until Keyword Succeeds    3    ${retry_interval}    element attribute value should not contain    ${locator}    ${attribute}    ${expected}

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
    ...                Open the choosen browser on the storybook url provided
    ...
    ...                Arguments:
    ...                - url         (string)    url address of storybook (by default is assuming variable ${STORYBOOK_URL})
    ...                - browser     (string)    the desired browser ( by defautl is assuming variable ${BROWSER} )
    ...
    Open Browser               ${url}    ${browser}
    Maximize Browser Window

verify element background-color change on mouse over
    [Arguments]    ${locator}
    Mouse Over    css:body
    ${value}                       get constanct css property value    ${locator}    background-color
    mouse over                     ${locator}
    Wait Until Keyword Succeeds    5                                   500ms         verify css element property has different value    ${locator}    background-color    ${value}

verify css element properties
    [Arguments]        ${locator}    ${css}
    [Documentation]
    ...                Compare all css properties of a dictionary against a web element
    ...
    ...                Arguments:
    ...                - locator     (string)        any Selenium Library supported locator xpath/css/id etc.
    ...                - css         (dictionary)    dictionary with css property and value
    ...
    ...                Returns       (string)        returns Fail if CSS property is different
    ...
    ${keys}                         Get Dictionary Keys    ${css}
    &{dict}=                        Create Dictionary
    FOR                             ${i}                   IN                        @{keys}
    \                               ${value}=              get css property value    ${locator}       ${i}
    \                               Set To Dictionary      ${dict}                   ${i}=${value}
    Dictionaries Should Be Equal    ${css}                 ${dict}                   error message: the CSS Properties ${dict} don't match as expected ${css}

verify css element property value
    [Arguments]    ${locator}    ${property}    ${value}
    ${current_value}    get constanct css property value    ${locator}    ${property}
    Should Be Equal     ${current_value}                    ${value}      error message: the css element property don't have the correct value

verify css element property has different value
    [Arguments]    ${locator}    ${property}    ${value}
    ${current_value}       get constanct css property value    ${locator}    ${property}
    Should Not Be Equal    ${current_value}                    ${value}      error message: the css element property should have different value of "${value}"

verify element count
    [Arguments]    ${locator}    ${counts}
    [Documentation]    
    ...   | Arguments: | Description | Default Value |
    ...   | locator | supported selenium Library locators |
    ...   | counts | (integer) of expected counts |
    ...          
    ${got_counts}      Get Element Count     ${locator}
    ${counts}          Convert To Integer    ${counts}
    Should Be Equal    ${got_counts}         ${counts}

verify element is not focused
    [Arguments]        ${locator}
    ${value}           Run Keyword And Return Status    Element Should Be Focused    ${locator}
    Should Be Equal    ${value}                         ${False}                     error message: The element is focused

verify element property has different value
    [Arguments]    ${locator}    ${property}    ${value}
    ${current_value}       Get Element Attribute    ${locator}    ${property}
    Should Not Be Equal    ${current_value}         ${value}      error message: the element property shouln't have same value

verify list items
    [Arguments]    ${locator}    ${items}
    ${list_items}      Get List Items    ${locator}
    Should Be Equal    ${list_items}     ${items}

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
    [Arguments]    ${locator}    ${keys}
    [Documentation]    
    ...   work around for react consider as a human action, otherwise using 'press keys' directly will be reverted by react  
    ...    
    Set Focus To Element    ${locator}
    Press Keys              none          ${keys}

wait until element attribute value contain
    [Arguments]    ${locator}    ${attribute}    ${expected}
    [Documentation]    retry 3 times every second until keyword succeed    
    Wait Until Keyword Succeeds    3    1s    element attribute value should contain    ${locator}    ${attribute}    ${expected} 
