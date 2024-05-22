const MONGO_DB_CONFIG = {
  // DB:"mongodb+srv://vikas_user:UybHsqBEkTkC5c5i@cluster0.4ml1awv.mongodb.net/ecomerce_db?retryWrites=true&w=majority&appName=Cluster0",
  DB:process.env.MONGO_DB_URI,
  PAGE_SIZE: 10,
};

module.exports = {
    MONGO_DB_CONFIG
};