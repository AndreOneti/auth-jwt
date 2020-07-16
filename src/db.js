const mongoose = require('mongoose');
const { User } = require('./models');
require("dotenv-safe").config();

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASS
} = process.env;

// MONGO CONNECTION
mongoose.connect(
  `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin&retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

mongoose.connection.on('error', () => console.error('connection error:'));
mongoose.connection.once('open', async () => {
  console.log('database connected');
  let user = await User.findOne({ email: "admin@admin.io" });
  if (!user) {
    await User.create({
      name: "admin",
      email: "admin@admin.io",
      password: "21232f297a57a5a743894a0e4a801fc3"
    })
  } else {
    await User.updateOne(
      {
        email: "admin@admin.io"
      },
      {
        name: "admin",
        email: "admin@admin.io",
        password: "21232f297a57a5a743894a0e4a801fc3"
      }
    );
  }
});
