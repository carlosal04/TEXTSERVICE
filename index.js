import express from "express";
import fetch from "node-fetch";

const port = process.env.PORT || 3000;
const url = process.env.BASE_URL;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getMessage = async (msg) => {
    const response = await fetch(`${url}/share`, {
        method: 'POST',
        body: JSON.stringify({ msg }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response;
};

app.post('/text', async (req, res) => {
    const { msg } = req.body;

    if (!msg || msg.length === 0)
        return res.status(400).send('Bad Request');

    const shareResp = await getMessage(msg);

    if (!shareResp.ok)
        return res.status(shareResp.status).send({ errorMessage: 'Failed to share message' });

    var responseMessage = await shareResp.json();
    return res.status(200).send(responseMessage);
});

app.post('/share', async (req, res) => {
    const { msg } = req.body;

    if (!msg)
        return res.status(400).send('Bad Request');

    const responseMessage = msg === msg.toLowerCase() ? msg.toUpperCase() : msg.toLowerCase();

    return res.status(200).send({ msg: responseMessage });
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
