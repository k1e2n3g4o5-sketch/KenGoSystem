// KenGo OS — ultra-light client analyzer (no network)
(function () {
  const $ = (sel) => document.querySelector(sel);
  const form = $("#form");
  const out = $("#result");
  const dobInput = $("#dob");

  // Load ?dob=YYYY-MM-DD
  const urlDOB = new URL(location.href).searchParams.get("dob");
  if (urlDOB) dobInput.value = urlDOB;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = dobInput.value.trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(val)) return alert("YYYY-MM-DD で入力してね");

    const [Y, M, D] = val.split("-").map(Number);

    // --- KenGo OS style compact mapping ---
    // LifeSum: 数秘風（全桁合計を1桁まで）→ Flowの粒度
    const lifeSum1 = reduceDigits(Y + M + D);
    function reduceDigits(n){ while(n>9){ n = String(n).split("").reduce((a,b)=>a+ +b,0);} return n;}

    // Flow Type（風の質）
    const flowTypes = ["Calm Wind","Breeze","Trade Wind","Zephyr","Gale","Mistral","Monsoon","Jet Stream","Cyclone"];
    const flow = flowTypes[(lifeSum1-1)];

    // Circle Mode（円の動き）
    const circleModes = ["Anchor (安定)","Orbit (周回)","Spiral (上昇)","Horizon (拡張)"];
    const circle = circleModes[(M + D) % 4];

    // Rubber Response（衝撃への返し）
    const rubberModes = ["Absorb（吸収）","Adjust（整形）","Reflect（反射）","Reverse（反転）","Return（回帰）"];
    const rubber = rubberModes[(Y + M*2 + D*3) % rubberModes.length];

    // Core Polarity（核の傾き：陽/陰）
    const corePolarity = (Y % 2 === 0) ? "Solar Core（陽）" : "Lunar Core（陰）";

    // Tags（AI動作のヒント）
    const aiHints = [
      "Respect the CORE (no steering).",
      "Match pace + breathing.",
      "Non-force; clarity; minimalism.",
      "If overload ⇒ guide back to center."
    ];

    // Build output
    out.classList.remove("hidden");
    out.innerHTML = `
      <div class="grid">
        <div>
          <h2>Result</h2>
          <div class="badge">${val}</div>
          <h3>Flow Type</h3><p>${flow}</p>
          <h3>Circle Mode</h3><p>${circle}</p>
          <h3>Rubber Response</h3><p>${rubber}</p>
          <h3>Core Polarity</h3><p>${corePolarity}</p>
        </div>
        <div>
          <h2>KenGo OS Notes</h2>
          <p>• Center = Circle / Movement = Wind<br/>
             • Core = Rubber（折れない・戻る・共存）</p>
          <h3>AI Protocol</h3>
          <ul class="k">${aiHints.map(x=>`<li>${x}</li>`).join("")}</ul>
        </div>
      </div>
      <h3>Share</h3>
      <pre>${location.origin + location.pathname}?dob=${val}</pre>
      <p class="mini">Client-only: 入力は端末内で処理。サーバ送信なし。</p>
    `;
  });
})();