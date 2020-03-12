*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        wai-aria-practices
Documentation     https://www.w3.org/TR/wai-aria-practices/#grid_roles_states_props


*** Test Cases ***


