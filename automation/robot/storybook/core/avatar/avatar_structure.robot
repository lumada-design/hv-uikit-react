*** Setting ***
Resource       ../_keywords.resource
Suite Setup    Run Keywords
...            open browser webdriver    ${components}avatar--fallbacks    AND
...            Wait Until Element Is Visible    ${fallbackToDefaultUserIcon}



*** Variables ***
${fallbackToChildren}           id:fallback_to_children
${fallbackToAlt}                id:falback_to_alt
${fallbackToDefaultUserIcon}    css:#fallback_to_default_icon>div[class*="HvIconUser-root"]


*** Test Cases ***
when image loading fails display component children if available
    Element Should Be Visible    ${fallbackToDefaultUserIcon}

when image loading fails and there is no children display the alt text first letter if available
    Element Text Should Be    ${fallbackToAlt}    C

when image loading fails and there is no children nor alt text display the the default user icon
    Element Text Should Be    ${fallbackToChildren}    CS
