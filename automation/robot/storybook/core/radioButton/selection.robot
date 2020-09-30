*** Setting ***
Resource      ../_keywords.resource
Force Tags    v3


*** Variables ***
${1stRadioButton}         id:radio1-input
${2ndRadioButton}         id:radio2-input
${2ndRadioSelected}       css:#radio2 div[name='RadioButtonSelected']
${2ndRadioNotSelected}    css:#radio2 div[name='RadioButtonUnselected']
${2ndRadioButtonLabel}    css:#radio2 label
${3rdRadioButton}         id:radio3-input
${3rdRadioSelected}       css:#radio3 div[name='RadioButtonSelected']
${3rdRadioNotSelected}    css:#radio3 div[name='RadioButtonUnselected']
${4thRadioButton}         id:radio4-input
${4thRadioSelected}       css:#radio4 div[name='RadioButtonSelected']
${4thRadioNotSelected}    css:#radio4 div[name='RadioButtonUnselected']


*** Test Cases ***
select radio button by clicking in input
    go to                               ${tests}radiobutton--with-state
    Wait Until Page Contains Element    ${2ndRadioButton}
    Element Should not Be Visible       ${2ndRadioSelected}
    Element Should Be Visible           ${2ndRadioNotSelected}
    Click Element                       ${2ndRadioButton}
    Element Should Be Visible           ${2ndRadioSelected}
    Element Should not Be Visible       ${2ndRadioNotSelected}

select radio button by clicking in label
    go to                               ${tests}radiobutton--with-state
    Wait Until Page Contains Element    ${2ndRadioButton}
    Element Should not Be Visible       ${2ndRadioSelected}
    Element Should Be Visible           ${2ndRadioNotSelected}
    Click Element                       ${2ndRadioButtonLabel}
    Element Should Be Visible           ${2ndRadioSelected}
    Element Should not Be Visible       ${2ndRadioNotSelected}

unable select radio button when is disabled
    go to                               ${tests}radiobutton--with-state
    Wait Until Page Contains Element    ${4thRadioButton}
    Run Keyword And Ignore Error        Click Element                      ${1stRadioButton}
    Element Should Be Disabled          ${4thRadioButton}
    Element Should Be Visible           ${4thRadioNotSelected}
    Element Should not Be Visible       ${4thRadioSelected}

unable unselect checked radio button when is disabled
    go to                               ${tests}radiobutton--with-state
    Wait Until Page Contains Element    ${3rdRadioButton}
    Run Keyword And Ignore Error        Click Element                      ${1stRadioButton}
    Element Should Be Disabled          ${3rdRadioButton}
    Element Should Be Visible           ${3rdRadioSelected}
    Element Should not Be Visible       ${3rdRadioNotSelected}

radio button with state management
    go to                                ${tests}radiobutton--with-state
    Wait Until Element Is Enabled        ${1stRadioButton}
    Element Attribute Value Should Be    ${1stRadioButton}                  checked    true
    Element Attribute Value Should Be    ${2ndRadioButton}                  checked    ${None}
    Click Element                        ${2ndRadioButton}
    Element Attribute Value Should Be    ${1stRadioButton}                  checked    ${None}
    Element Attribute Value Should Be    ${2ndRadioButton}                  checked    true
