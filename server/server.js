const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const multer = require('multer');
const { storage } = require('./cloudinary/index');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

const upload = multer({ storage });
const uploadMultipleImages = upload.array('images');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.post('/upload', (req, res) => {
    uploadMultipleImages(req, res, function (err) {
      if (err) {
        if (
          err instanceof multer.MulterError &&
          err.code === 'LIMIT_FILE_SIZE'
        ) {
          // Handle file size limit error
          return res
            .status(400)
            .send({ message: 'Image size exceeds the limit' });
        }
        // Handle other errors
        return res.status(400).send({ message: err.message });
      }

      const images = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
      }));

      res.status(200).send({
        message: 'Image uploaded successfully',
        images,
      });
    });
  });

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
