const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const lifeDots = document.querySelector("[data-life-dots]");

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
    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
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
