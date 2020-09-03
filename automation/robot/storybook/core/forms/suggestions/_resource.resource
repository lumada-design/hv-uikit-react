*** Settings ***
Resource      ../../_keywords.resource

*** Variables ***
${input}                 css:input[type=text]
${label}                 id:countries
${suggestion_list}       css:ul[role=menu]
${suggestion_options}    css:ul[role=menu]>li
${suggestion_Portugal}   xpath://li[.='Portugal']
