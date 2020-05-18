*** Setting ***
Library           SeleniumLibrary
Resource          ../../_resources/storybook_keywords.robot
Variables         ../../_resources/storybook_variables.yaml


*** Variables ***
${aria-selected}                  css:[aria-selected=true]
${buttonApply}                    css:button[id*=apply]
${buttonCancel}                   css:button[id*=cancel]
${dropdown}                       css:[role=combobox]
${dropdownHeader}                 css:div[id*=dropdown][id*=header]
${iframeDisable}                  ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown10
${iframeEmpty}                    ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown1
${iframeMultiSelection}           ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown6
${iframeMultiSelectionSearch}     ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown5
${iframeSingleSelection}          ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown8
${iframeSingleSelectionSearch}    ${STORYBOOK_URL}/iframe.html?id=coredropdown--dropdown7
${listBox}                        css:ul[role='listbox']
${option1}                        css:ul[role=listbox]>li:nth-child(1)
${option2}                        css:ul[role=listbox]>li:nth-child(2)
${option3}                        css:ul[role=listbox]>li:nth-child(3)
${option4}                        css:ul[role=listbox]>li:nth-child(4)
${options}                        css:ul[role=listbox]>li
${searchInput}                    css:input[id$='search-input']
${selectAll}                      css:input[id*='select-all']