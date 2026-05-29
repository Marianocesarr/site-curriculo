/* Chart.js global defaults */
const CHART_COLORS = {
  yellow: "#f9b800",
  yellowAlpha: "rgba(249, 184, 0, 0.25)",
  charcoal: "#2c2c2c",
  charcoalAlpha: "rgba(44, 44, 44, 0.7)",
  gray: "#e0e0e0",
};

Chart.defaults.font.family = "'Montserrat', sans-serif";
Chart.defaults.color = "#555";

function initCharts() {
  const radarCtx = document.getElementById("radarChart");
  const doughnutCtx = document.getElementById("doughnutChart");
  const barCtx = document.getElementById("barChart");

  if (!radarCtx || !doughnutCtx || !barCtx) return;

  new Chart(radarCtx, {
    type: "radar",
    data: {
      labels: [
        "Vendas B2B",
        "Negociação",
        "CRM",
        "Análise de dados",
        "Liderança",
        "Planejamento",
      ],
      datasets: [
        {
          label: "Nível (%)",
          data: [94, 95, 88, 85, 93, 90],
          backgroundColor: CHART_COLORS.yellowAlpha,
          borderColor: CHART_COLORS.yellow,
          borderWidth: 2,
          pointBackgroundColor: CHART_COLORS.yellow,
          pointBorderColor: "#fff",
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: { stepSize: 20, display: false },
          grid: { color: "#e8e8e8" },
          angleLines: { color: "#e8e8e8" },
          pointLabels: { font: { size: 10, weight: "600" } },
        },
      },
      plugins: {
        legend: { display: false },
      },
    },
  });

  new Chart(doughnutCtx, {
    type: "doughnut",
    data: {
      labels: ["Vendas", "Gestão", "Análise", "Relacionamento"],
      datasets: [
        {
          data: [32, 28, 22, 18],
          backgroundColor: [
            CHART_COLORS.yellow,
            CHART_COLORS.charcoal,
            "#f5d76e",
            "#6b6b6b",
          ],
          borderWidth: 0,
          hoverOffset: 8,
        },
      ],
    },
    options: {
      responsive: true,
      cutout: "62%",
      plugins: {
        legend: {
          position: "bottom",
          labels: { padding: 12, usePointStyle: true, font: { size: 11 } },
        },
      },
    },
  });

  new Chart(barCtx, {
    type: "bar",
    data: {
      labels: ["Q2/25", "Q3/25", "Q4/25", "Q1/26"],
      datasets: [
        {
          label: "Meta (R$ mil)",
          data: [280, 310, 340, 365],
          backgroundColor: CHART_COLORS.gray,
          borderRadius: 4,
        },
        {
          label: "Realizado (R$ mil)",
          data: [295, 325, 358, 378],
          backgroundColor: CHART_COLORS.yellow,
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "#eee" },
        },
        x: { grid: { display: false } },
      },
      plugins: {
        legend: {
          position: "top",
          labels: { usePointStyle: true },
        },
      },
    },
  });
}

function animateSkillBars() {
  const bars = document.querySelectorAll(".skill-bar");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const bar = entry.target;
        const level = bar.dataset.level || "0";
        const fill = bar.querySelector(".skill-bar__fill");
        if (fill) {
          fill.style.width = `${level}%`;
          fill.style.setProperty("--print-width", `${level}%`);
        }
        observer.unobserve(bar);
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach((bar) => observer.observe(bar));
}

function revealSections() {
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupPrint() {
  const btn = document.getElementById("btnPrint");
  if (!btn) return;
  btn.addEventListener("click", () => window.print());
}

document.addEventListener("DOMContentLoaded", () => {
  initCharts();
  animateSkillBars();
  revealSections();
  setupPrint();
});
