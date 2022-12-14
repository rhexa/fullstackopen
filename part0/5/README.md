# 0.5: Single page app diagram

Create a diagram depicting the situation where the user goes to the single page app version of the notes app at <https://studies.cs.helsinki.fi/exampleapp/spa>.

## Diagram

```mermaid
sequenceDiagram
  participant b as browser
  participant s as server
  b ->> s: GET /exampleapp/spa
  s -->> b: spa.html
  b ->> s: GET /exampleapp/main.css
  s -->> b: main.css
  b ->> s: GET /exampleapp/spa.js
  s -->> b: spa.js
  note over b: Browser executes the js codes <br> that will set multiple listeners <br> to render the notes and <br> manipulate the data before <br> the form gets submitted
  b ->> s: GET /exampleapp/data.json
  s -->> b: data.json
  note over b: Listener gets triggered <br> notes will be rendered
```
