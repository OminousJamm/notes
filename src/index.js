require('dotenv').config();
require('./database');
const app = require('./server');

app.listen(app.get('port'), () => {
    console.log('server running on port: ', app.get('port'));
});

