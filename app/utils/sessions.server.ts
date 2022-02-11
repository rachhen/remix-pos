import bcrypt from "bcryptjs";
import { createCookieSessionStorage, json, redirect } from "remix";
import { FlashType, FlashStatus } from "~/types";
import { db } from "./db.server";

type LoginForm = {
  username: string;
  password: string;
};

export async function login({ username, password }: LoginForm) {
  const user = await db.user.findFirst({
    where: { username },
  });
  if (!user) return null;

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) return null;

  return user;
}

// export async function register({ username, password }: LoginForm) {
//   const passwordHash = await bcrypt.hash(password, 10);
//   return db.user.create({
//     data: { username, password: passwordHash },
//   });
// }

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export const getSession = storage.getSession;
export const commitSession = storage.commitSession;

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");

  if (!userId || typeof userId !== "number") return null;

  return userId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get("userId");

  if (!userId || typeof userId !== "number") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }

  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);

  if (typeof userId !== "string") {
    return null;
  }

  try {
    const user = await db.user.findUnique({ where: { id: +userId } });
    return user;
  } catch {
    throw logout(request);
  }
}

export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export async function createUserSession(userId: number, redirectTo: string) {
  const session = await storage.getSession();
  session.set("userId", userId);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export type SetFlashOptions = {
  status: FlashStatus;
  message: string;
  redirectTo: string;
};
export async function setFlash(req: Request, options: SetFlashOptions) {
  const session = await getUserSession(req);
  session.flash(options.status, options.message);
  return redirect(options.redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function responseWithFlash(req: Request, data: any = {}) {
  const session = await getUserSession(req);

  let flash: FlashType = {};
  if (session.has("success")) {
    flash = { status: "success", message: session.get("success") };
  }
  if (session.has("info")) {
    flash = { status: "info", message: session.get("info") };
  }
  if (session.has("warning")) {
    flash = { status: "warning", message: session.get("warning") };
  }
  if (session.has("error")) {
    flash = { status: "error", message: session.get("error") };
  }

  return json(
    { ...flash, ...data },
    { headers: { "Set-Cookie": await commitSession(session) } }
  );
}
