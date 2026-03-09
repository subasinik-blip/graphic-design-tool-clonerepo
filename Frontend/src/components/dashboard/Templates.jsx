import { FiSearch } from "react-icons/fi";
import { Layers, CreditCard, Presentation, Plus } from "lucide-react";

function Templates({ showProjectSearch, setShowProjectSearch, handleClick, clickedBtn }) {
  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">
        Explore <span>Templates</span>
      </h1>

      <div
        className={`templates-search-wrapper ${showProjectSearch ? "active" : ""}`}
      >
        <div
          className="templates-search-box"
          onClick={() => setShowProjectSearch(true)}
        >
          <div className="search-icon">
            <FiSearch />
          </div>

          {showProjectSearch && (
            <span className="search-tag">In Templates</span>
          )}

          <input
            type="text"
            placeholder="Search Templates..."
            onFocus={() => setShowProjectSearch(true)}
            onBlur={() => setShowProjectSearch(false)}
          />
        </div>
      </div>

      <div className="quick-actions">
        <h4>Create Design</h4>
        <button className={`action-btn ${clickedBtn === "Poster" ? "clicked" : ""}`}
          onClick={() => handleClick("Poster")}>

          <div className="left icon-business">
            <Layers size={18} />
          </div>
          <div className="right">
            <span>Poster</span>
          </div>
        </button>

        <button className={`action-btn ${clickedBtn === "Business Card" ? "clicked" : ""}`}
          onClick={() => handleClick("Business Card")}>
          <div className="left icon-card">
            <CreditCard size={18} />
          </div>
          <div className="right">
            <span>Business Card</span>
          </div>
        </button>

        <button className={`action-btn ${clickedBtn === "Presentation" ? "clicked" : ""}`}
          onClick={() => handleClick("Presentation")}>
          <div className="left icon-presentation">
            <Presentation size={18} />
          </div>
          <div className="right">
            <span>Presentation</span>
          </div>
        </button>

        <button className={`action-btn ${clickedBtn === "Custom Size" ? "clicked" : ""}`}
          onClick={() => handleClick("Custom Size")}>
          <div className="left icon-custom">
            <Plus size={18} />
          </div>
          <div className="right">
            <span>Custom Size</span>
          </div>
        </button>
      </div>

      <div className="recents">
        <h4>Featured Templates</h4>

        <div className="recent-card">
          <p>Coming Soon</p>
          <span>Browse our collection of professionally designed templates</span>
        </div>
      </div>
    </div>
  );
}

export default Templates;
