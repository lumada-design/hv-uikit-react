*** Setting ***
Resource         ../../_resources/accessibility.robot
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Test Cases ***
as sorted avatars    ${components}avatar--main
image avatars        ${components}avatar--image-avatars
letter avatars       ${components}avatar--letter-avatars
icons avatars        ${components}avatar--icon-avatars
fallbacks            ${components}avatar--fallbacks
buttons              ${components}avatar--buttons
sizes                ${components}avatar--sizes
