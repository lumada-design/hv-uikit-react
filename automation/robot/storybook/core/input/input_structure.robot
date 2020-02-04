*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Default Tags      smoke


*** Variables ***
${input}          css:input[type=text]
${inputClear}     css:button[aria-label='Clear the text']
${label}          input-simple-sample-label
${description}    input-simple-sample-description
${icon}           css:div[title='Please enter your first name']


*** Test Cases ***
clean text when click on input clear button
    Go To                               ${STORYBOOK_URL}/iframe.html?id=coreinput--inputsimple
    Wait Until Element Is Enabled       ${input}         10s
    Input Text                          ${input}         test insert and delete text
    Wait Until Page Contains Element    ${inputClear}    2s
    Textfield Should Contain            ${input}         test insert and delete text
    Click Element                       ${inputClear}
    Textfield Should Contain            ${input}         ${EMPTY}

show clear button when has edited the input
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coreinput--inputcontrolled
    Wait Until Element Is Enabled    ${input}         10s
    Textfield Should Contain         ${input}         Initial value
    Input Text                       ${input}         123
    Wait Until Element Is Visible    ${inputClear}    2s

show clear button when input has a text and is focused
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coreinput--inputcontrolled
    Wait Until Element Is Enabled    ${input}         10s
    Click Element                    ${input}
    Element Should Be Focused        ${input}
    Wait Until Element Is Visible    ${inputClear}    2s

don't show clear button when input cleaned/empty and is focused
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coreinput--inputsimple
    Wait Until Element Is Enabled    ${input}         10s
    Click Element                    ${input}
    Element Should Be Focused        ${input}
    Element Should Not Be Visible    ${inputClear}

show static labels when input with static labels is rendered
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coreinput--inputsimple
    Wait Until Element Is Enabled    ${input}          10s
    Element Should Be Visible        ${label}
    Element Text Should Be           ${label}          First name
    Element Should Be Visible        ${description}
    Element Text Should Be           ${description}    Please enter your first name

show info icon when input with info icon is rendered
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coreinput--inputsimplewithiconinfo
    Wait Until Element Is Enabled    ${input}    10s
    Element Should Be Visible        ${icon}

