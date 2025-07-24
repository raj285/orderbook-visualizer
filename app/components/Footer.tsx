"use client"
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between flex-wrap">
          {/* Navigation Links */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
            <ul className="space-y-1">
            </ul>
          </div>

          {/* Contact Details */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <ul className="space-y-1">
              <li>
                Email:{" "}
                <a
                  href="mailto:goswaminishant9670@gmail.com"
                  className="hover:underline"
                >
                  goswaminishant9670@gmail.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+918239989670" className="hover:underline">
                  8239989670
                </a>
              </li>
              <li>
                LinkedIn:{" "}
                <a href="#" className="hover:underline">
                  LinkedIn Profile
                </a>
              </li>
              <li>
                Instagram:{" "}
                <a href="#" className="hover:underline">
                  Instagram Profile
                </a>
              </li>
              <li>
                X (Twitter):{" "}
                <a href="#" className="hover:underline">
                  X Profile
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Attribution and Copyright */}
        <div className="mt-6 text-center">
          <p className="text-sm">Made in 🧡🤍💚 with ❤ by Raj</p>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Website. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;