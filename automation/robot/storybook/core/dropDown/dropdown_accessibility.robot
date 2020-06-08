*** Setting ***
Resource         ../../_resources/accessibility.robot
Force Tags       pa11y


*** Test Cases ***
dropdown disabled
    [Documentation]
    ...    = ATTENTION! =
    ...    contrast *error* is too ignored as "Design System Team" feedback: \n
    ...    https://github.com/pentaho/hv-uikit-react/issues/775#issuecomment-557167364
    pa11y result should be equal as file    ${components}dropdown--disabled
    ...    ${CURDIR}/WCAG2AA_dropdown10.json

dropdown expanded
    pa11y should not find errors    ${components}dropdown--expanded
