const express = require('express');
const app = express();


app.set('view engone', 'ejs');
app.set('public', express.static(__dirname + '/public'))














const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))