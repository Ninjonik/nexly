import {Client, Databases, ID} from "appwrite";

export default async ({ req, res, log, error }) => {
  const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT)

  const databases = new Databases(client);

  if (req.method === 'POST') {
    try {
      // Parse the request body to get the new user details
      const newUser = req.body;

      // Get the user ID and username from the new user data
      const authId = newUser.$id; // Assuming $id contains the user ID
      const username = newUser.username;

      // Create a new record in the 'users' collection in the 'nexly' database
      const userRecord = await databases.createDocument(
          process.env.APPWRITE_FUNCTION_DATABASE_ID,
          'users',
          ID.unique(),
          {
            authId,
            username,
          }
      );

      // Log the newly created user record
      log('New user record created:', userRecord);

      // Send a response indicating success
      return res.json({
        success: true,
        message: 'User record created successfully',
      });
    } catch (err) {
      // Log any errors that occur during the process
      error('Error creating user record:', err);

      // Send a response indicating failure
      return res.json({
        success: false,
        message: 'Error creating user record',
      });
    }
  }

  // If the request method is not 'POST', send a default response
  return res.json({
    motto: 'Build like a team of hundreds_',
    learn: 'https://appwrite.io/docs',
    connect: 'https://appwrite.io/discord',
    getInspired: 'https://builtwith.appwrite.io',
  });
};
