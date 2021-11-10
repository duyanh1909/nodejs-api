import express from 'express';

const app = express();
const port = "5000"

app.get("/api/hello", (req, res) => {
    res.send({ message: "Hello World!" });
});

app.listen(port, () => {
    console.log('Server is listening on port');
});