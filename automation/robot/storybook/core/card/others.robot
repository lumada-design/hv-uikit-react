*** Setting ***
Resource      _card.resource
Test Setup    open card sample    ${components}    all-components


*** Test Cases ***
controlled card selection by switch
  [Setup]    open card sample    ${tests}    controlled
  Checkbox Should Not Be Selected    ${checkbox}
  click Element                      ${externalCheckbox}
  Checkbox Should Be Selected        ${checkbox}

activates option included on drop down
    Click Element                    ${dropMenu}
    Wait Until Element Is Enabled    ${optionDelete}
    Click Element                    ${optionDelete}
    Alert Should Be Present          You have pressed Delete

does not activates disabled option on drop down
    Click Element                    ${dropMenu}
    Wait Until Element Is Visible    ${optionPreview}
    click Element                    ${optionPreview}
    Alert Should Not Be Present


*** Variables ***
${externalCheckbox}    css:#controller
${optionPreview}       css:li \[name=Preview]
${optionDelete}        css:li \[name=Delete]
