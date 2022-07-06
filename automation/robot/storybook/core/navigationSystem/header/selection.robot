*** Setting ***
Resource          _header.resource
Test Setup        open header sample    ${structure}    main
Force Tags        bug-infrastructure-ie
Documentation     Test Cases based on Design System Version 1.2.0


*** Comments ***
note1: keywords for sync will not work (dev implementation keep items always visible and enabled)
The click element fails with error 'other element will receive the click',


*** Test Cases ***
select a item when click on item that has no child items (final item)
    header item should not be selected    ${item4}
    Click Element                         ${item4}
    header item should be selected        ${item4}

select a item and the child item when user click on a child item
    header item should not be selected    ${item1}
    Mouse Over                            ${item1}
    Wait Until Keyword Succeeds           3x    1s
    ...    Click Element                  ${item1.2}    #note1
    header item should be selected        ${item1}
    header item should be selected        ${item1.2}

select a foreign child item when other child item is selected
    Wait Until Element Is Visible     ${header}
    header item should be selected    ${item3}
    header item should be selected    ${item3.2}
    mouse over                        ${item5}
    Wait Until Keyword Succeeds       3x    1s
    ...    Click Element              ${item5.1}    #note1
    Element Text Should Be            ${item5.1}    Model Effectiveness 5-1
    header item should be selected    ${item5.1}
    header item should be selected    ${item5}

select other child item of same item when a child item is selected
    header item should be selected        ${item3}
    Mouse Over                            ${item3}
    header item should be selected        ${item3.2}
    Wait Until Keyword Succeeds           3x    1s
    ...    Click Element                  ${item3.1}
    header item should be selected        ${item3}
    header item should be selected        ${item3.1}
    header item should not be selected    ${item3.2}

select an item when click on an item that has child items (not final item)
    header item should not be selected    ${item1}
    Click Element                         ${item1}
    header item should be selected        ${item1}

does not select an item when mouse hover item or child item
    header item should be selected        ${item3}
    header item should be selected        ${item3.2}
    mouse over                            ${item5}
    header item should not be selected    ${item5}
    mouse over                            ${item4}
    header item should not be selected    ${item4}
    header item should be selected        ${item3}
    header item should be selected        ${item3.2}

unselect an item when click on other item
    header item should be selected        ${item3}
    header item should be selected        ${item3.2}
    mouse over                            ${item5}
    Wait Until Keyword Succeeds           3x    1s
    ...    Click Element                  ${item5.1}    #note1
    header item should be selected        ${item5}
    header item should not be selected    ${item3}
    header item should not be selected    ${item3.2}
