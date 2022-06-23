*** Setting ***
Resource      _tabs.resource
Test Setup    open tabs sample    ${navigation}    main

*** Test Cases ***
New Element of the tabs can be selected when using CLICK
    Element Attribute Value Should Be   ${tab}(1)    aria-selected  true
    Element Attribute Value Should Be   ${tab}(2)    aria-selected  false
    Click Button                        ${tab}(2)
    Element Attribute Value Should Be   ${tab}(1)    aria-selected  false
    Element Attribute Value Should Be   ${tab}(2)    aria-selected  true

Selection does not change when using Click on a selected element
    Element Attribute Value Should Be   ${tab}(1)    aria-selected  true
    Element Attribute Value Should Be   ${tab}(2)    aria-selected  false
    Element Attribute Value Should Be   ${tab}(3)    aria-selected  false
    Click Button                        ${tab}(1)
    Element Attribute Value Should Be   ${tab}(1)    aria-selected  true
    Element Attribute Value Should Be   ${tab}(2)    aria-selected  false
    Element Attribute Value Should Be   ${tab}(3)    aria-selected  false

Selection does not change when using Click on a disabled element
    [Setup]    open tabs sample    ${navigation}    text-size
    Wait Until Element Is Enabled       ${tabs}
    Element Attribute Value Should Be   ${tab}(2)    disabled       true
    Element Attribute Value Should Be   ${tab}(1)    aria-selected  true
    Element Attribute Value Should Be   ${tab}(2)    aria-selected  false
    Click Button                        ${tab}(2)
    Element Attribute Value Should Be   ${tab}(1)    aria-selected  true
    Element Attribute Value Should Be   ${tab}(2)    aria-selected  false

New Element of the tabs can be selected when using CLICK and tab content is updated
    [Setup]    open tabs sample    ${navigation}    content-changing
    Element Should Be Visible           container1
    Element Should Not Be Visible       container2
    Click Button                        ${tab}(2)
    Element Should Not Be Visible       container1
    Element Should Be Visible           container2

First element of tab is selected when opening the sample
    Element Attribute Value Should Be    ${tab}(1)        aria-selected  true
    Element Attribute Value Should Be    ${tab}(2)        aria-selected  false
