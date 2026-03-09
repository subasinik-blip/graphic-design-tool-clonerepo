import { useEffect, useState } from "react";
import axios from "axios";
 
import {
  FiChevronRight,
  FiUsers,
  FiSettings,
  FiHelpCircle,
  FiBookOpen,
  FiLogOut
} from "react-icons/fi";

function Profile({ userData, setShowProfile }) {

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
 
    const fetchProfile = async () => {
 
      const token = localStorage.getItem("token");
 
      if (!token) {
        window.location.href = "/login";
        return;
      }
 
      try {
 
        const res = await axios.get(
          "http://localhost:5050/api/profile/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
 
        setUserData(res.data);
 
      } catch (error) {
 
        console.log("Profile fetch error:", error);
 
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
 
      } finally {
        setLoading(false);
      }
 
    };
 
    fetchProfile();
 
  }, []);
 
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
 
  return (
    <div className="profile-container">
      <div className="profile-card">
 
        {loading ? (
          <p>Loading profile...</p>
        ) : (
          <>
            <div className="profile-header">
              <div className="profile-info">
 
                <img
                  src={userData.profile_image || "https://i.pravatar.cc/150"}
                  alt="profile"
                  className="profile-avatar"
                />
 
                <div>
                  <h3>{userData.full_name || "New User"}</h3>
                  <p>{userData.email || "No email"}</p>
                </div>
 
              </div>
 
              <FiChevronRight className="profile-arrow" />
            </div>
 
            <div className="plan-section">
              <div className="plan-grid">
 
                <div className="plan-left">
                  <h4>{userData.plan_name || "Free Trial"}</h4>
                  <p>Best for trying out before making a purchase</p>
                </div>
 
                <div className="plan-right">
                  <h4>${userData.plan_price || 0}</h4>
                  <span>per month</span>
                </div>
 
                <button className="upgrade-btn">
                  👑 Upgrade plan
                </button>
 
              </div>
            </div>
 
            <div className="links">
 
              <div className="link-item">
                <FiUsers />
                <span>Team Management</span>
              </div>
 
              <div className="link-item">
                <FiSettings />
                <span>App Settings</span>
              </div>
 
              <div className="link-item">
                <FiHelpCircle />
                <span>Help Center</span>
              </div>
 
              <div className="link-item">
                <FiBookOpen />
                <span>Tutorials</span>
              </div>
 
            </div>
 
            <div className="signout" onClick={logout}>
              <FiLogOut />
              <span>Signout</span>
            </div>
 
          </>
        )}
 
      </div>
    </div>
  );
}
 
export default Profile;
 