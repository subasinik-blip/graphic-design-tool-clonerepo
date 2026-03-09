import React from "react";
import { FiPlus } from "react-icons/fi";
import { Layers, CreditCard, Presentation, Plus } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Home({ handleClick, clickedBtn }) {
  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">
        What would you like to <span>create</span> today?
      </h1>

      {/* Search Component */}
      <SearchBar />

      <div className="quick-actions">
        <h4>Quick actions</h4>
        <div className="action-buttons">
          <button
            className={`action-btn ${clickedBtn === "Poster" ? "clicked" : ""}`}
            onClick={() => handleClick("Poster")}
          >
            <div className="left icon-business">
              <Layers size={18} />
            </div>
            <div className="right">
              <span>Poster</span>
            </div>
          </button>

          <button
            className={`action-btn ${clickedBtn === "Business Card" ? "clicked" : ""}`}
            onClick={() => handleClick("Business Card")}
          >
            <div className="left icon-card">
              <CreditCard size={18} />
            </div>
            <div className="right">
              <span>Business Card</span>
            </div>
          </button>

          <button
            className={`action-btn ${clickedBtn === "Presentation" ? "clicked" : ""}`}
            onClick={() => handleClick("Presentation")}
          >
            <div className="left icon-presentation">
              <Presentation size={18} />
            </div>
            <div className="right">
              <span>Presentation</span>
            </div>
          </button>

          <button
            className={`action-btn ${clickedBtn === "Custom Size" ? "clicked" : ""}`}
            onClick={() => handleClick("Custom Size")}
          >
            <div className="left icon-custom">
              <Plus size={18} />
            </div>
            <div className="right">
              <span>Custom Size</span>
            </div>
          </button>
        </div>
      </div>

      <div className="recents">
        <h4>Recents</h4>
        <div className="recent-card">
          <p>No recent files</p>
          <span>Files you save or create will appear here</span> <br />
          <button className="recent-create">
            <FiPlus /> Create new
          </button>
        </div>
      </div>
    </div>
  );
}