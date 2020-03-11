*** Setting ***
Resource                              ../../_resources/storybook_keywords.robot
Library                               SeleniumLibrary
Variables                             ../../_resources/storybook_variables.yaml
Variables                             variables.yaml
Suite Setup                           open storybook
Suite Teardown                        Close Browser
Force Tags                            smoke


*** Comments ***
theses list did not compatible with list selenium keywords


*** Test Cases ***
close dropdown and save selection when select an item on simple dropdown
    [Tags]    TTT
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown7
    Wait Until Element Is Enabled        ${dropdown}      10s
    Element Text Should Be               ${dropdown} p    Select...
    Click Element                        ${dropdown}
    Click Element                        ${option4}
    Element Text Should Be               ${dropdown} p    value 4

change selection and keep single selection when activated other value on single selection dropdown
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown6
    Wait Until Element Is Enabled        ${dropdown}         10s
    Element Text Should Be               ${dropdown} p       value 2
    Click Element                        ${dropdown}
    Element Attribute Value Should Be    ${option2}          aria-selected    true
    Click Element                        ${option3}
    Element Text Should Be               ${dropdown} p       value 3
    Click Element                        ${dropdown}
    Page Should Contain Element          ${aria-selected}    limit=1
    Element Attribute Value Should Be    ${option3}          aria-selected    true

filter search results and enable selection when user input search values
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown6
    Wait Until Element Is Enabled    ${dropdown}       10s
    Element Text Should Be           ${dropdown}       value 2
    Click Element                    ${dropdown}
    Input Text                       ${searchInput}    3
    Page Should Contain Element      ${options}        limit=1
    Click Element                    ${option1}
    Element Text Should Be           ${dropdown}       value 3

clean searched values when previous was done a search 
   Go To                            ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown6
    Wait Until Element Is Enabled    ${dropdown}       10s
    Element Text Should Be           ${dropdown}       value 2
    Click Element                    ${dropdown}
    Input Text                       ${searchInput}    3
    Click Element                    ${option1}
    Element Text Should Be           ${dropdown}       value 3
    Click Element                    ${dropdown}
    Page Should Contain Element      ${options}        limit=4
        
unable to activate a dropdown disabled when it is clicked
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown9
    Wait Until Element Is Visible    ${dropdown}      10s
    Run Keyword And Ignore Error     Click Element    locator
    
show an empty dropdown when is activated
    Go To                              ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown1
    Wait Until Element Is Enabled      ${dropdown}    10s
    Click Element                      ${dropdown}
    Page Should Not Contain Element    ${options}

    