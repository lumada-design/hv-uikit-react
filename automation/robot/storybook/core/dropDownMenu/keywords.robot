*** Setting ***
Resource     ../../_resources/storybook_keywords.robot
Library      SeleniumLibrary
Variables    variables.yaml


*** Keywords ***
item should be focused
    [Arguments]                               ${item}
    Element Should Be Focused                 ${item}
    element attribute value should contain    ${item}       class       focused
    Element Attribute Value Should Be         ${item}       tabindex    0

wait until is focused
    [Arguments]                               ${locator}
    Wait Until Keyword Succeeds               5             1s          Element Should Be Focused    ${locator}