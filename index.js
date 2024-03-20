import { app } from "./utils/app.js";

const server = app.listen(3000, () => {
  console.log("Server starting on port 3000!");
});

server.setTimeout(300000);

//app.listen(3000, () => console.log('Server starting on port 3000!'));