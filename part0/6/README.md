# 0.6: New note in Single page app diagram

Create a diagram depicting the situation where the user creates a new note using the single page version of the app.

## Diagram

```mermaid
sequenceDiagram
  actor u as user
  participant b as browser
  participant s as server
  u ->> b: Add text to the form
  u ->> b: Click save button
  note over b: This will trigger the onsubmit listener <br> and the javascript will append a <br> date to the form data, add the data <br> to the note list in browser memory, <br> re-render the notes then send the <br> data to the server
  b ->> s: POST /exampleapp/new_note_spa
  s -->> b: 201: response in json format
```
