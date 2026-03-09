import React from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaXTwitter, FaInstagram } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo */}
        <div className="footer-logo">
          <div className="logo-box">A</div>
          <h2>App Name</h2>
        </div>

        {/* Columns */}
        <div className="footer-columns">

          {/* Column 1 */}
          <div className="footer-column">
            <a href="/#">Features</a>
            <a href="/#">Templates</a>
            <a href="/#">Collaboration</a>
            <a href="/#">Multi-format Export</a>
            <a href="/#">Presentation Maker</a>
            <a href="/#">AI Tools</a>
          </div>

          {/* Column 2 */}
          <div className="footer-column">
            <a href="/#">Explore</a>
            <a href="/#">Discover Templates</a>
            <a href="/#">Trending Designs</a>
            <a href="/#">Design Ideas</a>
            <a href="/#">Community</a>
            <a href="/#">Integrations</a>
          </div>

          {/* Column 3 */}
          <div className="footer-column">
            <a href="/#">Learn</a>
            <a href="/#">Help Center</a>
            <a href="/#">Tutorials</a>
            <a href="/#">Design School</a>
            <a href="/#">Blog</a>
            <a href="/#">Webinars</a>
            <a href="/#">Accessibility</a>
          </div>

          {/* Column 4 */}
          <div className="footer-column">
            <a href="/#">Company</a>
            <a href="/#">About</a>
            <a href="/#">Careers</a>
            <a href="/#">Press</a>
            <a href="/#">Trust & Safety</a>
            <a href="/#">Contact Us</a>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">

          {/* Social Icons */}
          <div className="footer-social">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaXTwitter /></a>
            <a href="#"><FaInstagram /></a>
          </div>

          {/* Copyright */}
          <div className="footer-copy">
            &copy; 2026 App Name. All Right Reserved.
          </div>

          {/* Terms */}
          <div className="footer-terms">
            <a href="/terms">Terms of Service</a> |
            <a href="/privacy"> Privacy Policy</a>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
