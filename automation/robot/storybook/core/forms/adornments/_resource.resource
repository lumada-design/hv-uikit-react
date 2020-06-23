*** Setting ***
Resource    ../../_keywords.resource


*** Variables ***
${adornment_accepted}    css:button [class*=IconSuccess]
${adornment_failed}      css:button [class*=IconFail]
${clean_button}          css:button [class*=IconClose]
${input}                 id:controlled-input
${label}                 id:controlled-input-label
${components}            ${STORYBOOK_URL}iframe.html?id=components-