const mongoose = require('mongoose');

main().catch((err) => console.log(err));

async function main() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
  console.log('MongoDB connected...');
}
