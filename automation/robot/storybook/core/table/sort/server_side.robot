*** Setting ***
Resource      _keywords.resource
Test Setup    open table sample    ${display}    server-side-pagination


*** Test Cases ***
unsorted to ascending       should sort column by ascending
ascending to descending     should sort column by descending
# does not sort               should not be sortable
