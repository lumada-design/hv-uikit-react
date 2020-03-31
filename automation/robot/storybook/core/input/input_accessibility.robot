*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=coreinput--


*** Test Cases ***
storybook sample InputCustomValidation against standard      ${url}inputcustomvalidation
storybook sample InputInitialState against standard          ${url}inputinitialstate
storybook sample InputLeftIcon against standard              ${url}inputlefticon
storybook sample InputNoValidation against standard          ${url}inputnovalidation
storybook sample InputSimpleWithIconInfo against standard    ${url}inputsimplewithiconinfo
storybook sample InputCustomProps against standard           ${url}inputcustomprops
storybook sample InputDefaultValue against standard          ${url}inputdefaultvalue
storybook sample InputEmail against standard                 ${url}inputemail
storybook sample InputEvents against standard                ${url}inputevents
storybook sample InputMax against standard                   ${url}inputmax
storybook sample InputMaxNumeric against standard            ${url}inputmaxnumeric
storybook sample InputPassword against standard              ${url}inputpassword
storybook sample InputRequiredMaxNumeric against standard    ${url}inputrequiredmaxnumeric
storybook sample InputSimple against standard                ${url}inputsimple
storybook sample InputSuggestions against standard           ${url}inputsuggestions
storybook sample InputUncontrolledValue against standard     ${url}inputuncontrolledvalue
