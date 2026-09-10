const SUPABASE_URL = "https://opquqeiyfrspsyemgahm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_tQfcvV_Dy_zmyuaOGFUZNQ_eS5sH4ga";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

const form = document.getElementById("email-form");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();

  const { error } = await supabaseClient
    .from("email_signups")
    .insert([
      { email: email }
    ]);

  if (error) {
    console.error(error);

    if (error.code === "23505") {
      message.textContent = "That email is already signed up.";
    } else {
      message.textContent = "Something went wrong. Please try again.";
    }

    return;
  }

  message.textContent = "Thanks for signing up!";
  emailInput.value = "";
});
