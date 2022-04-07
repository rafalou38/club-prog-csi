import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vzehqmkbnyvvmyndkhbt.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6ZWhxbWtibnl2dm15bmRraGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDkzNTY1NjEsImV4cCI6MTk2NDkzMjU2MX0.9Su-3MQ4udaEneZ4ZcPfANCv48SoprsgeEgAQNFlpAc";
export const supabase = createClient(supabaseUrl, supabaseKey);
