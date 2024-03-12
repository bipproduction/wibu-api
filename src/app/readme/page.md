# Documentation


### Example

```js
(async () => {
  fetch("http://localhost:3000//api/key", {
    method: "get",
    headers: {
      authorization: "key U2FsdGVkX1/TMfhmF/9m6Ig7yDQOD+aq4ObyU+uOMhQ=",
    },
  })
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
    });
})();
```

### Response
```json
{
  "name": "apaya",
  "key": "U2FsdGVkX1/vfDIbWqzWTfP1Mbph23M/HMuvyAd7fWw=",
  "isActive": true,
  "expiresAt": null,
  "ApikeyConfig": [
    {
      "config": {
        "name": "dsdsds",
        "description": "apa",
        "value": {
          "nama": "malik"
        }
      }
    }
  ]
}
```
