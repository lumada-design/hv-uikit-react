*** Setting ***
Resource          ../_keywords.resource


*** Variables ***
${aria-selected}                  css:[aria-selected=true]
${buttonApply}                    css:button[id*=apply]
${buttonCancel}                   css:button[id*=cancel]
${dropdown}                       css:[role=combobox]
${dropdownHeader}                 css:div[id*=dropdown][id*=header]
${iframeDisable}                  ${patterns}dropdown--disabled
${iframeEmpty}                    ${patterns}dropdown--empty
${iframeSingleSelection}          ${patterns}dropdown--single-selection
${iframeSingleSelectionSearch}    ${patterns}dropdown--single-selection-with-search
${listBox}                        css:ul[role='listbox']
${option1}                        css:ul[role=listbox]>li:nth-child(1)
${option2}                        css:ul[role=listbox]>li:nth-child(2)
${option3}                        css:ul[role=listbox]>li:nth-child(3)
${option4}                        css:ul[role=listbox]>li:nth-child(4)
${options}                        css:ul[role=listbox]>li
${searchInput}                    css:input[id$='search-input']
${selectAll}                      css:input[id*='select-all']
