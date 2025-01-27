Idea:
- Use just one function `parseContent` without additional ones with all logic inside
- Problem: How to parse emphasized inside of link content? 
  - It should use recursion?
  - With recursion new `link` would be parsed as link inside of link, and its a problem
  - Without recursion all logic of parsing should be inside of `if` that handles link (or not?)
  - Logic of parsing emphasized can be inside of parsing emphasized. It can handle case when there is opened link symbols.
- Problem: How to put elements inside another elements?
  - Use some kind of indexes? 
    - Element in `parsed` can have open and close indexes
  - When element is closed it can handle logic of putting its content inside
    - It can be done just by putting as content everything that is in `parsed` after this element 
    - Some questionable elements can be putted inside 
    - Questionable elements can be formatted to text while they are putted inside and no indexes are needed 
- Problem: How to handle questionable elements?
  - Maybe all that need to be done just to check if previous element is string and if it is concatenate those strings instead of putting  

Parsing link:
- How to know that it should be end of content
  - Maybe add some kind of additional property to `Temp`
  - 