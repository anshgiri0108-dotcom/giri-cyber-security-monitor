import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

const app = document.getElementById("root");

const styles = `
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f4f7fb;
    color: #172033;
  }

  .container {
    max-width: 1100px;
    margin: auto;
    padding: 25px 18px;
  }

  .login-box {
    max-width: 430px;
    margin: 100px auto;
    background: white;
    padding: 35px;
    border-radius: 18px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
    text-align: center;
  }

  .brand {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .muted {
    color: #687386;
  }

  button {
    border: none;
    cursor: pointer;
    border-radius: 10px;
    padding: 12px 18px;
    font-size: 15px;
  }

  .primary {
    background: #172033;
    color: white;
  }

  .primary:hover {
    opacity: 0.9;
  }

  .primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .danger {
    background: #fff0f0;
    color: #c62828;
  }

  .success {
    background: #eaf8ef;
    color: #16803c;
  }

  .topbar {
    background: white;
    border-radius: 16px;
    padding: 18px 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    box-shadow: 0 4px 18px rgba(0,0,0,0.05);
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    margin-bottom: 20px;
  }

  .stat {
    background: white;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 18px rgba(0,0,0,0.05);
  }

  .stat-number {
    font-size: 28px;
    font-weight: 700;
    margin-top: 8px;
  }

  .card {
    background: white;
    border-radius: 16px;
    padding: 22px;
    margin-bottom: 20px;
    box-shadow: 0 4px 18px rgba(0,0,0,0.05);
  }

  label {
    display: block;
    font-weight: 600;
    margin: 15px 0 7px;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 12px;
    border: 1px solid #d8dee9;
    border-radius: 10px;
    font-size: 15px;
    font-family: inherit;
  }

  textarea {
    min-height: 130px;
    resize: vertical;
  }

  .incident {
    border: 1px solid #e1e6ef;
    border-radius: 14px;
    padding: 18px;
    margin-top: 14px;
  }

  .incident-head {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    align-items: flex-start;
  }

  .badge {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    margin-right: 5px;
  }

  .high {
    background: #ffe5e5;
    color: #c62828;
  }

  .medium {
    background: #fff3d6;
    color: #9a6500;
  }

  .low {
    background: #e5f7eb;
    color: #16733a;
  }

  .open {
    background: #e8f0ff;
    color: #2456a6;
  }

  .resolved {
    background: #e8f7ed;
    color: #18733b;
  }

  .incident-message {
    background: #f7f9fc;
    padding: 12px;
    border-radius: 10px;
    margin: 12px 0;
    white-space: pre-wrap;
  }

  .ai-report {
    margin-top: 15px;
    border: 1px solid #e1e6ef;
    border-radius: 12px;
    overflow: hidden;
  }

  .report-header {
    padding: 12px 15px;
    background: #f7f9fc;
    font-weight: 700;
  }

  .report-section {
    padding: 15px;
    border-top: 1px solid #e1e6ef;
  }

  .report-title {
    font-weight: 700;
    margin-bottom: 8px;
  }

  .report-content {
    white-space: pre-wrap;
    line-height: 1.55;
    color: #38445a;
  }

  .actions {
    margin-top: 15px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  @media (max-width: 850px) {
    .stats {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 500px) {
    .stats {
      grid-template-columns: 1fr;
    }

    .topbar {
      flex-direction: column;
      align-items: flex-start;
    }

    .incident-head {
      flex-direction: column;
    }
  }
`;

const styleTag = document.createElement("style");
styleTag.textContent = styles;
document.head.appendChild(styleTag);


function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function renderAIReport(assessment, risk) {

  if (!assessment) {
    return "";
  }

  const text = String(assessment);

  let analysis = text;
  let actions = text;

  const analysisMatch =
    text.match(
      /ANALYSIS:\s*([\s\S]*?)(?=\n\s*ACTIONS:|$)/i
    );

  const actionsMatch =
    text.match(
      /ACTIONS:\s*([\s\S]*)/i
    );

  if (analysisMatch) {
    analysis = analysisMatch[1].trim();
  }

  if (actionsMatch) {
    actions = actionsMatch[1].trim();
  }

  return `
    <div class="ai-report">

      <div class="report-header">
        AI Security Assessment
      </div>

      <div class="report-section">

        <div class="report-title">
          Risk Level
        </div>

        <div class="report-content">
          ${escapeHtml(risk)} Risk
        </div>

      </div>

      <div class="report-section">

        <div class="report-title">
          Warning Signs & Analysis
        </div>

        <div class="report-content">
          ${escapeHtml(analysis)}
        </div>

      </div>

      <div class="report-section">

        <div class="report-title">
          Recommended Actions
        </div>

        <div class="report-content">
          ${escapeHtml(actions)}
        </div>

      </div>

    </div>
  `;
}


function renderLogin() {

  app.innerHTML = `
    <div class="login-box">

      <div class="brand">
        Giri Cyber Tech
      </div>

      <p class="muted">
        AI-assisted cybersecurity incident monitoring
      </p>

      <button
        id="googleLogin"
        class="primary"
      >
        Continue with Google
      </button>

    </div>
  `;


  document
    .getElementById("googleLogin")
    .addEventListener(
      "click",
      async () => {

        const { error } =
          await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo:
                window.location.origin
            }
          });

        if (error) {
          alert(
            "Login failed: " +
            error.message
          );
        }

      }
    );
}


async function loadIncidents(userId) {

  const { data, error } =
    await supabase
      .from("incidents")
      .select("*")
      .eq("user_id", userId)
      .order(
        "created_at",
        {
          ascending: false
        }
      );

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}


async function renderDashboard(user) {

  const incidents =
    await loadIncidents(user.id);


  const openCount =
    incidents.filter(
      item =>
        item.status === "open"
    ).length;


  const resolvedCount =
    incidents.filter(
      item =>
        item.status === "resolved"
    ).length;


  const highCount =
    incidents.filter(
      item =>
        item.risk === "High"
    ).length;


  const totalCount =
    incidents.length;


  app.innerHTML = `

    <div class="container">


      <div class="topbar">

        <div>

          <div class="brand">
            Giri Cyber Tech
          </div>

          <div class="muted">
            AI-assisted Security Monitoring
          </div>

        </div>

        <button
          id="logout"
          class="danger"
        >
          Sign out
        </button>

      </div>


      <div class="stats">


        <div class="stat">

          <div class="muted">
            Total Incidents
          </div>

          <div class="stat-number">
            ${totalCount}
          </div>

        </div>


        <div class="stat">

          <div class="muted">
            Open Incidents
          </div>

          <div class="stat-number">
            ${openCount}
          </div>

        </div>


        <div class="stat">

          <div class="muted">
            Resolved
          </div>

          <div class="stat-number">
            ${resolvedCount}
          </div>

        </div>


        <div class="stat">

          <div class="muted">
            High Risk
          </div>

          <div class="stat-number">
            ${highCount}
          </div>

        </div>


      </div>


      <div class="card">

        <h2>
          Add Security Incident
        </h2>


        <form id="incidentForm">


          <label>
            Incident title
          </label>


          <input
            id="title"
            required
            placeholder="e.g. Suspicious Instagram DM"
          />


          <label>
            Message / incident details
          </label>


          <textarea
            id="message"
            required
            placeholder="Paste the suspicious message or describe the incident..."
          ></textarea>


          <label>
            Risk level
          </label>


          <select id="risk">

            <option value="Low">
              Low
            </option>

            <option
              value="Medium"
              selected
            >
              Medium
            </option>

            <option value="High">
              High
            </option>

          </select>


          <label>
            AI Assessment
          </label>


          <textarea
            id="assessment"
            placeholder="AI analysis will appear here..."
          ></textarea>


          <button
            type="button"
            id="analyzeBtn"
            class="primary"
            style="margin-top:12px;"
          >
            Analyze with AI
          </button>


          <br><br>


          <button
            class="primary"
            type="submit"
          >
            Save Incident
          </button>


        </form>

      </div>


      <div class="card">

        <h2>
          Incident History
        </h2>


        <div id="incidentHistory">


          ${
            incidents.length === 0

              ? `
                <p class="muted">
                  No incidents yet.
                </p>
              `

              : incidents
                  .map(
                    incident => {

                      const riskClass =
                        String(
                          incident.risk
                        ).toLowerCase();


                      const statusClass =
                        String(
                          incident.status
                        ).toLowerCase();


                      return `

                        <div class="incident">


                          <div class="incident-head">


                            <div>

                              <h3>
                                ${escapeHtml(
                                  incident.title
                                )}
                              </h3>


                              <span
                                class="badge ${riskClass}"
                              >
                                ${escapeHtml(
                                  incident.risk
                                )}
                                Risk
                              </span>


                              <span
                                class="badge ${statusClass}"
                              >
                                ${escapeHtml(
                                  incident.status
                                )}
                              </span>

                            </div>


                            <div class="muted">

                              ${new Date(
                                incident.created_at
                              ).toLocaleString()}

                            </div>


                          </div>


                          <div class="incident-message">

                            ${escapeHtml(
                              incident.message
                            )}

                          </div>


                          ${renderAIReport(
                            incident.assessment,
                            incident.risk
                          )}


                          ${
                            incident.status ===
                            "open"

                              ? `

                                <div class="actions">

                                  <button
                                    class="success resolveBtn"
                                    data-id="${incident.id}"
                                  >
                                    Mark Resolved
                                  </button>

                                </div>

                              `

                              : ""
                          }


                        </div>

                      `;

                    }
                  )
                  .join("")
          }


        </div>

      </div>


    </div>

  `;


  /*
   * LOGOUT
   */

  document
    .getElementById("logout")
    .addEventListener(
      "click",
      async () => {

        await supabase.auth.signOut();

        renderLogin();

      }
    );


  /*
   * AI ANALYSIS
   */

  document
    .getElementById("analyzeBtn")
    .addEventListener(
      "click",
      async () => {


        const message =
          document
            .getElementById("message")
            .value
            .trim();


        if (!message) {

          alert(
            "Please enter the suspicious message first."
          );

          return;
        }


        const button =
          document.getElementById(
            "analyzeBtn"
          );


        button.textContent =
          "Analyzing...";


        button.disabled = true;


        try {


          const response =
            await fetch(
              "/api/test",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json"
                },

                body:
                  JSON.stringify({
                    message
                  })
              }
            );


          const data =
            await response.json();


          if (!response.ok) {

            throw new Error(
              data.error ||
              "AI analysis failed"
            );

          }


          const analysis =
            data.analysis ||
            "No analysis returned";


          document
            .getElementById(
              "assessment"
            )
            .value =
              analysis;


          const riskMatch =
            analysis.match(
              /RISK:\s*(Low|Medium|High)/i
            );


          if (riskMatch) {

            const aiRisk =
              riskMatch[1]
                .charAt(0)
                .toUpperCase() +

              riskMatch[1]
                .slice(1)
                .toLowerCase();


            document
              .getElementById(
                "risk"
              )
              .value =
                aiRisk;

          }


        } catch (error) {

          alert(
            "AI analysis failed: " +
            error.message
          );

        } finally {

          button.textContent =
            "Analyze with AI";

          button.disabled =
            false;

        }

      }
    );


  /*
   * SAVE INCIDENT
   */

  document
    .getElementById(
      "incidentForm"
    )
    .addEventListener(
      "submit",
      async event => {


        event.preventDefault();


        const title =
          document
            .getElementById("title")
            .value
            .trim();


        const message =
          document
            .getElementById("message")
            .value
            .trim();


        const risk =
          document
            .getElementById("risk")
            .value;


        const assessment =
          document
            .getElementById("assessment")
            .value
            .trim();


        if (!title || !message) {

          alert(
            "Please fill in the title and message."
          );

          return;

        }


        const { error } =
          await supabase
            .from("incidents")
            .insert({

              user_id:
                user.id,

              title,

              message,

              risk,

              assessment,

              status:
                "open"

            });


        if (error) {

          alert(
            "Could not save incident: " +
            error.message
          );

          return;

        }


        alert(
          "Incident saved successfully ✅"
        );


        renderDashboard(user);

      }
    );


  /*
   * MARK RESOLVED
   */

  document
    .querySelectorAll(
      ".resolveBtn"
    )
    .forEach(button => {


      button.addEventListener(
        "click",
        async () => {


          const id =
            button.dataset.id;


          const { error } =
            await supabase
              .from("incidents")
              .update({

                status:
                  "resolved",

                updated_at:
                  new Date().toISOString()

              })
              .eq(
                "id",
                id
              )
              .eq(
                "user_id",
                user.id
              );


          if (error) {

            alert(
              "Could not resolve incident: " +
              error.message
            );

            return;

          }


          renderDashboard(user);

        }
      );

    });

}


async function startApp() {


  const {
    data: {
      session
    }
  } =
    await supabase.auth.getSession();


  if (session?.user) {

    await renderDashboard(
      session.user
    );

  } else {

    renderLogin();

  }


  supabase.auth.onAuthStateChange(
    async (_event, session) => {


      if (session?.user) {

        await renderDashboard(
          session.user
        );

      } else {

        renderLogin();

      }

    }
  );

}


startApp();
