*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       Run Keywords
...               open storybook    ${STORYBOOK_URL}/iframe.html?id=corebadge--badgewithicon
...               AND               Wait Until Page Contains    8    10s
Suite Teardown    Close Browser
Force Tags        smoke    


*** Test Cases ***
badge maxCount is 99
    Page Should Contain   99+

all badges renders an icon
    Element Should Be Visible      //*[local-name() = 'svg']
    Page Should Contain Element    //*[local-name() = 'svg']    limit=5

all badges renders a text
    Page Should Contain    88
    
to delete
    Capture Page Screenshot    test.png

