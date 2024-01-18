const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { GraphQLUpload } = require('graphql-upload');
const fs = require('fs');
const path = require('path');
const { createWriteStream } = require('fs');

const app = express();

const typeDefs = gql`
  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }

  type Query {
    hello: String
  }

  type Mutation {
    uploadFile(file: Upload!): File
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
  Mutation: {
    uploadFile: async (_, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      const stream = createReadStream();
      const filePath = path.join(__dirname, 'uploads', filename);
      const url = `/uploads/${filename}`;

      await new Promise((resolve, reject) =>
        stream
          .pipe(createWriteStream(filePath))
          .on('finish', resolve)
          .on('error', reject),
      );

      return { filename, mimetype, encoding, url };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`),
);
