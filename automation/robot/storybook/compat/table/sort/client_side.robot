*** Setting ***
Resource         _keywords.resource
Test Setup       open table sample    ${compatibility}    main
Test Template    Run Keyword


*** Test Cases ***
unsorted to ascending       should sort column by ascending
ascending to descending     should sort column by descending
does not sort               should not be sortable
