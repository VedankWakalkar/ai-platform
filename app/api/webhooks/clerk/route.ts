import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createUser, deleteUser } from "@/lib/actions/user.action";

// Define type based on your User model and action function parameters
type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  photo: string;
  firstName: string;
  lastName: string;
};

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred during verification', { status: 400 });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  // Handle different event types
  try {
    switch (eventType) {
      case "user.created": {
        const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

        if (!id || !email_addresses || !email_addresses[0]?.email_address || !username || !image_url) {
          return new Response('Missing required user data', { status: 400 });
        }

        const user: CreateUserParams = {
          clerkId: id,
          email: email_addresses[0].email_address,
          username: username,
          photo: image_url,
          firstName: first_name || '',
          lastName: last_name || '',
        };

        const newUser = await createUser(user);

        // Log and respond if user creation is successful
        if (newUser) {
          console.log("New User Created", newUser);
          return NextResponse.json({ message: "User created", user: newUser }, { status: 201 });
        } else {
          return new Response('User creation failed', { status: 500 });
        }
      }

      case "user.deleted": {
        if (!id) {
          return new Response('Missing user id', { status: 400 });
        }

        const deletedUser = await deleteUser(id);
        return NextResponse.json({ message: "User deleted", user: deletedUser }, { status: 200 });
      }

      default:
        console.log(`Unhandled event type: ${eventType}`);
        return new Response(`Unhandled event type: ${eventType}`, { status: 400 });
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response('Error processing webhook', { status: 500 });
  }
}
