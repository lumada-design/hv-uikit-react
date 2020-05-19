*** Setting ***
Library           SeleniumLibrary
Resource          _resources.resource
Suite Setup       open storybook
Test Setup        Run Keywords
...               Go To    ${iframeSingleSelectionSearch}    AND
...               Wait Until Element Is Enabled    ${dropdown}    10s
Suite Teardown    Close Browser
Force Tags        smoke


*** Comments ***
theses list did not compatible with list selenium keywords


*** Test Cases ***
Open and close dropdown when click the input (top part of the dropdown)
    Click Element                        ${dropdownHeader}
    Wait Until Element Is Visible        ${listBox}    3s
    Click Element                        ${dropdownHeader}
    Wait Until Element Is Not Visible    ${listBox}    3s

close dropdown and save selection when select an item on simple dropdown
    Element Text Should Be               ${dropdown} p    value 2
    Click Element                        ${dropdown}
    Click Element                        ${option4}
    Element Text Should Be               ${dropdown} p    value 4

change selection and keep single selection when activated other value on single selection dropdown
    Element Text Should Be               ${dropdown} p       value 2
    Click Element                        ${dropdown}
    Element Attribute Value Should Be    ${option2}          aria-selected    true
    Click Element                        ${option3}
    Element Text Should Be               ${dropdown} p       value 3
    Click Element                        ${dropdown}
    Page Should Contain Element          ${aria-selected}    limit=1
    Element Attribute Value Should Be    ${option3}          aria-selected    true

filter search results and enable selection when user input search values
    Element Text Should Be           ${dropdown}       value 2
    Click Element                    ${dropdown}
    Input Text                       ${searchInput}    3
    Page Should Contain Element      ${options}        limit=1
    Click Element                    ${option1}
    Element Text Should Be           ${dropdown}       value 3

clean searched values when previous was done a search
    Element Text Should Be           ${dropdown}       value 2
    Click Element                    ${dropdown}
    Input Text                       ${searchInput}    3
    Click Element                    ${option1}
    Element Text Should Be           ${dropdown}       value 3
    Click Element                    ${dropdown}
    Page Should Contain Element      ${options}        limit=4

show an empty dropdown when is activated
    [Setup]    NONE
    Go To                              ${iframeEmpty}
    Wait Until Element Is Enabled      ${dropdown}    10s
    Click Element                      ${dropdown}
    Page Should Not Contain Element    ${options}
