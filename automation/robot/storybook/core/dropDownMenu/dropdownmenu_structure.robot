*** Setting ***
Variables             ../../_resources/storybook_variables.yaml
Resource              ../../_resources/storybook_keywords.robot
Library               SeleniumLibrary
Suite Setup           open storybook
Suite Teardown        Close Browser
Force Tags            smoke

*** Test Cases ***
select an option
    Go To                                        ${STORYBOOK_URL}/iframe.html?id=coredropdownmenu--dropdownmenu1
    Wait Until Element Is Enabled                //button[@id='dropMenu-icon-button']                               10s
    Click Element                                //button[@id='dropMenu-icon-button']
    Element Should Be Visible                    css:ul[role='menu']
    Element Text Should Be                       css:ul[role='menu']                                                Label 1\nLabel 2\nLabel 3
