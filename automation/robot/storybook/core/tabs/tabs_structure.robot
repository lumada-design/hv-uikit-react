*** Setting ***
Resource    ../_keywords.resource


*** Test Cases ***
New Element of the tabs can be selected when using CLICK
    Go To                               ${components}tabs--main
    Wait Until Element Is Enabled       tabs
    Element Attribute Value Should Be   tabs-tab1    aria-selected  true
    Element Attribute Value Should Be   tabs-tab2    aria-selected  false
    Click Button                        tabs-tab2
    Element Attribute Value Should Be   tabs-tab1    aria-selected  false
    Element Attribute Value Should Be   tabs-tab2    aria-selected  true

Selection does not change when using Click on a selected element
    Go To                               ${components}tabs--main
    Wait Until Element Is Enabled       tabs
    Element Attribute Value Should Be   tabs-tab1    aria-selected  true
    Element Attribute Value Should Be   tabs-tab2    aria-selected  false
    Element Attribute Value Should Be   tabs-tab3    aria-selected  false
    Click Button                        tabs-tab1
    Element Attribute Value Should Be   tabs-tab1    aria-selected  true
    Element Attribute Value Should Be   tabs-tab2    aria-selected  false
    Element Attribute Value Should Be   tabs-tab3    aria-selected  false

Selection does not change when using Click on a disabled element
    Go To                               ${components}tabs--text-size
    Wait Until Element Is Enabled       tabs
    Element Attribute Value Should Be   tabs-tab2    disabled       true
    Element Attribute Value Should Be   tabs-tab1    aria-selected  true
    Element Attribute Value Should Be   tabs-tab2    aria-selected  false
    Click Button                        tabs-tab2
    Element Attribute Value Should Be   tabs-tab1    aria-selected  true
    Element Attribute Value Should Be   tabs-tab2    aria-selected  false

New Element of the tabs can be selected when using CLICK and tab content is updated
    Go To                               ${components}tabs--content-changing
    Wait Until Element Is Enabled       tabs
    Element Should Be Visible           container1
    Element Should Not Be Visible       container2
    Click Button                        tabs-tab2
    Element Should Not Be Visible       container1
    Element Should Be Visible           container2

First element of tab is selected when opening the sample
    Go To                                ${components}tabs--main
    Wait Until Element Is Visible        tabs
    Element Attribute Value Should Be    tabs-tab1        aria-selected  true
    Element Attribute Value Should Be    tabs-tab2        aria-selected  false
