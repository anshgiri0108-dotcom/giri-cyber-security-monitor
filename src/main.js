import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

const app = document.getElementById("root");

async function showApp() {
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session?.user) {
    app.innerHTML = `
      <main style="
        min-height:100vh;
        background:#0b1020;
        color:white;
        font-family:Arial,sans-serif;
        padding:24px;
      ">
        <section style="
          max-width:600px;
          margin:60px auto;
          background:#11182d;
          border:1px solid #263252;
          border-radius:18px;
          padding:28px;
        ">
          <div style="font-size:42px;">🛡️</div>
          <h1>Giri Cyber Tech</h1>

          <p style="color:#9da9c9;">
            AI-assisted cybersecurity monitoring
          </p>

          <p>
            Logged in as:
            <strong>${session.user.email}</strong>
          </p>

          <button id="logout" style="
            padding:12px 18px;
            border:0;
            border-radius:10px;
            background:#dc2626;
            color:white;
            font-weight:bold;
          ">
            Sign out
          </button>
        </section>
      </main>
    `;

    document.getElementById("logout").addEventListener("click", async () => {
      await supabase.auth.signOut();
      showApp();
    });

    return;
  }

  app.innerHTML = `
    <main style="
      min-height:100vh;
      background:#0b1020;
      color:white;
      font-family:Arial,sans-serif;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:24px;
    ">
      <section style="
        width:100%;
        max-width:420px;
        background:#11182d;
        border:1px solid #263252;
        border-radius:18px;
        padding:28px;
        text-align:center;
      ">
        <div style="font-size:42px;">🛡️</div>

        <h1>Giri Cyber Tech</h1>

        <p style="color:#9da9c9;">
          AI-assisted cybersecurity monitoring
        </p>

        <button id="googleLogin" style="
          width:100%;
          margin-top:22px;
          padding:14px;
          border:0;
          border-radius:10px;
          background:#2563eb;
          color:white;
          font-size:16px;
          font-weight:bold;
        ">
          Continue with Google
        </button>
      </section>
    </main>
  `;

  document.getElementById("googleLogin").addEventListener("click", async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin
      }
    });

    if (error) {
      alert(error.message);
    }
  });
}

showApp(); 
