1.create tables from the schema given in the todolist_task and todolist_users.
2. Run server, npm install and use nodemon start command.
3. Run client, npm install and use npm start.

important if client is not running on 3001 then please update app.js with correct url and port value.Refer below.
 
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");// Change port here if needed
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,contentType, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});