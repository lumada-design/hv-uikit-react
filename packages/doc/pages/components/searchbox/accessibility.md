
### In case of search without labels an alternative description must be provided using:
- aria-labelledby or aria-label
- aria-describedby that points to the id of an element containing the description

### No Keyboard Trap
- If keyboard focus can be moved to the searchbox using a keyboard interface, then focus can be moved away from the searchbox using only a keyboard interface.

### On Focus
- When the searchbox receives focus, it does not initiate a change of context.

### On Input
- Changing the setting of any searchbox does not automatically cause a change of context unless the user has been advised of the behavior before using the searchbox

### Focus Order
- If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable searchbox receive focus in an order that preserves meaning and operability.

### Label in Name
- For buttons with labels that include text or images of text, the name contains the text that is presented visually.
- When using aria-labelledby, aria-label or aria-describedby these values must contain the text that is visible.

### Want to know more? 
Please visit [WAI Button Reference](https://www.w3.org/WAI/WCAG21/quickref/?currentsidebar=%23col_overview&levels=aa%2Caaa&technologies=smil%2Cpdf%2Cflash%2Csl#labels-or-instructions)
