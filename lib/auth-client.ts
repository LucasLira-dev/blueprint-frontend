
import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";


const USER_ROLES = {
    CLIENT: "client",
    ADMIN: "admin",
};

if (!process.env.NEXT_PUBLIC_BETTER_AUTH_URL) {
   throw new Error('NEXT_PUBLIC_BETTER_AUTH_URL environment variable is not defined.')
}

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  fetchOptions: {
    credentials: 'include',
  },
  plugins: [
    adminClient(),
  ],
  user: {
    additionalFields: {
      role: {
        type: USER_ROLES,
        required: true,
        defaultValue: "client",
        input: true,
      },
    },
  },
})

export { USER_ROLES }