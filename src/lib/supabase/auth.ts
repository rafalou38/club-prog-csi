import type { ApiError, PostgrestError, User } from "@supabase/supabase-js";
import { writable } from "svelte/store";
import { supabase } from "./client";
import type { IMember } from "./members";

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

export async function logOut(
) {
	supabase.auth.signOut();
	user.set(null);
}
export async function logIn(
	email: string,
	password: string,
): Promise<{ member?: IMember; error?: PostgrestError | ApiError }> {
	const authResult = await supabase.auth.signIn({
		email: email,
		password: password,
	});

	if (authResult.error) return { error: authResult.error };

	const memberResult = await supabase.from("members").select("*").eq("uuid", authResult.user.id);

	if (memberResult.error) return { error: memberResult.error };

	user.set({ ...memberResult.data.at(0), ...authResult.user });
	return { ...memberResult.data.at(0), ...authResult.user };
}
