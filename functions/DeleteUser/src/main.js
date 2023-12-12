import { Client, Databases, Users } from 'node-appwrite';
import {Query} from "appwrite";

export default async ({ req, res, log, error }) => {
  const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT)
      .setKey(process.env.APPWRITE_KEY);

  const database = new Databases(client);
  const users = new Users(client);

  if (req.method === 'POST') {
    try {
      const removedUserId = req.body.$id;

      const userRecord = await database.listDocuments('nexly', 'users', [Query.equal('authID', removedUserId)]);

      if (userRecord.documents.length > 0) {
        const documentId = userRecord.documents[0].$id;

        await database.deleteDocument('nexly', 'users', documentId);

        return res.json({
          success: true,
          message: 'User record deleted successfully',
        });
      } else {
        return res.json({
          success: false,
          message: 'User record not found',
        });
      }
    } catch (err) {
      error('Error deleting user record:', err);
      error(err.message);

      return res.json({
        success: false,
        message: 'Error deleting user record',
        error: err.message || 'Unknown error',
      });
    }
  }

  return res.json({
    success: false,
    message: 'Invalid Method',
  });
};
