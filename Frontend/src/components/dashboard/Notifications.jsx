// import { useState } from "react";
// import { FiPlus, FiFolder, FiBell, FiMessageSquare } from "react-icons/fi";

// function Notifications({ isOverlay, setShowNotification }) {
//   const [activeTab, setActiveTab] = useState("All");

//   // Expanded sample data to show how they all appear under "All"
//   const notifications = [
//     { icon: <FiFolder />, 
//       title: "Project shared", 
//       description: "John shared a folder",
//       time: "1h ago", 
//       unread: true, 
//       type: "Request" 
//     },
//     { icon: <FiBell />, 
//       title: "Design ready", 
//       description: "Poster review needed", 
//       time: "3h ago", 
//       unread: false, 
//       type: "Update" 
//     },
//     { icon: <FiMessageSquare />, 
//       title: "New Message", 
//       description: "Client sent a brief", 
//       time: "5h ago", 
//       unread: true, 
//       type: "Message" 
//     },
//   ];

//   // Logic: Badge shows UNREAD count only
//   const getBadgeCount = (tab) => {
//     if (tab === "All") return notifications.filter(n => n.unread).length;
//     if (tab === "Requests") return notifications.filter(n => n.type === "Request" && n.unread).length;
//     if (tab === "Unread") return notifications.filter(n => n.unread).length;
//     return 0;
//   };

//   // Logic: List Display (The 'All' tab returns everything)
//   const filteredNotifications = notifications.filter(notif => {
//     if (activeTab === "All") return true; // <--- This ensures EVERYTHING shows under 'All'
//     if (activeTab === "Requests") return notif.type === "Request";
//     if (activeTab === "Unread") return notif.unread === true;
//     return true;
//   });

//   const NotificationContent = () => (
//     <>
//       <div className="notification-overlay-header">
//         <h3 style={{ margin: 0 }}>Notifications</h3>
//         <span className="mark-all-read" style={{ cursor: 'pointer' }}>Mark all as read</span>
//       </div>

//       <div className="notification-tabs">
//         {["All", "Requests", "Unread"].map((tab) => {
//           const count = getBadgeCount(tab);
//           return (
//             <span
//               key={tab}
//               className={`tab-item ${activeTab === tab ? "active" : ""}`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab}
//               {count > 0 && <span className="notification-badge">{count}</span>}
//             </span>
//           );
//         })}
//       </div>

//       <div className="notifications-list">
//         {filteredNotifications.length > 0 ? (
//           filteredNotifications.map((notification, index) => (
//             <div 
//               key={index} 
//               className={`notification-item ${notification.unread ? "unread" : "read"}`}
//             >
//               <div className="notification-icon">{notification.icon}</div>
//               <div className="notification-content">
//                 <h4>{notification.title}</h4>
//                 <p>{notification.description}</p>
//                 <span className="notification-time">{notification.time}</span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="no-notifications">
//             No {activeTab === "All" ? "" : activeTab.toLowerCase()} notifications
//           </div>
//         )}
//       </div>
//     </>
//   );

//   if (isOverlay) {
//     return (
//       <div className="notification-overlay" onClick={() => setShowNotification(false)}>
//         <div className="notification-overlay-content" onClick={(e) => e.stopPropagation()}>
//           <NotificationContent />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-wrapper">
//       <div className="notification-full-page-container" style={{ background: 'white', borderRadius: '24px', maxWidth: '800px', margin: '0 auto', overflow: 'hidden' }}>
//         <NotificationContent />
//       </div>
//     </div>
//   );
// }

// export default Notifications;


import { useState, useEffect } from "react";
import { FiFolder, FiBell, FiMessageSquare } from "react-icons/fi";
import axios from "axios";

function Notifications({ isOverlay, setShowNotification }) {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5050/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        setNotifications(res.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(
        `http://localhost:5050/api/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, is_read: 1 } : n
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await axios.put(
        "http://localhost:5050/api/notifications/mark-all-read",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setNotifications((prev) =>
        prev.map((n) => ({ ...n, is_read: 1 }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getBadgeCount = (tab) => {
    if (tab === "All")
      return notifications.filter((n) => !n.is_read).length;
    if (tab === "Requests")
      return notifications.filter(
        (n) => n.type === "Request" && !n.is_read
      ).length;
    if (tab === "Unread")
      return notifications.filter((n) => !n.is_read).length;
    return 0;
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "All") return true;
    if (activeTab === "Requests") return notif.type === "Request";
    if (activeTab === "Unread") return !notif.is_read;
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case "Request":
        return <FiFolder />;
      case "Message":
        return <FiMessageSquare />;
      default:
        return <FiBell />;
    }
  };

  const NotificationContent = () => (
    <>
      <div className="notification-overlay-header">
        <h3 style={{ margin: 0 }}>Notifications</h3>
        <span
          className="mark-all-read"
          onClick={handleMarkAllRead}
          style={{ cursor: "pointer" }}
        >
          Mark all as read
        </span>
      </div>

      <div className="notification-tabs">
        {["All", "Requests", "Unread"].map((tab) => {
          const count = getBadgeCount(tab);
          return (
            <span
              key={tab}
              className={`tab-item ${
                activeTab === tab ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {count > 0 && (
                <span className="notification-badge">
                  {count}
                </span>
              )}
            </span>
          );
        })}
      </div>

      <div className="notifications-list">
        {loading ? (
          <div className="no-notifications">Loading...</div>
        ) : filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${
                !notification.is_read ? "unread" : "read"
              }`}
              onClick={() =>
                !notification.is_read &&
                handleMarkAsRead(notification.id)
              }
            >
              <div className="notification-icon">
                {getIcon(notification.type)}
              </div>
              <div className="notification-content">
                <h4>{notification.message}</h4>
                <span className="notification-time">
                  {new Date(
                    notification.created_at
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="no-notifications">
            No{" "}
            {activeTab === "All"
              ? ""
              : activeTab.toLowerCase()}{" "}
            notifications
          </div>
        )}
      </div>
    </>
  );

  if (isOverlay) {
    return (
      <div
        className="notification-overlay"
        onClick={() => setShowNotification(false)}
      >
        <div
          className="notification-overlay-content"
          onClick={(e) => e.stopPropagation()}
        >
          <NotificationContent />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <div className="notification-full-page-container">
        <NotificationContent />
      </div>
    </div>
  );
}

export default Notifications;