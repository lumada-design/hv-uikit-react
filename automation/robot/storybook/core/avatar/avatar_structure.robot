*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       Run Keywords
...               open storybook                               ${STORYBOOK_URL}/iframe.html?id=coreavatar--fallbacks    AND
...               Wait Until Element Is Visible                ${fallbackToDefaultUserIcon}                             10s    # allow time for image loading to fail
Suite Teardown    Close Browser
Force Tags        smoke                                        

*** Variables ***
${fallbackToChildren}           id:fallback_to_children
${fallbackToAlt}                id:falback_to_alt
${fallbackToDefaultUserIcon}    css:#fallback_to_default_icon>div[class*="HvUserIcon-root"]

*** Test Cases ***
when image loading fails display component children if available
    Element Should Be Visible    ${fallbackToDefaultUserIcon}    
when image loading fails and there's no children display the alt text first letter if available
    Element Text Should Be    ${fallbackToAlt}    C
when image loading fails and there's no children nor alt text display the the default user icon
    Element Text Should Be    ${fallbackToChildren}    CS
