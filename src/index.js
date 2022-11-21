import {connectDb} from './db/database.js';
import app from './middleware/app.js';


connectDb();

app.listen(app.get("port"), () => {
    console.log(`server on port ${app.get("port")}`);
  });

