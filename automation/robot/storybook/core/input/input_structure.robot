*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Default Tags      smoke

*** Variables ***
${inputWrapper}         inputControlled
${input}                inputControlled-input
${inputClear}           css:div[aria-hidden=true]>button

*** Test Cases ***
input clear text
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coreinput--inputsimple
    Wait Until Element Is Enabled        //input[@id='input-simple-sample-input']                                              10s
    Input Text                           //input[@id='input-simple-sample-input']                                              test insert and delete text
    Element Attribute Value Should Be    //input[@id='input-simple-sample-input']                                              value                          test insert and delete text
    Wait Until Page Contains Element     //*[@id='input-simple-sample']//button[@aria-controls='input-simple-sample-input']    2s
    Click Element                        //*[@id='input-simple-sample']//button[@aria-controls='input-simple-sample-input']
    Element Attribute Value Should Be    //input[@id='input-simple-sample-input']                                              value                          ${EMPTY}

input static labels
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coreinput--inputsimple
    Wait Until Element Is Enabled    //input[@id='input-simple-sample-input']                                   10s
    Element Text Should Be           //*[@id='input-simple-sample']//label[@for='input-simple-sample-input']    First name
    Element Text Should Be           //*[@id='input-simple-sample-description']                                 Please enter your first name

input with info icon
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coreinput--inputsimplewithiconinfo
    Wait Until Element Is Enabled    //input[@id='input-simple-with-info-icon-sample-input']                                                  10s
    Element Text Should Be           //*[@id='input-simple-with-info-icon-sample']//label[@for='input-simple-with-info-icon-sample-input']    First name
    Page Should Contain Element      //*[@id='input-simple-with-info-icon-sample']//div[@title='Please enter your first name']

input controlled should write text as expected
    Go To                               ${STORYBOOK_URL}/iframe.html?id=coreinput--inputcontrolled
    Wait Until Element Is Enabled       ${input}        10s
    Element Attribute Value Should Be   ${input}        value       Initial value
    Input Text                          ${input}        123
    Element Attribute Value Should Be   ${input}        value       Initial value123

input controlled should write text and show clear button
    Go To                               ${STORYBOOK_URL}/iframe.html?id=coreinput--inputcontrolled
    Wait Until Element Is Enabled       ${input}        10s
    Element Attribute Value Should Be   ${input}        value       Initial value
    Element Should Not Be Visible       ${inputClear}
    Input Text                          ${input}        123
    Wait Until Element Is Visible       ${inputClear}   2s
    Element Attribute Value Should Be   ${input}        value       Initial value123
