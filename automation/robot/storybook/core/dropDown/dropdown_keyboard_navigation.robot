*** Setting ***
Resource                                 ../../_resources/storybook_keywords.robot
Library                                  SeleniumLibrary
Variables                                ../../_resources/storybook_variables.yaml
Variables                                variables.yaml
Suite Setup                              open storybook
Suite Teardown                           Close Browser
Force Tags                               smoke


 
*** Test Cases ***
Open dropdown with enter
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown4
    Wait Until Element Is Enabled        ${dropdown}        10s
    Element Should not Be Visible        ${dropedDiv}
    set focus and press keys             ${dropdown}        RETURN
    Wait Until Element Is Visible        ${dropedDiv}       2s

Close dropdown with escape
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown4
    Wait Until Element Is Enabled        ${dropdown}        10s
    Element Should not Be Visible        ${dropedDiv}
    set focus and press keys             ${dropdown}        RETURN
    Wait Until Element Is Visible        ${dropedDiv}       2s
    Press Keys                           None               ESCAPE
    Wait Until Element Is not Visible    ${dropedDiv}       2s

Open dropdown with enter after escape
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown4
    Wait Until Element Is Enabled        ${dropdown}        10s
    Element Should not Be Visible        ${dropedDiv}
    set focus and press keys             ${dropdown}        RETURN
    Wait Until Element Is Visible        ${dropedDiv}       2s
    Press Keys                           None               ESCAPE
    Wait Until Element Is not Visible    ${dropedDiv}       2s
    Press Keys                           None               RETURN
    Wait Until Element Is Visible        ${dropedDiv}       2s

Cancel dropdown selection with escape
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown4
    Wait Until Element Is Enabled        ${dropdown}        10s
    Click Element                        ${dropdown}
    Element Attribute Value Should Be    ${item1}           aria-selected    ${None}
    Click Element                        ${item1}
    Element Attribute Value Should Be    ${item1}           aria-selected    true
    set focus and press keys             ${dropdown}        ESCAPE
    Click Element                        ${dropdown}
    Element Attribute Value Should Be    ${item1}           aria-selected     ${None}

Focus on input when open dropdown with input
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown4
    Wait Until Element Is Enabled        ${dropdown}        10s
    set focus and press keys             ${dropdown}        RETURN
    wait until element attribute value contain    ${searchInput}     class            focused

Focus on Select All when open dropdown without input
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown5
    Wait Until Element Is Enabled        ${dropdown}        10s
    set focus and press keys             ${dropdown}        RETURN
    wait until element attribute value contain    ${selectAll}       class            focusVisible

Focus on first element when open simple dropdown
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown7
    Wait Until Element Is Enabled        ${dropdown}        10s
    set focus and press keys             ${dropdown}        RETURN
    wait until element attribute value contain    ${item1}           class            focused

Focus on apply button with tab on last item
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown4
    Wait Until Element Is Enabled        ${dropdown}        10s
    Click Element                        ${dropdown}
    Wait Until Element Is Visible        ${item4}           2s
    set focus and press keys             ${item4}           TAB
    wait until element attribute value contain    ${buttonApply}     class            focusVisible

Focus on cancel button with tab on apply button
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown4
    Wait Until Element Is Enabled        ${dropdown}        10s
    Click Element                        ${dropdown}
    Wait Until Element Is Visible        ${item4}           2s
    set focus and press keys             ${buttonApply}     TAB
    wait until element attribute value contain    ${buttonCancel}    class            focusVisible