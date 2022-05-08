import type { ApiError, PostgrestError, Session, User } from "@supabase/supabase-js";
import { writable } from "svelte/store";
import { supabase } from "./client";
import type { IMember } from "./members";

export const access_token = writable<string | null>(null);
export const user = writable<(User & IMember) | null>(null);

export async function signInWithEmail(
	first_name: string,
	last_name: string,
	class_name: string,
	email: string,
	password: string,
): Promise<{ member?: IMember; error?: PostgrestError | ApiError }> {
	const authResult = await supabase.auth.signUp({
		email: email,
		password: password,
	});

	if (authResult.error) return { error: authResult.error };

	const memberResult = await supabase.from("members").insert({
		first_name,
		last_name,
		class: class_name,
		presence: [],
	});

	if (memberResult.error) return { error: memberResult.error };

	user.set({ ...memberResult.data.at(0), ...authResult.user });

	return { ...memberResult.data.at(0), ...authResult.user };
}
export async function completeAccount(id: number, email: string, password: string) {
	const authResult = await supabase.auth.signUp({
		email: email,
		password: password,
	});

	if (authResult.error) return { error: authResult.error };

	const memberResult = await supabase
		.from("members")
		.update({
			uuid: authResult.user.id,
		})
		.eq("id", id);

	if (memberResult.error) return { error: memberResult.error };

	user.set({ ...memberResult.data.at(0), ...authResult.user });

	return { ...memberResult.data.at(0), ...authResult.user };
}

export async function logOut() {
	supabase.auth.signOut();
	user.set(null);
}
export async function logIn(
	email: string,
	password: string,
): Promise<PostgrestError | ApiError | void> {
	const authResult = await supabase.auth.signIn({
		email: email,
		password: password,
	});

	if (authResult.error) return authResult.error;

	const memberResult = await supabase.from("members").select("*").eq("uuid", authResult.user.id);

	if (memberResult.error) return memberResult.error;

	user.set({ ...memberResult.data.at(0), ...authResult.user });
}

export async function loginFromUrl() {
	const { data: session, error } = await supabase.auth.getSessionFromUrl({
		storeSession: true,
	});
	return { error, session };
}

export async function updateUser(
	email?: string,
	password?: string,
): Promise<{ error?: PostgrestError | ApiError }> {
	const { user, error } = await supabase.auth.update({
		email: email || "",
		password: password || "",
	});

	return { error };
}

export async function resetPassword(email: string) {
	const { error } = await supabase.auth.api.resetPasswordForEmail(email, {
		redirectTo: "http://localhost:3000/",
	});

	return { error };
}
