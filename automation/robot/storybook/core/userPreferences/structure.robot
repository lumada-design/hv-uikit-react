*** Setting ***
Resource       _userPreferences.resource
Suite Setup    open userPreferences sample    ${widgets}    with-open-control


*** Test Cases ***
close and open with button
    Click Button                         Close
    Wait Until Element Is Not Visible    ${userPreferences}
    Click Button                         Open
    Wait until Element Is Visible        ${userPreferences}

close with outside
    Click Element                        css:body
    Wait Until Element Is Not Visible    ${userPreferences}
    Click Button                         Open
    Wait until Element Is Visible        ${userPreferences}
