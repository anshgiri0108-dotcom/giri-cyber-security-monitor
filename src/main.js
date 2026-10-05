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

  .security-status {
    background: #ffffff;
    border: 1px solid #dfe7e2;
    border-radius: 14px;
    padding: 14px 18px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 4px 18px rgba(0,0,0,0.04);
  }

  .status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #20a45a;
    flex-shrink: 0;
  }

  .status-title {
    font-weight: 700;
    color: #172033;
  }

  .status-text {
    font-size: 13px;
    color: #687386;
    margin-top: 3px;
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
    background: white;
  }

  textarea {
    min-height: 130px;
    resize: vertical;
  }

  .filters {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 12px;
    margin-bottom: 18px;
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

  .no-results {
    text-align: center;
    padding: 25px;
    color: #687386;
  }

  .filter-label {
    margin-top: 0;
  }

  .security-check-list {
    margin-top: 18px;
  }

  .security-check-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    padding: 15px 0;
    border-bottom: 1px solid #e8ecf2;
  }

  .security-check-row:last-child {
    border-bottom: none;
  }

  .security-check-name {
    font-weight: 600;
  }

  .security-check-help {
    font-size: 13px;
    color: #687386;
    margin-top: 4px;
  }

  .security-check-select {
    width: 190px;
    flex-shrink: 0;
  }

  .overall-security {
    margin-top: 18px;
    padding: 15px;
    border-radius: 12px;
    font-weight: 700;
  }

  .overall-secure {
    background: #eaf8ef;
    color: #16803c;
  }

  .overall-attention {
    background: #fff3d6;
    color: #9a6500;
  }

  .security-note {
    background: #f7f9fc;
    padding: 12px;
    border-radius: 10px;
    margin-top: 15px;
    color: #687386;
    font-size: 13px;
    line-height: 1.5;
  }

  @media (max-width: 850px) {
    .stats {
      grid-template-columns: repeat(2, 1fr);
    }

    .filters {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    .security-check-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .security-check-select {
      width: 100%;
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

async function loadSecurityCheck(userId) {

  const { data, error } =
    await supabase
      .from("security_checks")
      .select("*")
      .eq("user_id", userId)
      .order(
        "created_at",
        {
          ascending: false
        }
      )
      .limit(1);

  if (error) {
    console.error(error);
    return null;
  }

  return data?.[0] || null;
}

function getSecurityDefaults() {

  return {
    two_factor: "needs_attention",
    password_security: "needs_attention",
    recovery_email: "needs_attention",
    recovery_phone: "needs_attention",
    connected_apps: "needs_attention",
    unknown_logins: "needs_attention",
    phishing_awareness: "needs_attention"
  };
}

function getOverallSecurityStatus(check) {

  if (!check) {
    return "needs_attention";
  }

  const fields = [
    "two_factor",
    "password_security",
    "recovery_email",
    "recovery_phone",
    "connected_apps",
    "unknown_logins",
    "phishing_awareness"
  ];

  const allSecure =
    fields.every(
      field =>
        check[field] === "secure"
    );

  return allSecure
    ? "secure"
    : "needs_attention";
}

function renderSecurityCheck(check) {

  const current =
    check || getSecurityDefaults();

  const overall =
    getOverallSecurityStatus(current);

  const overallClass =
    overall === "secure"
      ? "overall-secure"
      : "overall-attention";

  const overallText =
    overall === "secure"
      ? "Overall Security Status: Secure"
      : "Overall Security Status: Needs Attention";

  return `
    <div class="card">

      <h2>
        🔐 Account Security Check
      </h2>

      <p class="muted">
        Review important account-security settings. You control the account yourself; no password, OTP or recovery code is required.
      </p>

      <div class="security-check-list">

        <div class="security-check-row">
          <div>
            <div class="security-check-name">
              Two-Factor Authentication (2FA)
            </div>
            <div class="security-check-help">
              Check whether an additional login verification method is enabled.
            </div>
          </div>

          <select
            class="security-check-select"
            data-security-field="two_factor"
          >
            <option
              value="needs_attention"
              ${current.two_factor === "needs_attention" ? "selected" : ""}
            >
              Needs Attention
            </option>

            <option
              value="secure"
              ${current.two_factor === "secure" ? "selected" : ""}
            >
              Secure
            </option>
          </select>
        </div>

        <div class="security-check-row">
          <div>
            <div class="security-check-name">
              Password Security
            </div>
            <div class="security-check-help">
              Review whether the account uses a strong, unique password.
            </div>
          </div>

          <select
            class="security-check-select"
            data-security-field="password_security"
          >
            <option
              value="needs_attention"
              ${current.password_security === "needs_attention" ? "selected" : ""}
            >
              Needs Attention
            </option>

            <option
              value="secure"
              ${current.password_security === "secure" ? "selected" : ""}
            >
              Secure
            </option>
          </select>
        </div>

        <div class="security-check-row">
          <div>
            <div class="security-check-name">
              Recovery Email
            </div>
            <div class="security-check-help">
              Check that the recovery email is present and accessible.
            </div>
          </div>

          <select
            class="security-check-select"
            data-security-field="recovery_email"
          >
            <option
              value="needs_attention"
              ${current.recovery_email === "needs_attention" ? "selected" : ""}
            >
              Needs Attention
            </option>

            <option
              value="secure"
              ${current.recovery_email === "secure" ? "selected" : ""}
            >
              Secure
            </option>
          </select>
        </div>

        <div class="security-check-row">
          <div>
            <div class="security-check-name">
              Recovery Phone
            </div>
            <div class="security-check-help">
              Check that a recovery phone is available when appropriate.
            </div>
          </div>

          <select
            class="security-check-select"
            data-security-field="recovery_phone"
          >
            <option
              value="needs_attention"
              ${current.recovery_phone === "needs_attention" ? "selected" : ""}
            >
              Needs Attention
            </option>

            <option
              value="secure"
              ${current.recovery_phone === "secure" ? "selected" : ""}
            >
              Secure
            </option>
          </select>
        </div>

        <div class="security-check-row">
          <div>
            <div class="security-check-name">
              Connected Apps
            </div>
            <div class="security-check-help">
              Review third-party apps and remove anything unexpected.
            </div>
          </div>

          <select
            class="security-check-select"
            data-security-field="connected_apps"
          >
            <option
              value="needs_attention"
              ${current.connected_apps === "needs_attention" ? "selected" : ""}
            >
              Needs Attention
            </option>

            <option
              value="secure"
              ${current.connected_apps === "secure" ? "selected" : ""}
            >
              Secure
            </option>
          </select>
        </div>

        <div class="security-check-row">
          <div>
            <div class="security-check-name">
              Unknown Logins / Devices
            </div>
            <div class="security-check-help">
              Check recent login activity for devices or sessions you do not recognize.
            </div>
          </div>

          <select
            class="security-check-select"
            data-security-field="unknown_logins"
          >
            <option
              value="needs_attention"
              ${current.unknown_logins === "needs_attention" ? "selected" : ""}
            >
              Needs Attention
            </option>

            <option
              value="secure"
              ${current.unknown_logins === "secure" ? "selected" : ""}
            >
              Secure
            </option>
          </select>
        </div>

        <div class="security-check-row">
          <div>
            <div class="security-check-name">
              Phishing Awareness
            </div>
            <div class="security-check-help">
              Review common phishing warning signs and safe response steps.
            </div>
          </div>

          <select
            class="security-check-select"
            data-security-field="phishing_awareness"
          >
            <option
              value="needs_attention"
              ${current.phishing_awareness === "needs_attention" ? "selected" : ""}
            >
              Needs Attention
            </option>

            <option
              value="secure"
              ${current.phishing_awareness === "secure" ? "selected" : ""}
            >
              Secure
            </option>
          </select>
        </div>

      </div>

      <div
        id="overallSecurityStatus"
        class="overall-security ${overallClass}"
      >
        ${overallText}
      </div>

      <div class="actions">

        <button
          id="saveSecurityCheck"
          class="primary"
        >
          Save Security Check
        </button>

      </div>

      <div class="security-note">
        Security checks are guidance based on information reviewed by the account owner. They are not a guarantee that an account is completely secure.
      </div>

    </div>
  `;
}

function renderIncidentList(
  incidents,
  searchText,
  riskFilter,
  statusFilter
) {

  const search =
    searchText
      .trim()
      .toLowerCase();

  const filtered =
    incidents.filter(
      incident => {

        const matchesSearch =
          !search ||
          String(
            incident.title || ""
          )
            .toLowerCase()
            .includes(search) ||
          String(
            incident.message || ""
          )
            .toLowerCase()
            .includes(search) ||
          String(
            incident.assessment || ""
          )
            .toLowerCase()
            .includes(search);

        const matchesRisk =
          riskFilter === "all" ||
          incident.risk === riskFilter;

        const matchesStatus =
          statusFilter === "all" ||
          incident.status === statusFilter;

        return (
          matchesSearch &&
          matchesRisk &&
          matchesStatus
        );
      }
    );

  if (filtered.length === 0) {

    return `
      <div class="no-results">
        No incidents match the selected filters.
      </div>
    `;
  }

  return filtered
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

            <div class="actions">

              ${
                incident.status ===
                "open"

                  ? `
                    <button
                      class="success resolveBtn"
                      data-id="${incident.id}"
                    >
                      Mark Resolved
                    </button>
                  `

                  : ""
                            <button
                class="danger deleteBtn"
                data-id="${incident.id}"
              >
                Delete
              </button>

            </div>

          </div>

        `;
      }
    )
    .join("");
}

async function renderDashboard(user) {

  const incidents =
    await loadIncidents(user.id);

  const securityCheck =
    await loadSecurityCheck(user.id);

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

      <div class="security-status">

        <div class="status-dot"></div>

        <div>
          <div class="status-title">
            Security Monitoring Active
          </div>

          <div class="status-text">
            Your incident monitoring dashboard is operational.
          </div>
        </div>

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

      ${renderSecurityCheck(securityCheck)}

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

        <div class="filters">

          <div>

            <label class="filter-label">
              Search
            </label>

            <input
              id="searchInput"
              type="text"
              placeholder="Search incidents..."
            />

          </div>

          <div>

            <label class="filter-label">
              Risk Level
            </label>

            <select id="riskFilter">

              <option value="all">
                All Risks
              </option>

              <option value="Low">
                Low
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="High">
                High
              </option>

            </select>

          </div>

          <div>

            <label class="filter-label">
              Status
            </label>

            <select id="statusFilter">

              <option value="all">
                All Status
              </option>

              <option value="open">
                Open
              </option>

              <option value="resolved">
                Resolved
              </option>

            </select>

          </div>

        </div>

        <div id="incidentHistory">

          ${renderIncidentList(
            incidents,
            "",
            "all",
            "all"
          )}

        </div>

      </div>

    </div>

  `;

  document
    .getElementById("logout")
    .addEventListener(
      "click",
      async () => {

        await supabase.auth.signOut();

        renderLogin();

      }
    );

  document
    .querySelectorAll(
      ".security-check-select"
    )
    .forEach(select => {

      select.addEventListener(
        "change",
        () => {

          const values = {};

          document
            .querySelectorAll(
              ".security-check-select"
            )
            .forEach(item => {

              values[
                item.dataset.securityField
              ] = item.value;

            });

          const overall =
            getOverallSecurityStatus(
              values
            );

          const overallElement =
            document.getElementById(
              "overallSecurityStatus"
            );

          if (!overallElement) {
            return;
          }

          if (overall === "secure") {

            overallElement.className =
              "overall-security overall-secure";

            overallElement.textContent =
              "Overall Security Status: Secure";

          } else {

            overallElement.className =
              "overall-security overall-attention";

            overallElement.textContent =
              "Overall Security Status: Needs Attention";

          }

        }
      );

    });

  document
    .getElementById(
      "saveSecurityCheck"
    )
    .addEventListener(
      "click",
      async () => {

        const values = {};

        document
          .querySelectorAll(
            ".security-check-select"
          )
          .forEach(select => {

            values[
              select.dataset.securityField
            ] = select.value;

          });

        const overall =
          getOverallSecurityStatus(
            values
          );

        const existing =
          await loadSecurityCheck(
            user.id
          );

        let error;

        if (existing) {

          const result =
            await supabase
              .from("security_checks")
              .update({
                ...values,
                overall_status:
                  overall,
                updated_at:
                  new Date().toISOString()
              })
              .eq(
                "id",
                existing.id
              )
              .eq(
                "user_id",
                user.id
              );

          error = result.error;

        } else {

          const result =
            await supabase
              .from("security_checks")
              .insert({
                user_id:
                  user.id,
                ...values,
                overall_status:
                  overall
              });

          error = result.error;

        }

        if (error) {

          alert(
            "Could not save security check: " +
            error.message
          );

          return;
        }

        alert(
          "Security check saved successfully ✅"
        );

        await renderDashboard(user);

      }
    );

  const searchInput =
    document.getElementById(
      "searchInput"
    );

  const riskFilter =
    document.getElementById(
      "riskFilter"
    );

  const statusFilter =
    document.getElementById(
      "statusFilter"
    );

  const incidentHistory =
    document.getElementById(
      "incidentHistory"
    );

  function updateFilters() {

    incidentHistory.innerHTML =
      renderIncidentList(
        incidents,
        searchInput.value,
        riskFilter.value,
        statusFilter.value
      );

    attachIncidentButtons();

  }

  searchInput.addEventListener(
    "input",
    updateFilters
  );

  riskFilter.addEventListener(
    "change",
    updateFilters
  );

  statusFilter.addEventListener(
    "change",
    updateFilters
  );

  function attachIncidentButtons() {

    document
      .querySelectorAll(
        ".deleteBtn"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          async () => {

            const confirmed =
              confirm(
                "Are you sure you want to permanently delete this incident?"
              );

            if (!confirmed) {
              return;
            }

            const id =
              button.dataset.id;

            const { error } =
              await supabase
                .from("incidents")
                .delete()
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
                "Could not delete incident: " +
                error.message
              );

              return;
            }

            alert(
              "Incident deleted successfully ✅"
            );

            renderDashboard(user);

          }
        );

      });

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

  attachIncidentButtons();

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

        button.disabled =
          true;

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
            "Please enter the incident title and message."
          );

          return;
        }

        if (!assessment) {

          alert(
            "Please analyze the incident with AI before saving."
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
