*** Setting ***
Variables         variables.yaml
Resource          ../../_resources/keywords.resource
Suite Setup       open storybook
Suite Teardown    Close Browser
Test Setup        wait until template is opened
Force Tags        smoke
Documentation     Test Cases based on: Design System Version 1.2.0


*** Test Cases ***
change vertical items when select other horizontal item
    Click Element                  ${verticalBurger}
    Element Text Should Be         ${verticalItems}    ${itemsList}
    Click Element                  ${horizontalItem3}
    Wait Until Element Contains    ${verticalItems}    Model Effectiveness    timeout=5s

does not show vertical bar when horizontal item does not have child
    Click Element                        ${horizontalItem4}
    Wait Until Element Is Not Visible    ${verticalBurger}
    Element Should Not Be Visible        ${verticalAnchorBar}


***Variables ***
${itemsList}     SCPodF\nCompute\nStorage\nEthernet\nFiber Channel


*** Keywords ***
wait until template is opened
    Go To                            ${STORYBOOK_URL}/iframe.html?id=template--navigationsystem
    Wait Until Element Is Visible    ${horizontalItems}
