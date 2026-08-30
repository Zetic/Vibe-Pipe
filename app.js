const PROJECTS_URL = "./projects.json";
const FALLBACK_IMAGE = "./assets/project-placeholder.svg";

const grid = document.querySelector("#project-grid");
const emptyState = document.querySelector("#empty-state");
const errorState = document.querySelector("#error-state");

function isProjectVisible(project) {
  return project && typeof project === "object" && project.hidden !== true;
}

function isRenderableProject(project) {
  return (
    typeof project.name === "string" &&
    project.name.trim().length > 0 &&
    typeof project.url === "string" &&
    project.url.trim().length > 0
  );
}

function createProjectCard(project) {
  const card = document.createElement("a");
  card.className = "project-card";
  card.href = project.url.trim();
  card.dataset.showTitle = project.showTitle === true ? "true" : "false";

  if (project.newTab === true) {
    card.target = "_blank";
    card.rel = "noopener noreferrer";
  }

  const name = project.name.trim();
  const description =
    typeof project.description === "string" ? project.description.trim() : "";

  card.setAttribute(
    "aria-label",
    description ? `${name}: ${description}` : name,
  );

  const image = document.createElement("img");
  image.className = "project-image";
  image.src =
    typeof project.image === "string" && project.image.trim().length > 0
      ? project.image.trim()
      : FALLBACK_IMAGE;
  image.alt = name;
  image.loading = "lazy";
  image.decoding = "async";

  image.addEventListener(
    "error",
    () => {
      if (!image.src.endsWith("/assets/project-placeholder.svg")) {
        image.src = FALLBACK_IMAGE;
      }
    },
    { once: true },
  );

  const title = document.createElement("span");
  title.className = "project-title";
  title.textContent = name;

  card.append(image, title);
  return card;
}

function renderProjects(projects) {
  const visibleProjects = projects
    .filter(isProjectVisible)
    .filter(isRenderableProject);

  if (visibleProjects.length === 0) {
    emptyState.hidden = false;
    return;
  }

  const fragment = document.createDocumentFragment();
  visibleProjects.forEach((project) => {
    fragment.append(createProjectCard(project));
  });

  grid.append(fragment);
}

async function loadProjects() {
  try {
    const response = await fetch(PROJECTS_URL, { cache: "no-cache" });

    if (!response.ok) {
      throw new Error(`Project catalogue returned HTTP ${response.status}`);
    }

    const projects = await response.json();

    if (!Array.isArray(projects)) {
      throw new TypeError("projects.json must contain a JSON array");
    }

    renderProjects(projects);
  } catch (error) {
    console.error("Unable to load Vibe Pipe projects:", error);
    errorState.hidden = false;
  }
}

loadProjects();
