import express from 'express';

const app = express();
const port = "3000"

app.get("/api/hello", (req, res) => {
    res.send({ message: "Hello World!" });
}); 

app.post("/api/hello", (req, res) => {
    res.send({ message: "Post!"});
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});