*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke

*** Test Cases ***
navigate between levels
    Go To                               ${STORYBOOK_URL}/iframe.html?id=coreverticalnavigation--verticalnavigation4
    Wait Until Element Is Enabled       css:ul[role='listbox']               7s
    Click Element                       //li[contains(.,'Advanced server DS530')]
    Wait Until Element Is Enabled       //li[contains(.,'Variant X-333')]    2s
    Click Element                       //li[contains(.,'Variant X-333')]
    Wait Until Page Contains Element    //div[contains(@class,'Title-titleContainer') and contains(.,'Variant X-333')]    2s
    Wait Until Keyword Succeeds         3    1s    Element Text Should Be    (//ul[@role='listbox']/li)[1]    Component KY-121
    Element Text Should Be              (//ul[@role='listbox']/li)[2]        Component HS-921
    Click Element                       //div[contains(@class,'Title-titleContainer') and contains(.,'Variant X-333')]
    Wait Until Page Contains Element    //div[contains(@class,'Title-titleContainer') and contains(.,'Advanced server DS530')]    2s
    Wait Until Keyword Succeeds         3    1s    Element Text Should Be    css:ul[role='listbox']>li    Variant X-333
    Element Text Should Be              (//ul[@role='listbox']/li)[2]        Variant X-335
    Click Element                       //div[contains(@class,'Title-titleContainer') and contains(.,'Advanced server DS530')]
    Wait Until Keyword Succeeds         3    1s    Page Should Contain Element    (//ul[@role='listbox'])[1]/li    limit=4

search on first level
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coreverticalnavigation--verticalnavigation4
    Wait Until Element Is Enabled    css:ul[role='listbox']             7s
    Click Element                    //li[contains(.,'Advanced server DS530')]
    Input Text                       css:input[placeholder='Search']    335
    Wait Until Keyword Succeeds      2    1    Element Text Should Be    css:ul[role='listbox']>li    Variant X-335

search on 2nd level
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coreverticalnavigation--verticalnavigation4
    Wait Until Element Is Enabled    css:ul[role='listbox']               7s
    Click Element                    //li[contains(.,'Advanced server DS530')]
    Wait Until Element Is Enabled    //li[contains(.,'Variant X-333')]    2s
    Click Element                    //li[contains(.,'Variant X-333')]
    Input Text                       css:input[placeholder='Search']      921
    Wait Until Keyword Succeeds      2    1    Element Text Should Be    css:ul[role='listbox']>li    Component HS-921

select action values settings Profile Help
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coreverticalnavigation--verticalnavigation4
    Wait Until Element Is Enabled    (//ul[@role='listbox'])[2]    7s
    Element Text Should Be           (//ul[@role='listbox'])[2]    Profile\nSettings\nHelp
