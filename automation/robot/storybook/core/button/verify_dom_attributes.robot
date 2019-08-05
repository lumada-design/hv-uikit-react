*** Setting ***
Library           SeleniumLibrary
Resource          _resources/button_keywords.robot
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Template     verify button attribute value
Default Tags      smoke

*** Keywords ***
verify button attribute value
    [Arguments]    ${button_locator}    ${atribute}    ${value}
    ${got_value}      Get Element Attribute    ${button_locator}    ${atribute}
    Should Contain    ${got_value}             ${value}             error message: the button attribute ${atribute} have wrong the value ${got_value}

*** Test Cases ***                                                                         button              atribute   value
verify on default button the type attribute contains button                                default             type       button
verify on default button the class attribute is HvButton-primary                           default             class      HvButton-primary
verify on secondary button the class attribute is HvButton-secondary                       secondary           class      HvButton-secondary
verify on ghost button the class attribute contains HvButton-ghost                         ghost               class      HvButton-ghost
verify on ghost secondary button the class attribute contains HvButton-ghostSecondary      ghostSecondary      class      HvButton-ghostSecondary
