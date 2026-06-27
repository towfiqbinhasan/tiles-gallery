import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const globalWithMongo = global;

if (!globalWithMongo._mongoClient) {
  globalWithMongo._mongoClient = new MongoClient(process.env.MONGODB_URI);
  await globalWithMongo._mongoClient.connect();
}

const client = globalWithMongo._mongoClient;
const db = client.db("tiles-gallery");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});