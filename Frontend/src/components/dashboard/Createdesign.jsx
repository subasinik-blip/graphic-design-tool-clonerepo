import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import design1 from "../../assets/Create-Design/Design-template1.png"
import design2 from "../../assets/Create-Design/Design-template2.png"
import design3 from "../../assets/Create-Design/Design-template3.png"
import design4 from "../../assets/Create-Design/Design-template4.png"
import design5 from "../../assets/Create-Design/Design-template5.png"
import design6 from "../../assets/Create-Design/Design-template6.png"
import design7 from "../../assets/Create-Design/Design-template7.png"
import design8 from "../../assets/Create-Design/Design-template8.png"

import Poster11 from "../../assets/Design-svg/poster.svg"
import Business11 from "../../assets/Design-svg/Business.svg"
import Custom11 from "../../assets/Design-svg/Custom.svg"
import Presentation11 from "../../assets/Design-svg/Presentation.svg"
import portrait from "../../assets/Design-svg/Portrait.svg"
import landscape from "../../assets/Design-svg/Landscape.svg"
// import "./Createdesign.css"
import "./Dashboard.css"


const categories = [
  "Popular",
  "Instagram",
  "Facebook",
  "X (Twitter)",
  "Youtube",
  "Linkedin",
];
const sizes = [
  { title: "Instagram square post", size: "1080 x 1920" },
  { title: "Instagram post", size: "1080 x 1350" },
  { title: "X post", size: "1600 x 900" },
  { title: "Youtube Thumbnail", size: "1280 x 720" },
  { title: "Standard Pin", size: "1000 x 1500" },
];
const handleLeftClick = () => {
    console.log("Left Button Clicked");
  };

  const handleRightClick = () => {
    console.log("Right Button Clicked");
  };


export default function Createdesign() {


const [showCustomFolder, setShowCustomFolder] = useState(false);
const [unit, setUnit] = useState("");
const [active, setActive] = useState("portrait");

    const navigate = useNavigate();
  const [activeContainerMenu, setActiveContainerMenu] = useState("poster");

  const Designimage= [design1, design2,design3,design4,design5,design6,design7,design8]
  return (
    <div>
      <div className="app">
                    <button
                          className="close-btndesign"
                          onClick={() => navigate("/Dashboard")}
                        >
                          ✕
                        </button>
                  <div className="container">
              {/* Sidebar */}
              <div className="Designsidebar">
                <h2>Create a Design</h2>      
                <div className={`menu ${activeContainerMenu === "poster" ? "active-poster" : ""}`}
        onClick={() => setActiveContainerMenu("poster")}><img src={Poster11} alt="logo" className="menu-icon1" />Poster</div>
                <div className={`menu ${activeContainerMenu === "business" ? "active-business" : ""}`}
        onClick={() => setActiveContainerMenu("business")}><img src={Business11} alt="logo" className="menu-icon2"  />Business Card</div>
                <div className={`menu ${activeContainerMenu === "presentation" ? "active-presentation" : ""}`}
        onClick={() => setActiveContainerMenu("presentation")}><img src={Presentation11} alt="logo" className="menu-icon3" />Presentation</div>
                <div className={`menu ${activeContainerMenu === "custom" ? "active-custom" : ""}`}
        onClick={() =>setActiveContainerMenu("custom")}><img src={Custom11} alt="logo" className="menu-icon4" /><span>Custom Size</span></div>
              </div>
              <div className="maincontainerdesign">
      
                {activeContainerMenu === "poster" && (
              <div className="main">
                {/* Search */}
                <div className="header-design">
                <div className="search-bar">
                  <input type="text" placeholder="Search Templates" />
                  <button className="close-btndesign1">X</button>
                </div>
                </div>
                {/* Tabs */}
                <div className="tabs">
                  {categories.map((cat, index) => (
                    <button
                      key={index}
                      className={index === 0 ? "tab active-tab" : "tab"}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                 {/* Popular Sizes */}
                 <div className="pop">
                <h4>Popular</h4>
                <div className="button-cont">
            <button onClick={handleLeftClick}>
              &lt;
            </button>
      
            <button onClick={handleRightClick}>
              &gt;
            </button>
          </div>
                <div className="card-row">
                  {sizes.map((item, index) => (
                    <div key={index} className="size-card">
                      <div className="placeholder">Place holder</div>
                      <p className="title">{item.title}</p>
                      <span className="size">{item.size}</span>
                    </div>
                  ))}
                </div>
                <div className= "popular-template">
                <h3>Popular Templates</h3>
                </div>
                <div className="containerdesign">
                  <div className="columndesign1">
              <img src={design1} alt="img1" className="image3" />
              <p>Random template name</p>
              <img src={design2} alt="img2" className="image3" />
              <p>Random template name</p>
              <img src={design3} alt="img3" className="image3" />
              <p>Random template name</p>
            </div>
      
            {/* Column 2 */}
            <div className="columndesign2">
              <img src={design4} alt="img4" className="image3" />
              <p>Random template name</p>
              <img src={design5} alt="img5" className="image3" />
              <p>Random template name</p>
              <img src={design6} alt="img6" className="image3" />
              <p>Random template name</p>
            </div>
      
            {/* Column 3 */}
            <div className="columndesign3">
              <img src={design7} alt="img7" className="image3" />
              <p>Beyond the Sea template</p>
              <img src={design8} alt="img8" className="image3" />
              <p>Random template name</p>
            </div>
          </div>
                </div>
                </div>
                )}
                {activeContainerMenu === "custom" && (
          <div className="Custom-design-container">
            <h3>Custom Design</h3>
            <div className="custom-details">
              <p>Basic Details</p>
              <div className="custom-project-name">
                <input type="text" placeholder="Untitled design" />
              </div>
              <div className="custom-dim">
              <p>Dimensions</p>
              <div className="custom-dimensions">
                <input type="text" placeholder="" />
                <input type="text" placeholder="" />
                {/* <input type="text" placeholder="Pixels(Px)" /> */}
                
            <select className="custom-dimensions1" value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="">Select Units</option>
              <option value="px">Pixels (px)</option>
              <option value="in">Inches (in)</option>
              <option value="mm">Millimeters (mm)</option>
              <option value="cm">Centimeters (cm)</option>
              <option value="pt">Points (pt)</option>
              <option value="pc">Picas (pc)</option>
            </select>
            <div className='label-orient'>
              <label>Orientation</label>
            <button
              className={`toggle-btn ${active === "portrait" ? "active" : ""}`}
              onClick={() => setActive("portrait")}><img src={portrait} alt="logo" className="logo-portrait" />
            Portrait
            </button>
      
            <button
              className={`toggle-btn ${active === "landscape" ? "active" : ""}`}
              onClick={() => setActive("landscape")}><img src={landscape} alt="logo" className="logo-landscape" />
            Landscape
            </button>
            </div>
              </div>
              </div>
              <div className="custom-canvas">
                <p>Canvas setup</p>
                <div className="custom-canva-setup">
                  <select className="customcanvasetup1" value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="">Select Units</option>
              <option value="px">Standard (72PPI)</option>
            </select>
                <select className="customcanvasetup2" value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="">Select Units</option>
              <option value="px">Pixels/Inch(PPI)</option>
              <option value="px">Dots/Inch(DPI)</option>
            </select>
             <select className="customcanvasetup3" value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="">Background Color</option>
              <option value="px">White</option>
              <option value="px">Black</option>
              <option value="px">Transparent</option>
            </select>
                {/* <input type="text" placeholder="Pixels(Px)" className="customcanvasetup3"/> */}
                </div>
              </div>
              <div className="custom-folder">
                <p>Folder Setup</p>
                <button className="custom-folder1" onClick={() => setShowCustomFolder(true)}>+ Create new folder</button>
              </div>
              <div className="custom-create">
                <button className="custom-create1">Create</button>
              </div>
            </div>
          </div>
          
        )}
              </div>
              </div> 
                </div>
        {showCustomFolder && (
          <div className="createnew-folder">
            <div className="createnewfolder1">
             <h3>Create New Folder </h3>
             <div>
              <input type="text" placeholder="Untitled folder" className="createnewfolder2"/>
             </div>
             <div className="createcancel">
              <button className="createcancel1" onClick={() => setShowCustomFolder(false)}>Cancel</button>
              <button className="createcancel2">Create</button>
             </div>
            </div>
          </div>
        )}
    </div>
  )
}
