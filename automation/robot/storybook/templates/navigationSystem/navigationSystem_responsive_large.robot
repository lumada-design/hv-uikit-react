*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook on small size
Suite Teardown    Close Browser
Force Tags        smoke    responsive
Documentation    Test Cases based on:
...              - Design System Version 1.2.0. NavigationSystem.pdf 
...              - scenario: when page is horizontally resized to greater than 959px


*** Test Cases ***
1 vertical menu are dismissed into 1 horizontal menu 
2 vertical menus are replaced into 2 horizontal menus 
2 vertical menus are replaced into 1 horizontal + 1 vertical menus 
3 vertical menus are replaced into 1 horizontal + 2 vertical menus
3 vertical menus are replaced into 2 horizontal + 1 vertical menus non collapsible
3 vertical menus are replaced into 2 horizontal + 2 vertical menus
actions buttons are replaced into horizontal menu 
marked actions buttons remains on horizontal menu (e.g. notifications)



