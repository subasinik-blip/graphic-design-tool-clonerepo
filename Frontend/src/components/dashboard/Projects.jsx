import { FiSearch, FiFolder, FiFolderPlus, FiStar, FiTrash2, FiGrid, FiList, FiPlus } from "react-icons/fi";

function Projects({ showProjectSearch, setShowProjectSearch, activeTab, setActiveTab }) {
  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">
        Your <span>Studio!</span>
      </h1>

      <div
        className={`projects-search-wrapper ${showProjectSearch ? "active" : ""}`}
      >
        <div
          className="projects-search-box"
          onClick={() => setShowProjectSearch(true)}
        >
          <div className="search-icon">
            <FiSearch />
          </div>

          {showProjectSearch && (
            <span className="search-tag">In Projects</span>
          )}

          <input
            type="text"
            placeholder="Search Projects..."
            onFocus={() => setShowProjectSearch(true)}
            onBlur={() => setShowProjectSearch(false)}
          />
        </div>
      </div>

      <div className="workspace-header">
        <h3 className="workspace-title">My Workspace</h3>

        <div className="workspace-topbar">

          {/* LEFT SIDE - FILTER BUTTONS */}
          <div className="workspace-filters">
            <button
              className={activeTab === "Projects" ? "filter-btn active" : "filter-btn"}
              onClick={() => setActiveTab("Projects")}
            >
              <FiFolder size={18} />
              Projects
            </button>

            <button
              className={activeTab === "Folders" ? "filter-btn active" : "filter-btn"}
              onClick={() => setActiveTab("Folders")}
            >
              <FiFolderPlus size={18} />
              Folders
            </button>

            <button
              className={activeTab === "Starred" ? "filter-btn active" : "filter-btn"}
              onClick={() => setActiveTab("Starred")}
            >
              <FiStar size={18} />
              Starred
            </button>

            <button
              className={activeTab === "Trash" ? "filter-btn active" : "filter-btn"}
              onClick={() => setActiveTab("Trash")}
            >
              <FiTrash2 size={18} />
              Trash
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="workspace-actions">
            <button className="new-project-btn">
              <FiPlus size={18} />
              New Project
            </button>

            <FiGrid size={20} className="view-icon" />
            <FiList size={20} className="view-icon" />
          </div>

        </div>
      </div>

      <div className="recents">
        <h4>Your Projects</h4>

        <div className="recent-card">
          <p>No projects yet</p>
          <span>Create your first design to get started</span> <br></br>
          <button className="recent-create">
            <FiPlus /> Create new project
          </button>
        </div>
      </div>
    </div>
  );
}

export default Projects;
