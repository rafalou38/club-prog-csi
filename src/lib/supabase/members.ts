import type { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "./client";

export interface IMember {
	id: number;
	created_at: string;
	last_name: string;
	first_name: string;
	class: string;
	presence: Date[];
}

export async function getMembers(): Promise<IMember[]> {
	const { data: members, error } = await supabase.from("members").select("*");
	if (error) throw error;

	return members || [];
}
export async function getIncompleteMembers(): Promise<IMember[]> {
	const { data: members, error } = await supabase.from("members").select("*").is("uuid", null);
	if (error) throw error;

	return members || [];
}

export async function register(
	first_name: string,
	last_name: string,
	class_name: string,
): Promise<{ member: IMember | undefined; error?: PostgrestError }> {
	const { data: member, error } = await supabase.from("members").insert({
		first_name,
		last_name,
		class: class_name,
		presence: [],
	});

	return { member: member.at(0), error };
}
