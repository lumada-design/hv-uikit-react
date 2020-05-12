*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=components-avatar--


*** Test Cases ***
storybook sample assortedavatars against standard      ${url}main
storybook sample imageavatars against standard      ${url}imageavatars
storybook sample letteravatars against standard    ${url}letteravatars
storybook sample iconsavatars against standard    ${url}iconsavatars
storybook sample fallbacks against standard    ${url}fallbacks
storybook sample buttons against standard    ${url}buttons
storybook sample sizes against standard    ${url}sizes
