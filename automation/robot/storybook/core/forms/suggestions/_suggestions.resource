*** Settings ***
Resource      ../../_keywords.resource


*** keywords ***
open suggestion sample
    [Arguments]    ${sample}
    go to                            ${forms}form-element-suggestions--${sample}
    Wait Until Element Is Enabled    ${input}


*** Variables ***
${input}                  css:input[type=text]
${label}                  id:countries
${suggestion_list}        css:ul[role=menu]
${suggestion_options}     css:ul[role=menu]>li
${suggestion_Portugal}    xpath://li[.='Portugal']
