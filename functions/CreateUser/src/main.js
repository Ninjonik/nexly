import { Client, Databases, ID } from 'node-appwrite';
import {Permission} from "appwrite";

export default async ({ req, res, log, error }) => {
  const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT)
      .setKey(process.env.APPWRITE_KEY);

  const database = new Databases(client);

  if (req.method === 'POST') {
    try {const newUser = req.body;

      const authId = newUser.$id;
      const name = newUser.name;

      const generatedID = ID.unique()

      const userRecord = await database.createDocument(
          'nexly',
          'users',
          generatedID,
          {
            "authID": authId,
            "username": name,
          },
          [
            Permission.read(generatedID),
            Permission.update(generatedID),
            Permission.delete(generatedID)
          ]
      );

      return res.json({
        success: true,
        message: 'User record created successfully',
      });
    } catch (err) {
      error('Error creating user record:', err);
      error(err.message)

      return res.json({
        success: false,
        message: 'Error creating user record',
        error: err.message || 'Unknown error',
      });
    }
  }

  return res.json({
    success: false,
    message: 'Invalid Method',
  });
};
