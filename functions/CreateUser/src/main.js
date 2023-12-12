import { Client, Databases, ID, Permission, Role } from 'node-appwrite';

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

      await database.createDocument(
          'nexly',
          'users',
          ID.unique(),
          {
            "authID": authId,
            "username": name,
          },
          [
            Permission.read(Role.user(authId)),
            Permission.update(Role.user(authId)),
            Permission.delete(Role.user(authId))
          ]
      );

      return res.json({
        success: true,
        message: 'User record created successfully.',
      });
    } catch (err) {
      error('Error creating user record:', err);
      error(err.message)

      return res.json({
        success: false,
        message: 'Error creating user record.',
        error: err.message || 'Unknown error',
      });
    }
  }

  return res.json({
    success: false,
    message: 'Invalid Method',
  });
};
