*** Setting ***
Resource    ../_keywords.resource

*** Test Cases ***
badge maxCount is 99
    Go To                       ${components}badge--main
    Wait Until Page Contains    99+

all badges renders a text
    go to                       ${components}badge--with-text
    Wait Until Page Contains    Events
