import { useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import {
  FiFolder,
  FiPlus,
  FiBell,
  FiImage,
  FiTrash2,
  FiHome,
  FiUser
} from "react-icons/fi";
import { Crown } from "lucide-react";
import Home from "./Home";
import Templates from "./Templates";
import Projects from "./Projects";
import Profile from "./Profile";
import Notifications from "./Notifications";
import TrashView from "./TrashView";

function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("home");
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [billing, setBilling] = useState("yearly");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showTrash, setShowTrash] = useState(false);
  // Quick actions styles
  const [clickedBtn, setClickedBtn] = useState(null);
  // const navigate = useNavigate();
 
  const handleClick = (type) => {
    setClickedBtn(type);
 
    setTimeout(() => {
      setClickedBtn(null);
    }, 1000); // 1 seconds
  };
 
  // project Serach
  const [showProjectSearch, setShowProjectSearch] = useState(false);
  // project actions
  const [activeTab, setActiveTab] = useState("Projects");
 
  // Generate consistent user data based on avatar (lazy initialization)
  const [userData] = useState(() => {
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa', 'James', 'Maria'];
    const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez'];
 
    const randomIndex = Math.floor(Math.random() * firstNames.length);
    const firstName = firstNames[randomIndex];
    const lastName = lastNames[randomIndex];
 
    return {
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `+1 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`
    };
  });
 
  return (
    <div className="dashboard">
 
      {/* ================= TOP HEADER ================= */}
      <header className="topbar">
        <div className="top-left">
          <div className="logo-box">A</div>
          <h3>App Name</h3>
        </div>
 
        <div className="top-actions">
          <button className="create-btn">
            <FiPlus /> Create New Design
          </button>
 
 
          <Link to="/pricing" className="upgrade-btn">
            <Crown size={24} color="#facc15" />
            Upgrade Plan
          </Link>
 
 
        </div>
      </header>
 
 
      {/* ================= BODY ================= */}
      <div className="dashboard-body">
 
        {/* ============ SIDEBAR (HEADER KINDA) ============ */}
        <aside className="sidebar">
 
          <div className="sidebar-top"
                onMouseLeave={() => setShowProfile(false)}
            >
            <div
              className="avatar"
              onMouseEnter={() => setShowProfile(true)}
            ></div>

            {showProfile && (
              <Profile  />
            )}

            <FiBell
              className="bell-icon"
              onClick={() => setShowNotification(!showNotification)}
            />
          </div>
 
          <nav className="sidebar-menu">
 
            <div
              className={`menu-item ${activeMenu === "home" ? "active" : ""}`}
              onClick={() => setActiveMenu("home")}
            >
              <FiHome />
              <span>Home</span>
            </div>
 
            <div
              className={`menu-item ${activeMenu === "template" ? "active" : ""}`}
              onClick={() => setActiveMenu("template")}
            >
              <FiImage />
              <span>Template</span>
            </div>
 
            <div
              className={`menu-item ${activeMenu === "projects" ? "active" : ""}`}
              onClick={() => setActiveMenu("projects")}
            >
              <FiFolder />
              <span>Projects</span>
            </div>
 
 
 
          </nav>

          {/* Bottom Trash */}
            <div
              className={`sidebar-bottom ${activeMenu === "trash" ? "active" : ""}`}
              onClick={() => setActiveMenu("trash")}
            >
              <FiTrash2 />
            </div>

        </aside>
 
 
        {/* ============ MAIN CONTENT ============ */}
        <div className="content">
          {activeMenu === "home" && (
            <Home
              // showSearchDropdown={showSearchDropdown}
              // setShowSearchDropdown={setShowSearchDropdown}
              handleClick={handleClick}
              clickedBtn={clickedBtn}
            />
          )}
 
          {activeMenu === "template" && (
            <Templates
              showProjectSearch={showProjectSearch}
              setShowProjectSearch={setShowProjectSearch}
              handleClick={handleClick}
              clickedBtn={clickedBtn}
            />
          )}
 
          {activeMenu === "projects" && (
            <Projects
              showProjectSearch={showProjectSearch}
              setShowProjectSearch={setShowProjectSearch}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          )}
 
          {activeMenu === "notifications" && (
            <Notifications isOverlay={false} />
          )}
 
          {showNotification && (
            <Notifications isOverlay={true} setShowNotification={setShowNotification} />
          )}
 
          {showProfile && (
            <Profile
              userData={userData}
              setShowProfile={setShowProfile}
            />
          )}

          {activeMenu === "trash" &&(
            <TrashView />
          )

          }

          {showPricing && (
            <div
              className="pricing-modal-overlay"
              onClick={() => setShowPricing(false)}
            >
              <div
                className="pricing-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="pricing-close"
                  onClick={() => setShowPricing(false)}
                >
                  ✕
                </button>
 
                <h1 className="pricing-title">
                  Choose Your <span>Creative</span> Plan
                </h1>
 
                {/* Toggle */}
                <div className="billing-toggle">
                  <button
                    className={billing === "yearly" ? "active" : ""}
                    onClick={() => setBilling("yearly")}
                  >
                    Yearly
                    <span className="save-badge">SAVE UP TO 20%</span>
                  </button>
 
                  <button
                    className={billing === "monthly" ? "active" : ""}
                    onClick={() => setBilling("monthly")}
                  >
                    Monthly
                  </button>
                </div>
 
                <div className="plans-container">
 
                  {/* FREE */}
                  <div className="plan-card">
                    <h3>Free</h3>
                    <h2>
                      ₹0 <span>/month</span>
                    </h2>
                    <p className="sub-text">Start for free</p>
 
                    <button className="plan-btn disabled">Current Plan</button>
 
                    <div className="features">
                      <p>✓ Limited templates</p>
                      <p>✓ 1GB storage</p>
                      <p>✓ Export PNG & JPG</p>
                      <p>✓ Max 5 projects</p>
                    </div>
                  </div>
 
                  {/* PROFESSIONAL */}
                  <div className="plan-card featured">
                    <h3>Professional</h3>
                    <h2>
                      {billing === "yearly" ? "₹799" : "₹999"}
                      <span>/month</span>
                    </h2>
                    <p className="sub-text">
                      {billing === "yearly" ? "Billed annually" : "Billed monthly"}
                    </p>
 
                    <button className="plan-btn primary">Upgrade</button>
 
                    <div className="features">
                      <p>✓ Full template library</p>
                      <p>✓ Premium assets</p>
                      <p>✓ 50GB storage</p>
                      <p>✓ PDF export</p>
                      <p>✓ Version history</p>
                    </div>
                  </div>
 
                  {/* ENTERPRISE */}
                  <div className="plan-card">
                    <h3>Enterprise</h3>
                    <h2>
                      {billing === "yearly" ? "₹2799" : "₹3499"}
                      <span>/month</span>
                    </h2>
                    <p className="sub-text">
                      {billing === "yearly" ? "Billed annually" : "Billed monthly"}
                    </p>
 
                    <button className="plan-btn">Request a Trial</button>
 
                    <div className="features">
                      <p>✓ Unlimited storage</p>
                      <p>✓ Advanced version control</p>
                      <p>✓ Team collaboration</p>
                      <p>✓ Priority support</p>
                    </div>
                  </div>
 
                </div>
 
                <p className="pricing-footer">
                  No contracts. Cancel anytime. 100% secure payments.
                </p>
 
              </div>
            </div>
          )}
 
        </div>
 
      </div>
    </div>
  );
}
 
export default Dashboard;
 