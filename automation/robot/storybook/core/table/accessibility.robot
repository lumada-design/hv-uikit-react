*** Setting ***
Resource         ../../_resources/accessibility.robot
Resource         table.Resource
Test Template    pa11y should not find errors
Force Tags       pa11y
Documentation    WCAG2AA standard

*** Test Cases ***
with checkbox        ${visualizations}table--with-checkbox
empty                ${visualizations}table--empty
expander             ${visualizations}table--with-expander-and-custom-content
null values          ${visualizations}table--with-null-values
secondary actions    ${visualizations}table--with-checkbox-and-secondary-actions
simple               ${visualizations}table--main


*** Comments ***
test cases dismissed because they are using a third part chart from google with contrast issues.
scrolling expander     ${visualizations}table--scrollingexpander
 typical               ${visualizations}table--typical
