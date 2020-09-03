*** Setting ***
Resource       ../_keywords.resource
Suite Setup    Run Keywords
...            Go To    ${patterns}user-preferences--with-open-control
...            AND               Wait Until Element Is Visible    ${userPreferences}

*** Test Cases ***

close and open with button
    Click Element                       ${button}
    Wait Until Element Is Not Visible   ${userPreferencesContainer}
    Click Element                       ${button}
    Wait until Element Is Visible       ${userPreferencesContainer}

close with outside
    Click Element                       ${outside}
    Wait Until Element Is Not Visible   ${userPreferencesContainer}
    Click Element                       ${button}
    Wait until Element Is Visible       ${userPreferencesContainer}

*** Variables ***
${button}                       id:controller
${outside}                      css:body
${userPreferences}              id:user-preferences-controlled
${userPreferencesContainer}     css:div[class*='contentContainer']
