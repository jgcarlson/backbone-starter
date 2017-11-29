'use strict';

// set up ========================
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
const app = express();

var host = '127.0.0.1';
var port = 8080;

// configuration =================
app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, './dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// require('./server/config/routes.js')(app);
// app.all('*', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.sendFile(path.resolve('./dist/index.html'));
// });

if (app.get('env') === 'development') {
  new WebpackDevServer(webpack(config), {
    contentBase: config.output.path,
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: false,
    quiet: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    },
    stats: {
      colors: false
    }
  }).listen(5000, host, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log(
        '------------------------- Dev server up and running on port 5000 -------------------------'
      );
    }
  });
} else {
  // port ==========================
  const server = app.listen(5000, () => {
    console.log(
      '------------------------- Server up and running on port 5000 -------------------------'
    );
  });
}
