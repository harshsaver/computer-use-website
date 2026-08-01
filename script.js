const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const lifeDots = document.querySelector("[data-life-dots]");
const requestDialog = document.querySelector("[data-request-dialog]");
const requestForm = document.querySelector("[data-request-form]");
const openRequestButtons = document.querySelectorAll("[data-open-request]");
const closeRequestButtons = document.querySelectorAll("[data-close-request]");
const shareButton = document.querySelector("[data-share-project]");
const shareStatus = document.querySelector("[data-share-status]");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -4% 0px" },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const dotPositions = [
  [47, 36], [55, 27], [62, 36], [70, 43], [77, 53], [73, 64],
  [65, 70], [56, 76], [47, 70], [40, 75], [34, 65], [29, 55],
  [33, 43], [39, 31], [52, 52], [61, 57], [43, 57], [57, 42],
];

dotPositions.forEach(([x, y], index) => {
  const dot = document.createElement("span");
  dot.className = "life-dot";
  dot.style.left = `${x}%`;
  dot.style.top = `${y}%`;
  dot.style.setProperty("--delay", `${-(index * 0.29)}s`);
  dot.style.setProperty("--duration", `${3.2 + (index % 5) * 0.45}s`);
  lifeDots?.appendChild(dot);
});

const openRequestDialog = () => {
  if (!requestDialog) return;

  if (typeof requestDialog.showModal === "function") {
    requestDialog.showModal();
  } else {
    requestDialog.setAttribute("open", "");
  }
};

const closeRequestDialog = () => {
  if (!requestDialog) return;

  if (typeof requestDialog.close === "function") {
    requestDialog.close();
  } else {
    requestDialog.removeAttribute("open");
  }

  if (window.location.hash === "#participant-request") {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }
};

openRequestButtons.forEach((button) => {
  button.addEventListener("click", openRequestDialog);
});

closeRequestButtons.forEach((button) => {
  button.addEventListener("click", closeRequestDialog);
});

requestDialog?.addEventListener("click", (event) => {
  if (event.target === requestDialog) closeRequestDialog();
});

if (window.location.hash === "#participant-request") {
  openRequestDialog();
}

window.addEventListener("hashchange", () => {
  if (window.location.hash === "#participant-request" && !requestDialog?.open) {
    openRequestDialog();
  }
});

requestForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!requestForm.reportValidity()) return;

  const formData = new FormData(requestForm);
  const relationship = formData.get("relationship");
  const publicName = formData.get("publicName");
  const reason = formData.get("reason");
  const materials = Array.from(requestForm.querySelectorAll("[data-material]:checked"))
    .map((input) => input.value);
  const materialList = materials.length
    ? materials.map((material) => `- ${material}`).join("\n")
    : "- None specified at this stage";

  const title = `[Participant request] ${publicName}`;
  const body = `## Proposed participant

**Public name or alias:** ${publicName}

**Submitted for:** ${relationship}

## Why this life may be useful to study

${reason}

## Material they may voluntarily contribute

${materialList}

## Confirmations

- [x] I am this person, or I have their explicit permission to submit this public request.
- [x] I understand that a research persona would be a model—not the person, a conscious copy, or a promise of immortality.
- [x] I have not included private contact details or sensitive records in this public request.

---
Submitted through december.dev · Wega Labs participant registry`;

  const issueUrl = new URL("https://github.com/harshsaver/computer-use-website/issues/new");
  issueUrl.searchParams.set("title", title);
  issueUrl.searchParams.set("body", body);

  const issueLink = document.createElement("a");
  issueLink.href = issueUrl.toString();
  issueLink.target = "_blank";
  issueLink.rel = "noreferrer noopener";
  issueLink.click();

  closeRequestDialog();
});

shareButton?.addEventListener("click", async () => {
  const shareData = {
    title: "December by Wega Labs",
    text: "An open research program studying what makes a person remain the same person through change.",
    url: "https://december.dev",
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      if (shareStatus) shareStatus.textContent = "Shared";
    } else {
      await navigator.clipboard.writeText(shareData.url);
      if (shareStatus) shareStatus.textContent = "Link copied";
    }
  } catch (error) {
    if (error?.name !== "AbortError" && shareStatus) {
      shareStatus.textContent = "Copy december.dev";
    }
  }
});
