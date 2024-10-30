const express = require('express');
const PORT=process.env.PORT || 5000;
const ConnectDb = require('./db/databse');

const router=require('./router/router');
const app = express();

app.use(express.json());

app.use(router);


const Start=async() => {
    await ConnectDb();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

Start();