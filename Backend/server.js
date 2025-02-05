const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

const SUPABASE_URL = "https://rnpgwjgsnjtjjtyqivew.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY; // Use an environment variable for the key
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

app.post("/submit-quest", async (req, res) => {
  const { discord, twitter } = req.body;

  // Insert quest data into Supabase (example)
  const { error } = await supabase
    .from("quest_submissions_pending")
    .insert([
      { quest_code: "onboarding", user_identifier: discord, task_type: "discord", response: discord, status: null },
      { quest_code: "onboarding", user_identifier: twitter, task_type: "twitter", response: twitter, status: null }
    ]);

  if (error) {
    return res.status(500).json({ message: "Error submitting!", error });
  }

  res.json({ message: "Submitted for review!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

