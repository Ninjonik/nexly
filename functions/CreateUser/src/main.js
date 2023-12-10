import { Client, Databases, ID } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT)
      .setKey(process.env.APPWRITE_KEY);

  const database = new Databases(client);

  if (req.method === 'POST') {
    try {const newUser = req.body;

      console.log(newUser);

      const authId = newUser.$id;
      const email = newUser.name;

      const userRecord = await database.createDocument(
          process.env.APPWRITE_FUNCTION_DATABASE_ID,
          process.env.APPWRITE_FUNCTION_COLLECTION_ID,
          ID.unique(),
          {
            authId,
            email,
          }
      );

      log('New user record created:', userRecord);

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
    motto: 'Build like a team of hundreds_',
    learn: 'https://appwrite.io/docs',
    connect: 'https://appwrite.io/discord',
    getInspired: 'https://builtwith.appwrite.io',
  });
};
