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
${iframeDisable}                  ${STORYBOOK_URL}/iframe.html?id=components-dropdown--disabled
${iframeEmpty}                    ${STORYBOOK_URL}/iframe.html?id=components-dropdown--empty
${iframeMultiSelection}           ${STORYBOOK_URL}/iframe.html?id=components-dropdown--multi-selection-no-search
${iframeMultiSelectionSearch}     ${STORYBOOK_URL}/iframe.html?id=components-dropdown--multi-selection
${iframeSingleSelection}          ${STORYBOOK_URL}/iframe.html?id=components-dropdown--single-selection
${iframeSingleSelectionSearch}    ${STORYBOOK_URL}/iframe.html?id=components-dropdown--single-selection-with-search
${listBox}                        css:ul[role='listbox']
${option1}                        css:ul[role=listbox]>li:nth-child(1)
${option2}                        css:ul[role=listbox]>li:nth-child(2)
${option3}                        css:ul[role=listbox]>li:nth-child(3)
${option4}                        css:ul[role=listbox]>li:nth-child(4)
${options}                        css:ul[role=listbox]>li
${searchInput}                    css:input[id$='search-input']
${selectAll}                      css:input[id*='select-all']