*** Setting ***
Resource    _toggleButton.resource


*** Test Cases ***
state transition
    [Documentation]   change state when toggle button is clicked
    [Setup]    open toggle button sample    main
    toggle button should be selected         ${button}(1)    FavoriteSelected
    Click Element                            ${button}(1)
    toggle button should not be selected     ${button}(1)    Favorite
    Click Element                            ${button}(1)
    toggle button should be selected         ${button}(1)    FavoriteSelected

show label tooltip when mouse hover toggle button
    [Tags]    bug-ie-webdriver
    [Setup]    open toggle button sample    main
    Mouse Over                  ${button}(1)
    Wait Until Page Contains    Unmark as favorite
    Click Element               ${button}(1)
    Mouse Over                  css:body
    Mouse Over                  ${button}(1)
    Wait Until Page Contains    Mark as favorite

controlled toggle button
    [Setup]    go to    ${tests}toggle-button--controlled
    Wait Until Element Is Visible           ${buttons}
    toggle button should not be selected    ${buttons}    Unlock
    Click Button                            Close lock
    toggle button should be selected        ${buttons}    Lock
    Click Button                            Open lock
    toggle button should not be selected    ${buttons}    Unlock
    click Element                           ${buttons}
    toggle button should be selected        ${buttons}    Lock

impossible change toggle button when is disabled
    [Setup]    open toggle button sample    disabled
    toggle button should not be selected    ${button}(1)    LightOff
    Click Element                           ${button}(1)
    toggle button should not be selected    ${button}(1)    LightOff

show label tooltip when mouse hover disabled toggle button
    [Tags]    bug-ie-webdriver    bug-firefox-webdriver
    [Setup]    open toggle button sample    disabled
    Mouse Over                  ${button}(1)
    Wait Until Page Contains    Turn on light
    Mouse Over                  css:body
    Mouse Over                  ${button}(1)
    Wait Until Page Contains    Turn on light


*** Comments ***
1 - bug-ie-webdriver, documentation explicit it as a current issue unresolved (hovering over
    Elements) although we experience with sucess running it on local machine.
    https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver#hovering-over-elements

2 - react event handler does not trust when actions "mouse hover are repeated, using Firefox or IE
    similar: https://github.com/SeleniumHQ/selenium/issues/6741
