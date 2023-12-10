import { Client, Databases, ID } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT)
      .setKey(process.env.APPWRITE_KEY);

  const database = new Databases(client);

  if (req.method === 'POST') {
    try {
      const newUser = req.body;

      log(newUser);

      const authId = newUser.$id;
      const email = newUser.name;

      const userRecord = await database.createDocument(
          process.env.APPWRITE_FUNCTION_DATABASE_ID,
          'users',
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

      return res.json({
        success: false,
        message: 'Error creating user record',
      });
    }
  }

  return res.json({
    success: false,
    message: 'Invalid method',
  });
};
