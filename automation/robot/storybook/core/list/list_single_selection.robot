*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Default Tags      smoke
Documentation     just for lists with single selection

*** Test Cases ***
list item change background with mouse hover
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--single-selection
    Wait Until Element Is Visible          ${list}             10s
    verify element background-color change on mouse over    ${item1}
    verify element background-color change on mouse over    ${item2}

remove a single selection
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--single-selection
    Wait Until Element Is Visible          ${list}             10s
    Element Attribute Value Should Be      ${item3}            aria-selected    true
    Click Element                          ${item3}
    Element Attribute Value Should Be      ${item3}            aria-selected    ${None}
    Page Should Not Contain Element        ${selectedItems}

single selected other item
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--single-selection
    Wait Until Element Is Visible          ${list}             10s
    Element Attribute Value Should Be      ${item3}            aria-selected    true
    Element Attribute Value Should Be      ${item2}            aria-selected    ${None}
    Click Element                          ${item2}
    Element Attribute Value Should Be      ${item3}            aria-selected    ${None}
    Element Attribute Value Should Be      ${item2}            aria-selected    true

unable to select disabled item
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--single-selection
    Wait Until Element Is Visible          ${list}             10s
    Element Attribute Value Should Be      ${item4}            aria-selected    ${None}
    Run Keyword And Continue On Failure    Click Element       ${item4}
    Element Attribute Value Should Be      ${item4}            aria-selected    ${None}

truncate with ... on a long label string
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--single-selection
    Wait Until Element Is Visible          ${list}             10s
    verify css element property value      ${item5}            text-overflow    clip

list not selectable
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--list-notselectable
    Wait Until Element Is Visible          ${menu}             10s
    Click Element    ${item1}
    Element Attribute Value Should Be      ${item1}            aria-selected    ${None}
    Click Element    ${item5}
    Element Attribute Value Should Be      ${item5}            aria-selected    ${None}

menu items have correct item attributed
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--list-notselectable
    Wait Until Element Is Visible          ${menu}             10s
    Click Element    ${item1}
    Element Attribute Value Should Be      ${item1}            role    menuitem
    Click Element    ${item5}
    Element Attribute Value Should Be      ${item5}            role    menuitem
