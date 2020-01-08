*** Setting ***
Variables                             ../../_resources/storybook_variables.yaml
Resource                              ../../_resources/storybook_keywords.robot
Library                               SeleniumLibrary
Suite Setup                           open storybook
Suite Teardown                        Close Browser
Default Tags                          smoke                                


*** Variables ***
${input}                              //input[@type='radio']

*** Test Cases ***
select radio button
    go to                                ${STORYBOOK_URL}/iframe.html?id=coreradiobutton--radiobuttonlabel
    Wait Until Page Contains Element     ${input}         10s
    Element Should Be Visible            //div[contains(@class, 'RadioButtonUnselected')]    
    Click Element                        ${input}         
    Element Should Be Visible            //div[contains(@class, 'RadioButtonSelected')]    


unable select radio button when is disabled 
    go to                                ${STORYBOOK_URL}/iframe.html?id=coreradiobutton--radiobuttondisabled
    Wait Until Page Contains Element     ${input}         10s
    Element Should Be Disabled           ${input}         
    Element Should Be Visible            //div[contains(@class, 'RadioButtonUnselected')]    


radio button with state management
    go to                                ${STORYBOOK_URL}/iframe.html?id=coreradiobutton--radiobuttonstate
    Wait Until Element Is Enabled        (${input})[1]    10s
    Element Attribute Value Should Be    (${input})[1]    checked    true       
    Element Attribute Value Should Be    (${input})[2]    checked    ${None}
    Click Element                        (${input})[2]    
    Element Attribute Value Should Be    (${input})[1]    checked    ${None}    
    Element Attribute Value Should Be    (${input})[2]    checked    true
