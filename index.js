require('dotenv').config();
const app = require('./app');
const port = process.env.PORT || 3000;

app.set('port', port);

app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});
