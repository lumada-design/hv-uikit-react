*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke

*** Test Cases ***
select an option
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coredropdownmenu--dropdownmenu1
    Wait Until Element Is Enabled    css:div[role='button']    10s
    Click Element                    css:div[role='button']
    Element Should Be Visible        css:ul[role='listbox']
    Element Text Should Be           css:ul[role='listbox']    Label 1\nLabel 2\nLabel 3
