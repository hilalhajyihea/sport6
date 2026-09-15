import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export type Role = "admin" | "writer";

export type SessionUser = {
  id: number;
  username: string;
  displayName: string;
  role: Role;
  canAdd: boolean;
  canEdit: boolean;
  canDelete: boolean;
};

const COOKIE = "sport6_session";

function secretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

export async function createSession(user: SessionUser) {
  const key = secretKey();
  if (!key) {
    throw new Error("SESSION_SECRET is missing");
  }
  const token = await new SignJWT({
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    canAdd: user.canAdd,
    canEdit: user.canEdit,
    canDelete: user.canDelete,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(key);

  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function getSession(): Promise<SessionUser | null> {
  const key = secretKey();
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!key || !token) return null;
  try {
    const { payload } = await jwtVerify(token, key);
    return {
      id: Number(payload.id),
      username: String(payload.username),
      displayName: String(payload.displayName),
      role: payload.role === "admin" ? "admin" : "writer",
      canAdd: Boolean(payload.canAdd),
      canEdit: Boolean(payload.canEdit),
      canDelete: Boolean(payload.canDelete),
    };
  } catch {
    return null;
  }
}

export function isAdmin(user: SessionUser | null) {
  return user?.role === "admin";
}
