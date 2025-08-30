import { useState } from "react";
import UploadAgriVideo from "../components/UploadAgriVideo";
import UploadSunVideo from "../components/UploadSunVideo";
import "../assets/theme-switch.css"; // CSS mà bạn paste ở trên

export default function UploadVideo() {
  const [selectedTab, setSelectedTab] = useState("agri");

  return (
    <>
      {/* Theme Mode Toggle */}
      <input hidden className="mode" id="theme-mode" type="checkbox" />
      <div className="container">
        <div className="wrap">
          {/* Tab 1 - Agri */}
          <input
            hidden
            className="rd-1"
            name="radio"
            id="rd-1"
            type="radio"
            checked={selectedTab === "agri"}
            onChange={() => setSelectedTab("agri")}
          />
          <label style={{ "--index": 0 }} className="label" htmlFor="rd-1">
            <span>Upload Agri Video</span>
          </label>

          {/* Tab 2 - Sun */}
          <input
            hidden
            className="rd-2"
            name="radio"
            id="rd-2"
            type="radio"
            checked={selectedTab === "sun"}
            onChange={() => setSelectedTab("sun")}
          />
          <label style={{ "--index": 1 }} className="label" htmlFor="rd-2">
            <span>Upload Sun Video</span>
          </label>

          {/* Thanh trượt highlight */}
          <div className="bar"></div>
          <div className="slidebar"></div>

          {/* Theme button */}
          <label htmlFor="theme-mode" className="theme">
            <span className="light">🌞</span>
            <span className="dark">🌙</span>
          </label>
        </div>

        {/* Nội dung động theo tab */}
        <div className="mt-10 w-full flex justify-center">
          {selectedTab === "agri" && <UploadAgriVideo />}
          {selectedTab === "sun" && <UploadSunVideo />}
        </div>
      </div>
    </>
  );
}
