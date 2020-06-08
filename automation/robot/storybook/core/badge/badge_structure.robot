*** Setting ***
Resource          ../../_resources/keywords.resource
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke


*** Test Cases ***
badge maxCount is 99
    Go To                       ${components}badge--with-icon
    Wait Until Page Contains    99+

all badges renders a text
    go to                       ${components}badge--with-text
    Wait Until Page Contains    Events
