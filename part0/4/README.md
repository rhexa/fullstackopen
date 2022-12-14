# 0.4: New note diagram

Create a similar diagram depicting the situation where the user creates a new note on page <https://studies.cs.helsinki.fi/exampleapp/notes> when writing something into the text field and clicking the submit button.

## Diagram

```mermaid
sequenceDiagram
  actor u as user
  participant b as browser
  participant s as server
  u ->> b: Add text to the form
  u ->> b: Click save button
  b ->> s: POST /exampleapp/new_note
  s -->> b: Redirect to /exampleapp/notes
  b ->> s: GET /exampleapp/notes
  s -->> b: notes.html
  b ->> s: GET /exampleapp/main.css
  s -->> b: main.css
  b ->> s: GET /exampleapp/main.js
  s -->> b: main.js
  note over b: Browser executes the js codes <br> that will fetch data.json and <br> create an event listener that <br> will add the datas to the DOM
  b ->> s: GET /exampleapp/data.json
  s -->> b: data.json
  note over b: Event gets triggered <br> notes will be rendered
```
