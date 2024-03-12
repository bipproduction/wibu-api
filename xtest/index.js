; (async () => {
    fetch("http://localhost:3000//api/key", {
        method: "get",
        headers: {
            "authorization": "key U2FsdGVkX1/vfDIbWqzWTfP1Mbph23M/HMuvyAd7fWw="
        }
    }).then(res => res.json()).then(data => {
        console.log(data)
    })
})()