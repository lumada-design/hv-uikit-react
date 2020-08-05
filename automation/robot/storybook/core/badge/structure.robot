*** Setting ***
Resource    ../_keywords.resource
Force Tags  v3

*** Test Cases ***
badge maxCount is 99
    Go To                       ${patterns}badge--main
    Wait Until Page Contains    99+

all badges renders a text
    go to                       ${patterns}badge--with-text
    Wait Until Page Contains    Events
