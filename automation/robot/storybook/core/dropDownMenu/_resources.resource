*** Setting ***
Resource     ../../_resources/storybook_keywords.robot
Variables    ../../_resources/storybook_variables.yaml


*** Variables ***
${dropDownMenu}             css:button[class*='HvDropDownMenu']
${droppedMenu}              css:ul[role='menu']
${item1}                    css:li[id*='item-0']
${item2}                    css:li[id*='item-1']
${item3}                    css:li[id*='item-2']
${menuList}                 css:div[class=HvDropDownMenu-menuList]
${sampledDisabledItems}     iframe.html?id=components-dropdown-menu--disabled-items
${sampleDisabled}           iframe.html?id=components-dropdown-menu--disabled
${sampleKeepOpenedFalse}    iframe.html?id=components-dropdown-menu--controlled
${sampleKeyboard}           iframe.html?id=components-dropdown-menu--keyboard-navigation
