const config = window.APP_CONFIG || {};

const form = document.querySelector("#analyze-form");
const urlInput = document.querySelector("#youtube-url");
const urlError = document.querySelector("#url-error");
const analyzeButton = document.querySelector("#analyze-button");
const loading = document.querySelector("#loading");
const results = document.querySelector("#results");
const loadingSteps = Array.from(document.querySelectorAll(".loading-step"));

const gateForm = document.querySelector("#gate-form");
const emailInput = document.querySelector("#email");
const nameInput = document.querySelector("#name");
const emailWarning = document.querySelector("#email-warning");
const gateStatus = document.querySelector("#gate-status");
const storyLocked = document.querySelector("#story-locked");
const storyUnlocked = document.querySelector("#story-unlocked");
const downloadMock = document.querySelector("#download-mock");

let loadingTimer = null;
let loadingIndex = 0;
let latestAnalysis = null;

const personalDomains = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "proton.me",
  "protonmail.com"
];

const mockAnalysis = {
  audience: {
    primary: "APAC B2B leaders in mid-market firms seeking pipeline efficiency.",
    pain: "Inconsistent lead quality, long sales cycles, underperforming content.",
    intent: "Looking for measurable, revenue-tied content strategy outcomes.",
    drivers: "Proof of ROI, speed to impact, leadership alignment."
  },
  retention: {
    dropOffs: [
      { time: "00:35", note: "Intro exceeds typical patience window." },
      { time: "02:10", note: "First proof point appears too late." },
      { time: "04:40", note: "CTA transitions without recap." }
    ]
  },
  storyTree: {
    awareness: [
      {
        title: "Industry truth video",
        detail: "Why APAC B2B demand gen stalls at 30 days, and how to fix it."
      },
      {
        title: "Founder POV",
        detail: "The 3 signals we watch before a pipeline breaks."
      }
    ],
    consideration: [
      {
        title: "Proof breakdown",
        detail: "A 90-day content sprint that moved revenue forward."
      },
      {
        title: "Method video",
        detail: "How to structure content briefs for sales alignment."
      }
    ],
    conversion: [
      {
        title: "Offer spotlight",
        detail: "Inside the 8k trial package: outcomes, timelines, scope."
      }
    ]
  }
};

function isValidYoutubeUrl(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.replace("www.", "");
    if (host !== "youtube.com" && host !== "youtu.be" && host !== "m.youtube.com") {
      return false;
    }
    if (host === "youtu.be") {
      return url.pathname.length > 1;
    }
    return (
      url.pathname.startsWith("/watch") ||
      url.pathname.startsWith("/shorts") ||
      url.pathname.startsWith("/live") ||
      url.pathname.startsWith("/embed")
    );
  } catch (error) {
    return false;
  }
}

function setLoading(active) {
  if (active) {
    loading.classList.add("active");
    loadingIndex = 0;
    loadingSteps.forEach((step) => step.classList.remove("active"));
    loadingSteps[0].classList.add("active");
    loadingTimer = window.setInterval(() => {
      loadingSteps[loadingIndex].classList.remove("active");
      loadingIndex = (loadingIndex + 1) % loadingSteps.length;
      loadingSteps[loadingIndex].classList.add("active");
    }, 1100);
  } else {
    loading.classList.remove("active");
    window.clearInterval(loadingTimer);
  }
}

function renderAudience(audience) {
  document.querySelector("#audience-primary").textContent = audience.primary;
  document.querySelector("#audience-pain").textContent = audience.pain;
  document.querySelector("#audience-intent").textContent = audience.intent;
  document.querySelector("#audience-drivers").textContent = audience.drivers;
}

function renderRetention(retention) {
  const list = document.querySelector("#retention-list");
  list.innerHTML = "";
  retention.dropOffs.forEach((drop) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${drop.time}</strong> ${drop.note}`;
    list.appendChild(item);
  });
}

function renderStoryTree(tree) {
  const awareness = document.querySelector("#story-awareness");
  const consideration = document.querySelector("#story-consideration");
  const conversion = document.querySelector("#story-conversion");

  const fillList = (listEl, items) => {
    listEl.innerHTML = "";
    items.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.title}</strong><p>${item.detail}</p>`;
      listEl.appendChild(li);
    });
  };

  fillList(awareness, tree.awareness);
  fillList(consideration, tree.consideration);
  fillList(conversion, tree.conversion);
}

async function analyzeVideo(url) {
  if (config.USE_MOCK_ANALYSIS) {
    await new Promise((resolve) => setTimeout(resolve, 1800));
    return mockAnalysis;
  }

  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });

  if (!response.ok) {
    throw new Error("Analysis failed");
  }

  return response.json();
}

async function saveAnalysis(url, analysis) {
  if (!config.SUPABASE_URL || !config.SUPABASE_ANON_KEY) {
    return;
  }

  const payload = {
    video_url: url,
    analysis_json: analysis,
    status: "complete",
    created_at: new Date().toISOString()
  };

  await fetch(`${config.SUPABASE_URL}/rest/v1/${config.SUPABASE_ANALYSES_TABLE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: config.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify(payload)
  });
}

async function saveLead(payload) {
  if (!config.SUPABASE_URL || !config.SUPABASE_ANON_KEY) {
    return;
  }

  await fetch(`${config.SUPABASE_URL}/rest/v1/${config.SUPABASE_LEADS_TABLE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: config.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify(payload)
  });
}

function isPersonalDomain(email) {
  const domain = email.split("@")[1] || "";
  return personalDomains.includes(domain.toLowerCase());
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  urlError.textContent = "";

  const url = urlInput.value.trim();
  if (!isValidYoutubeUrl(url)) {
    urlError.textContent = "Please enter a valid YouTube link.";
    return;
  }

  analyzeButton.disabled = true;
  setLoading(true);

  try {
    const analysis = await analyzeVideo(url);
    latestAnalysis = analysis;
    renderAudience(analysis.audience);
    renderRetention(analysis.retention);
    renderStoryTree(analysis.storyTree);
    results.classList.add("active");
    results.scrollIntoView({ behavior: "smooth", block: "start" });
    await saveAnalysis(url, analysis);
  } catch (error) {
    urlError.textContent = "We could not analyze that video. Please try another link.";
  } finally {
    analyzeButton.disabled = false;
    setLoading(false);
  }
});

emailInput.addEventListener("input", () => {
  const value = emailInput.value.trim();
  if (!value) {
    emailWarning.textContent = "";
    return;
  }
  if (isPersonalDomain(value)) {
    emailWarning.textContent = "Personal email detected. Work emails perform best.";
  } else {
    emailWarning.textContent = "";
  }
});

gateForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  gateStatus.textContent = "";

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  if (!name || !email) {
    gateStatus.textContent = "Please enter your name and work email.";
    return;
  }

  const payload = {
    name,
    email,
    video_url: urlInput.value.trim(),
    consent: Boolean(document.querySelector("#consent").checked),
    is_personal_domain: isPersonalDomain(email),
    unlocked_at: new Date().toISOString()
  };

  const unlockButton = document.querySelector("#unlock-button");
  unlockButton.disabled = true;
  gateStatus.textContent = "Unlocking your story tree...";

  try {
    await saveLead(payload);
    storyLocked.hidden = true;
    storyUnlocked.hidden = false;
    gateStatus.textContent = "";
  } catch (error) {
    gateStatus.textContent = "Something went wrong. Please try again.";
  } finally {
    unlockButton.disabled = false;
  }
});

downloadMock.addEventListener("click", () => {
  const url = config.PDF_DOWNLOAD_URL;
  if (!url) {
    window.alert("PDF delivery is connected to email in production.");
    return;
  }
  window.open(url, "_blank");
});
