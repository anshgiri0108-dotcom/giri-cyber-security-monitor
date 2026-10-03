import { createClient } from "@supabase/supabase-js";  

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

const app = document.getElementById("root");

const styles = `
* { box-sizing: border-box; }

body {
  margin: 0;
  background: #0b1020;
  color: white;
  font-family: Arial, sans-serif;
}

button {
  cursor: pointer;
}

.container {
  max-width: 900px;
  margin: auto;
  padding: 24px;
}

.card {
  background: #11182d;
  border: 1px solid #263252;
  border-radius: 18px;
  padding: 22px;
  margin-bottom: 20px;
}

input, textarea, select {
  width: 100%;
  padding: 12px;
  margin-top: 7px;
  margin-bottom: 15px;
  border-radius: 10px;
  border: 1px solid #334155;
  background: #0b1020;
  color: white;
  font-size: 15px;
}

textarea {
  min-height: 120px;
  resize: vertical;
}

label {
  color: #cbd5e1;
  font-size: 14px;
}

.primary {
  background: #2563eb;
  color: white;
  border: 0;
  padding: 12px 18px;
  border-radius: 10px;
  font-weight: bold;
}

.danger {
  background: #dc2626;
  color: white;
  border: 0;
  padding: 10px 15px;
  border-radius: 9px;
}

.incident {
  border: 1px solid #263252;
  border-radius: 14px;
  padding: 17px;
  margin-top: 12px;
}

.muted {
  color: #9da9c9;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.stat {
  background: #0b1020;
  border: 1px solid #263252;
  border-radius: 14px;
  padding: 16px;
}

@media (max-width: 600px) {
  .stats {
    grid-template-columns: 1fr;
  }
}
`;

function renderLogin() {
  app.innerHTML = `
    <style>${styles}</style>

    <main class="container" style="max-width:420px; padding-top:80px;">
      <section class="card" style="text-align:center;">

        <div style="font-size:44px;">🛡️</div>

        <h1>Giri Cyber Tech</h1>

        <p class="muted">
          AI-assisted cybersecurity monitoring
        </p>

        <button id="googleLogin" class="primary"
          style="width:100%; margin-top:15px;">
          Continue with Google
        </button>

      </section>
    </main>
  `;

  document
    .getElementById("googleLogin")
    .addEventListener("click", async () => {

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

async function loadIncidents(userId) {

  const { data, error } = await supabase
    .from("incidents")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    alert("Could not load incidents: " + error.message);
    return [];
  }

  return data || [];
}

async function renderDashboard(user) {

  const incidents = await loadIncidents(user.id);

  const openCount =
    incidents.filter(i => i.status === "open").length;

  const resolvedCount =
    incidents.filter(i => i.status === "resolved").length;

  const highCount =
    incidents.filter(i => i.risk === "High").length;

  app.innerHTML = `
    <style>${styles}</style>

    <main class="container">

      <header style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:15px;
        margin-bottom:25px;
      ">

        <div>
          <h1 style="margin-bottom:5px;">
            🛡️ Giri Cyber Tech
          </h1>

          <div class="muted">
            Security Monitoring Dashboard
          </div>
        </div>

        <button id="logout" class="danger">
          Sign out
        </button>

      </header>

      <section class="card">

        <h2 style="margin-top:0;">
          Welcome 👋
        </h2>

        <p class="muted">
          Logged in as: ${user.email}
        </p>

        <div class="stats">

          <div class="stat">
            <div class="muted">Open</div>
            <h2>${openCount}</h2>
          </div>

          <div class="stat">
            <div class="muted">Resolved</div>
            <h2>${resolvedCount}</h2>
          </div>

          <div class="stat">
            <div class="muted">High Risk</div>
            <h2>${highCount}</h2>
          </div>

        </div>

      </section>

      <section class="card">

        <h2>➕ Add Security Incident</h2>

        <p class="muted">
          Add a suspicious message, email, login alert
          or other security incident.
        </p>

        <form id="incidentForm">

          <label>Incident title</label>

          <input
            id="title"
            required
            placeholder="e.g. Suspicious Instagram DM"
          />

          <label>Message / incident details</label>

          <textarea
            id="message"
            required
            placeholder="Paste the suspicious message or describe the incident..."
          ></textarea>

          <label>Risk level</label>

          <select id="risk">

            <option value="Low">
              Low
            </option>

            <option value="Medium" selected>
              Medium
            </option>

            <option value="High">
              High
            </option>

          </select>

          <label>Assessment</label>

          <textarea
  id="assessment"
  placeholder="AI analysis will appear here..."
></textarea>

<button
  type="button"
  id="analyzeBtn"
  class="primary"
  style="margin-bottom:15px;"
>
  Analyze with AI
</button>

          <button class="primary" type="submit">
            Save Incident
          </button>

        </form>

      </section>

      <section class="card">

        <h2>📋 Incident History</h2>

        <div id="incidentList">

          ${
            incidents.length === 0
              ? `<p class="muted">No incidents yet.</p>`
              : incidents.map(incident => `
                
                <div class="incident">

                  <h3>
                    ${escapeHtml(incident.title)}
                  </h3>

                  <p>
                    <strong>Risk:</strong>
                    ${escapeHtml(incident.risk)}
                  </p>

                  <p>
                    <strong>Status:</strong>
                    ${escapeHtml(incident.status)}
                  </p>

                  <p class="muted">
                    ${escapeHtml(incident.message)}
                  </p>

                  <p>
                    <strong>Assessment:</strong><br>
                    ${escapeHtml(incident.assessment)}
                  </p>

                  ${
                    incident.status === "open"
                      ? `
                        <button
                          class="primary resolve-btn"
                          data-id="${incident.id}"
                        >
                          Mark Resolved
                        </button>
                      `
                      : `
                        <span style="color:#22c55e;">
                          ✓ Resolved
                        </span>
                      `
                  }

                </div>

              `).join("")
          }

        </div>

      </section>

    </main>
  `;

  document
    .getElementById("logout")
    .addEventListener("click", async () => {

      await supabase.auth.signOut();

      renderLogin();
    });

  document
    .getElementById("incidentForm")
    .addEventListener("submit", async (event) => {

      event.preventDefault();

      const title =
        document.getElementById("title").value.trim();

      const message =
        document.getElementById("message").value.trim();

      const risk =
        document.getElementById("risk").value;

      const assessment =
        document.getElementById("assessment").value.trim();

      const { error } = await supabase
        .from("incidents")
        .insert({
          user_id: user.id,
          title,
          message,
          risk,
          assessment,
          status: "open"
        });

      if (error) {

        alert(
          "Could not save incident: " +
          error.message
        );

        return;
      }

      alert("Incident saved successfully ✅");

      renderDashboard(user);
    });

  document
    .querySelectorAll(".resolve-btn")
    .forEach(button => {

      button.addEventListener("click", async () => {

        const id = button.dataset.id;

        const { error } = await supabase
          .from("incidents")
          .update({
            status: "resolved",
            updated_at: new Date().toISOString()
          })
          .eq("id", id)
          .eq("user_id", user.id);

        if (error) {

          alert(
            "Could not update incident: " +
            error.message
          );

          return;
        }

        renderDashboard(user);
      });

    });
}

function escapeHtml(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function startApp() {

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session?.user) {

    await renderDashboard(session.user);

  } else {

    renderLogin();

  }

  supabase.auth.onAuthStateChange(
    async (_event, session) => {

      if (session?.user) {

        await renderDashboard(session.user);

      } else {

        renderLogin();

      }

    }
  );
}

startApp();
