*** Setting ***
Resource           ../../_resources/storybook_keywords.robot
Library            SeleniumLibrary
Variables          ../../_resources/storybook_variables.yaml
Variables          variables.yaml
Suite Setup        open storybook
Test Setup         go to url and wait until element is visible    ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown4    ${dropdown}    10s
Suite Teardown     Close Browser
Force Tags         smoke


*** Comments ***
theses list did not compatible with list selenium keywords


*** Test Cases ***
unselect all values when is unselected all options one by one
    Click Element                        ${dropdown}
    Element Attribute Value Should Be    ${option2}          aria-selected    true
    Click Element                        ${option2}
    Page Should Not Contain Element      ${aria-selected}
    Click Button                         Apply
    Click Element                        ${dropdown}
    Page Should Not Contain Element      ${aria-selected}

select all options when checked all option
    Click Element                    ${dropdown}
    Page Should Contain Element      ${aria-selected}    limit=1
    Click Element                    ${selectAll}
    Click Element                    ${selectAll}
    Page Should Contain Element      ${aria-selected}    limit=4
    Click Button                     Apply
    Click Element                    ${dropdown}
    Page Should Contain Element      ${aria-selected}    limit=4

unselect all options when unchecked all option
    Click Element                      ${dropdown}
    Page Should Contain Element        ${aria-selected}    limit=1
    Click Element                      ${selectAll}
    Page Should not Contain Element    ${aria-selected}
    Click Button                       Apply
    Click Element                      ${dropdown}
    Page Should not Contain Element    ${aria-selected}

show indeterminate state when just some options are checked
    Click Element                        ${dropdown}
    Element Attribute Value Should Be    ${selectAll}    data-indeterminate    true

cancel selection when is clicked out of dropdown area
    Click Element                    ${dropdown}
    Page Should Contain Element      ${aria-selected}    limit=1
    Click Element                    ${selectAll}
    Click Element                    ${selectAll}
    Page Should Contain Element      ${aria-selected}    limit=4
    Click Element                    css:body
    Click Element                    ${dropdown}
    Page Should Contain Element      ${aria-selected}    limit=1

cancel selection when activated cancel button
    Click Element                    ${dropdown}
    Page Should Contain Element      ${aria-selected}    limit=1
    Click Element                    ${selectAll}
    Click Element                    ${selectAll}
    Page Should Contain Element      ${aria-selected}    limit=4
    Click Button                     Cancel
    Click Element                    ${dropdown}
    Page Should Contain Element      ${aria-selected}    limit=1