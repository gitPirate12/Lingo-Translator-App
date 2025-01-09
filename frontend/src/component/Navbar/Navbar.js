// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import image_navlogo from "./NavImage/logo.jpg";
// import image1_userlogo from "./NavImage/user.png";
// import "./Navbar.css";
// import { useLogout } from "../../hooks/useLogout";
// import { useAuthContext } from "../../hooks/useAuthContext";

// function Navbar() {
//   const { logout } = useLogout();
//   const [activeLink, setActiveLink] = useState(""); // State to track active link
//   const { user } = useAuthContext();

//   // Function to handle link click
//   const handleLinkClick = (linkName) => {
//     setActiveLink(linkName === activeLink ? "" : linkName);
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <nav className="navbar navbar-expand-lg">
//       <div className="container-fluid">
//         <Link to="/" className="navbar-brand">
//           <div className="navbar-logo">
//             <img src={image_navlogo} alt="App logo" />
//             <div className="navbar-title"><b>LINGO Translator</b></div>
//           </div>
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
//             {/* Your navigation links */}
//             <li className={`nav-item ${activeLink === 'emoji' ? 'active' : ''}`}>
//               <Link
//                 className="nav-link"
//                 onClick={() => handleLinkClick('emoji')}
//                 to="/emojiText"
//               >
//                 Emoji to Text
//               </Link>
//             </li>
//             <li className={`nav-item ${activeLink === 'discussion' ? 'active' : ''}`}>
//               <Link
//                 className="nav-link"
//                 onClick={() => handleLinkClick('discussion')}
//                 to="/viewposts"
//               >
//                 Discussion Forum
//               </Link>
//             </li>
//           </ul>
//           <div className="navbar-profile">
//   {user ? (
//     <div className="nav-links">
//       <Link className="nav-link" to="/viewprofile">
//         View User Profile
//       </Link>
//       <button className="nav-link" onClick={handleLogout}>
//         Log Out
//       </button>
//     </div>
//   ) : (
//     <div className="nav-links">
//       <Link className="nav-link" to="/login">
//         Log In
//       </Link>
//       <Link className="nav-link" to="/signup">
//         Sign Up
//       </Link>
//     </div>
//   )}
// </div>

//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import Logo from "../Icons/Logo";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <nav className="flex flex-wrap justify-between items-center px-10 py-3 border-b border-gray-200 max-md:px-5">
      <Link to="/">
        <Logo />
      </Link>
      <div className="flex flex-wrap flex-1 gap-8 items-center justify-end text-sm font-medium text-stone-900">
        <div className="flex gap-9 items-center  text-sm font-medium min-h-[40px] min-w-[240px] text-stone-900">
          <Link to="/" className="text-stone-900 hover:text-custom-brown">
            Home
          </Link>
          <Link
            to="/emojiText"
            className="text-stone-900 hover:text-custom-brown "
          >
            Emoji to Text
          </Link>
          <Link
            to="/viewposts"
            className="text-stone-900 hover:text-custom-brown"
          >
            Discussion Forum
          </Link>
          <Link
            to="/viewposts"
            className="text-stone-900 hover:text-custom-brown"
          >
            Register
          </Link>
          <Link
            to="/viewposts"
            className="text-stone-900 hover:text-custom-brown"
          >
            Login
          </Link>
          <img
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-gray-300"
          />
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
