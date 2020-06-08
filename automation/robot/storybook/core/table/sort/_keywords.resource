*** Setting ***
Resource    ../table.resource


*** variables ***
${column}             css:[id*=priority][role=cell]
${header}             css:[id*=priority][role=columnheader]
${js_block_1}         return Array.from(document.querySelectorAll("
${js_block_2}         ")).map(function(el){return el.innerText.trim();})
${severity column}    css:[id*=severity][role=cell]
${severity header}    css:[id*=severity][role=columnheader]

*** Keywords ***
column should be sorted by ascending
    [Arguments]    ${csslocator}
    ${csslocator}=     Replace String     ${csslocator}    css:    ${EMPTY}
    ${ascending}       Execute Javascript   ${js_block_1}${csslocator}${js_block_2}.sort();
    ${actual}          Execute Javascript   ${js_block_1}${csslocator}${js_block_2};
    Should Be Equal    ${actual}  ${ascending}

column should be sorted by descending
    [Arguments]    ${csslocator}
    ${csslocator}=     Replace String        ${csslocator}    css:    ${EMPTY}
    ${descending}      Execute Javascript    ${js_block_1}${csslocator}${js_block_2}.sort().reverse();
    ${actual}          Execute Javascript    ${js_block_1}${csslocator}${js_block_2};
    Should Be Equal    ${actual}  ${descending}

get column values
    [Arguments]    ${csslocator}
    ${csslocator}=    Replace String    ${csslocator}    css:    ${EMPTY}
    ${values}         Execute Javascript    ${js_block_1}${csslocator}${js_block_2};
    [Return]          ${values}
