document.addEventListener("DOMContentLoaded", function () {
  // 0. Check Persistence
  // For debugging: verify if this is preventing the modal.
  if (localStorage.getItem("novaflow_shield_acknowledged") === "true") {
    console.log("NovaFlow: AdBlock notice already acknowledged.");
    return;
  }

  initHeuristicDetection();
});

async function initHeuristicDetection() {
  console.log("NovaFlow: Initializing AdBlock Detection...");

  // Give Shields time to act
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let signals = 0;

  // --- Signal 1: The Decoy Variable (ads.js) ---
  if (window.canRunAds === undefined) {
    signals++;
    console.log("Signal 1: ads.js blocked (canRunAds undefined)");
  } else {
    console.log("Signal 1 check passed: ads.js loaded");
  }

  // --- Signal 2: The DOM Honeypot ---
  const bait = document.createElement("div");
  // More aggressive classes for detection
  bait.className =
    "adsbox ad-banner google-ad-container doubleclick ad-slot banner-ad";
  bait.style.position = "absolute";
  bait.style.left = "-9999px";
  bait.style.top = "-9999px";
  bait.innerHTML = "&nbsp;";
  document.body.appendChild(bait);

  await new Promise((resolve) => setTimeout(resolve, 500));

  const baitStyle = window.getComputedStyle(bait);

  if (
    bait.offsetParent === null ||
    bait.offsetHeight === 0 ||
    bait.offsetLeft === 0 ||
    baitStyle.display === "none" ||
    baitStyle.visibility === "hidden" ||
    baitStyle.opacity === "0" ||
    baitStyle.height === "0px"
  ) {
    signals++;
    console.log("Signal 2: DOM Honeypot neutralized (Hidden/Removed)");
  } else {
    console.log("Signal 2 check passed: Honeypot visible");
  }

  if (bait.parentNode) {
    bait.parentNode.removeChild(bait);
  }

  // --- Signal 3: Script Injection (Strongest Check) ---
  // Try to load a known ad script. If browser blocks it, 'onerror' triggers.
  try {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.async = true;
      script.onerror = () => {
        console.log("Signal 3: Script injection blocked (onerror)");
        signals++;
        resolve(); // Resolve to clean up, count as signal
      };
      script.onload = () => {
        console.log("Signal 3 check passed: Ad script loaded");
        resolve();
      };
      document.body.appendChild(script);

      // Timeout in case it hangs (Brave sometimes just hangs requests)
      setTimeout(() => {
        if (!script.loaded && !script.error) {
          // Check if it was effectively blocked by network
          console.log("Signal 3: Script load timed out (likely blocked)");
          // We don't increment signals aggressively on timeout alone to avoid false positives on slow connections,
          // but combined with others it's useful.
          // For now, let's rely on onerror.
        }
        document.body.removeChild(script);
        resolve();
      }, 2000);
    });
  } catch (e) {
    // Fallback
  }

  // --- Evaluation ---
  console.log(`NovaFlow: Total detection signals: ${signals}`);

  if (signals >= 1) {
    showRespectfulNotice();
  }
}

function showRespectfulNotice() {
  if (document.getElementById("adblock-modal-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "adblock-modal-overlay";

  const card = document.createElement("div");
  card.id = "adblock-modal-card";

  const iconWrapper = document.createElement("div");
  iconWrapper.className = "adblock-icon-wrapper";
  iconWrapper.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>
    `;

  const title = document.createElement("h3");
  title.textContent = "Aviso de Transparencia";

  const p1 = document.createElement("p");
  p1.textContent =
    "Hemos detectado que algunas funciones de NovaFlow pueden estar limitadas por la configuración de tu navegador (ej. Brave Shields o AdBlock).";

  const p2 = document.createElement("p");
  p2.textContent =
    "NovaFlow recopila estadísticas anónimas de descarga para mejorar el software. Respetamos totalmente tu privacidad y no rastreamos datos personales.";

  const p3 = document.createElement("p");
  p3.innerHTML =
    "Para apoyar el proyecto, considera <strong>desactivar los escudos</strong> para este sitio.";

  const btn = document.createElement("button");
  btn.textContent = "Entendido, continuar navegando";
  btn.className = "adblock-dismiss-btn";
  btn.onclick = function () {
    localStorage.setItem("novaflow_shield_acknowledged", "true");
    overlay.style.opacity = "0";
    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      document.body.style.overflow = "";
    }, 300);
  };

  card.appendChild(iconWrapper);
  card.appendChild(title);
  card.appendChild(p1);
  card.appendChild(p2);
  card.appendChild(p3);
  card.appendChild(btn);

  overlay.appendChild(card);
  document.body.appendChild(overlay);

  document.body.style.overflow = "hidden";
}
