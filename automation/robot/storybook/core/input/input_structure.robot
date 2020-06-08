*** Setting ***
Resource          ../../_resources/keywords.resource
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke

*** Variables ***
${input}          css:input[type=text]
${inputClear}     css:button[class*="HvInput-iconClear"]
${label}          id:input-simple-sample-label
${description}    id:input-simple-sample-description
${iconInfo}       css:div[class*="HvInput-infoIconContainer"]
${iconSuccess}    css:div[class*="HvIconSuccess-root"]
${iconMap}        css:div[class*="HvIconMap-root"]

*** Test Cases ***
keep focus when choosing auto-complete suggestion
    [Tags]    keyboard
    Go To                                ${components}input--suggestion
    Wait Until Element Is Enabled        ${input}
    Press Keys                           ${input}    Portu
    Wait Until Page Contains             Portugal
    Press Keys                           NONE        ARROW_DOWN    ENTER
    Element Attribute Value Should Be    ${input}    value         Portugal
    Element Should Be Focused            ${input}

clean text when click on input clear button
    Go To                               ${components}input--main
    Wait Until Element Is Enabled       ${input}
    Input Text                          ${input}         test insert and delete text
    Wait Until Page Contains Element    ${inputClear}
    Textfield Should Contain            ${input}         test insert and delete text
    Click Element                       ${inputClear}
    Textfield Should Contain            ${input}         ${EMPTY}

show clear button when has edited the input
    Go To                            ${components}input--controlled
    Wait Until Element Is Enabled    ${input}
    Textfield Should Contain         ${input}         Initial value
    Input Text                       ${input}         123
    Wait Until Element Is Visible    ${inputClear}

show clear button when input has a text and is focused
    Go To                            ${components}input--controlled
    Wait Until Element Is Enabled    ${input}
    Click Element                    ${input}
    Element Should Be Focused        ${input}
    Wait Until Element Is Visible    ${inputClear}

don't show clear button when input cleaned/empty and is focused
    Go To                            ${components}input--main
    Wait Until Element Is Enabled    ${input}
    Click Element                    ${input}
    Element Should Be Focused        ${input}
    Element Should Not Be Visible    ${inputClear}

show static labels when input with static labels is rendered
    Go To                            ${components}input--main
    Wait Until Element Is Enabled    ${input}
    Element Should Be Visible        ${label}
    Element Text Should Be           ${label}          First name
    Element Should Be Visible        ${description}
    Element Text Should Be           ${description}    Please enter your first name

show info icon when input with info icon is rendered
    Go To                            ${components}input--with-icon-info
    Wait Until Element Is Enabled    ${input}
    Element Should Be Visible        ${iconInfo}

show only custom icon when text empty
    Go To                            ${components}input--suggestion
    Wait Until Element Is Enabled    ${input}
    Element Should Be Visible        ${iconMap}
    Element Should Not Be Visible    ${iconSuccess}

show only custom icon when text filled and focused
    Go To                            ${components}input--suggestion
    Wait Until Element Is Enabled    ${input}
    Input Text                       ${input}    aaa
    Element Should Be Visible        ${iconMap}
    Element Should Not Be Visible    ${iconSuccess}

show only validation icon when text filled and not focused
    Go To                            ${components}input--suggestion
    Wait Until Element Is Enabled    ${input}
    Input Text                       ${input}    aaa
    Click Element                    css:body
    Element Should Be Visible        ${iconSuccess}
    Element Should Not Be Visible    ${iconMap}
