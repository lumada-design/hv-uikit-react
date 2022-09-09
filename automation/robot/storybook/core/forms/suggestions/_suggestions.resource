*** Settings ***
Resource      ../../_keywords.resource


*** keywords ***
open suggestion sample
    [Arguments]    ${sample}
    go to                            ${guides}forms-form-element-blocks-suggestions--${sample}
    Wait Until Element Is Enabled    ${input}


*** Variables ***
${input}                  css:input[type=text]
${label}                  id:countries
${suggestion_list}        css:ul[role=listbox]
${suggestion_options}     css:ul[role=listbox]>li
${suggestion_Portugal}    xpath://li[.='Portugal']
