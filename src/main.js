const app = document.getElementById("root"); 

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

      <p style="
        margin-top:18px;
        color:#7180a3;
        font-size:12px;
      ">
        Google authentication will be connected through Supabase.
      </p>
    </section>
  </main>
`;

document
  .getElementById("googleLogin")
  .addEventListener("click", () => {
    alert("Google Login setup will be connected in the next step.");
  });
