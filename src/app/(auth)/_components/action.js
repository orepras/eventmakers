"use server";

import * as arctic from "arctic";
import { cookies } from "next/headers";
import { google } from "@/utils/arctic";
import { redirect } from "next/navigation";

export async function continueWithGoogleAction() {
  const cookieStore = await cookies();
  const state = arctic.generateState();
  const codeVerifier = arctic.generateCodeVerifier();
  const scope = ["openid", "profile", "email"];

  cookieStore.set("code_verifier", codeVerifier, { httpOnly: true });

  const url = google.createAuthorizationURL(state, scope, codeVerifier);
  redirect(url.href);
}
