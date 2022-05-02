require("../src/db/mongoose");
const Task = require("../src/models/Task");

Task.deleteOne({ _id: "626d62b325e4e9dfdbeb2227" })
  .then((res) => {
    console.log(res);
    return Task.countDocuments({ isCompleted: false });
  })
  .then((count) => {
    console.log(count);
  })
  .catch((err) => {
    console.log(err);
  });
