const express = require('express');
const cors = require('cors');
const {router} = require("./routes");
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(express.static(__dirname + '/app/dist/'));

app.listen(4000, () => {
  console.log('Server running');
})
