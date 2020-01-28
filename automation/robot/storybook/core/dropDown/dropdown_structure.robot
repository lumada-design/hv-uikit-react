*** Setting ***
Resource                              ../../_resources/storybook_keywords.robot
Library                               SeleniumLibrary
Variables                             ../../_resources/storybook_variables.yaml
Variables                             variables.yaml
Suite Setup                           open storybook
Suite Teardown                        Close Browser
Force Tags                            smoke

*** Test Cases ***
when it is just possible single selection
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown7
    Wait Until Element Is Enabled        dropdown7-header                 10s
    Click Element                        dropdown7-header
    Wait Until Element Is Visible        css:ul[role='listbox']           2s
    Element Text Should Be               css:li[aria-selected='true']     value 1
    Click Element                        //li/p[text()='value 2']
    Click Element                        dropdown7-header
    Element Text Should Be               css:li[aria-selected='true']     value 2

Disable drop down list
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown9
    Wait Until Element Is Visible        css:div[id='dropdown9-header'],[class|='selectionDisabled']    10s

no data and no label
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown1
    Wait Until Element Is Enabled        dropdown1-header                 10s
    Click Element                        dropdown1-header
    Page Should Not Contain Element      css:li[role='option']

multi selection - unselect selected values
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown5
    Wait Until Element Is Enabled        dropdown5-header                 10s
    Click Element                        dropdown5-header
    Wait Until Element Is Visible        css:ul[role='listbox']           2s
    Page Should Contain Element          css:li[aria-selected='true']     limit=1
    Click Element                        css:li[aria-selected='true']
    Page Should Not Contain Element      css:li[aria-selected='true']
    Click Button                         Apply
    Click Element                        dropdown5-header
    Page Should Not Contain Element      css:li[aria-selected='true']

multi selection - select all and cancel clicking out
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown4
    Wait Until Element Is Enabled        dropdown4-header                 10s
    Click Element                        dropdown4-header
    Page Should Contain Element          css:li[aria-selected='true']     limit=1
    Click Element                        css:div[class|='List-selectAllContainer']
    Click Element                        css:div[class|='List-selectAllContainer']
    Page Should Contain Element          css:li[aria-selected='true']     limit=4
    Click Element                        css:body
    Click Element                        dropdown4-header
    Page Should Contain Element          css:li[aria-selected='true']     limit=1

multi selection - cancel selection
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown4
    Wait Until Element Is Enabled        dropdown4-header                 10s
    Click Element                        dropdown4-header
    Page Should Contain Element          css:li[aria-selected='true']     limit=1
    Click Element                        css:div[class|='List-selectAllContainer']
    Click Element                        css:div[class|='List-selectAllContainer']
    Page Should Contain Element          css:li[aria-selected='true']     limit=4
    Click Button                         Cancel
    Click Element                        dropdown4-header
    Page Should Contain Element          css:li[aria-selected='true']     limit=1

multi selection - select all
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown4
    Wait Until Element Is Enabled        dropdown4-header                 10s
    Click Element                        dropdown4-header
    Page Should Contain Element          css:li[aria-selected='true']     limit=1
    Click Element                        css:div[class|='List-selectAllContainer']
    Click Element                        css:div[class|='List-selectAllContainer']
    Page Should Contain Element          css:li[aria-selected='true']     limit=4
    Click Button                         Apply
    Click Element                        dropdown4-header
    Page Should Contain Element          css:li[aria-selected='true']     limit=4

multi selection - deselect all
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown4
    Wait Until Element Is Enabled        dropdown4-header                 10s
    Click Element                        dropdown4-header
    Page Should Contain Element          css:li[aria-selected='true']     limit=1
    Click Element                        css:div[class|='List-selectAllContainer']
    Page Should not Contain Element      css:li[aria-selected='true']
    Click Button                         Apply
    Click Element                        dropdown4-header
    Page Should not Contain Element      css:li[aria-selected='true']

multi selection - indeterminate
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown4
    Wait Until Element Is Enabled        dropdown4-header                 10s
    Click Element                        dropdown4-header
    Element Should Be Enabled            //*[contains(@class,'MuiCheckbox-indeterminate')]

verify search results
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown6
    Wait Until Element Is Enabled        dropdown6-header                 10s
    Element Text Should Be               dropdown6-header                 value 2
    Click Element                        dropdown6-header
    Wait Until Element Is Enabled        css:input[type='text']           2s
    Input Text                           css:input[type='text']           3
    Page Should Contain Element          css:li[role='option']            limit=1
    Click Element                        css:li[role='option']
    Element Text Should Be               dropdown6-header                 value 3

clean search value after selection
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown6
    Wait Until Element Is Enabled        dropdown6-header                 10s
    Element Text Should Be               dropdown6-header                 value 2
    Click Element                        dropdown6-header
    Wait Until Element Is Enabled        css:input[type='text']           2s
    Input Text                           css:input[type='text']           3
    Page Should Contain Element          css:li[role='option']            limit=1
    Click Element                        css:li[role='option']
    Element Text Should Be               dropdown6-header                 value 3
    Click Element                        dropdown6-header
    Page Should Contain Element          css:li[role='option']            limit=4

close dropdown and save selection when select an item on simple dropdown
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown7
    Wait Until Element Is Enabled        ${dropdown}                      10s
    Click Element                        ${dropdown}
    Wait Until Element Is Visible        ${dropedDiv}                     2s
    Click Element                        ${item4}
    Wait Until Element Is Not Visible    ${dropedDiv}                     2s
    Element Text Should Be               ${dropdown}>p                    value 4
    