import React from "react";
import {
  FaFacebook,
  FaFacebookSquare,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaRegEnvelope,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "@nextui-org/link";

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-green-500 to-primary flex flex-col lg:flex-row items-center p-4 sticky bottom-0 z-20 justify-center lg:justify-end">
      <div className="flex flex-col lg:flex-row items-center lg:divide-x-2 divide-white text-xs">
        <div className="flex items-center gap-1 px-2">
          <Link
            isExternal
            href="https://twitter.com/ykan_id"
            underline="none"
            className="hover:opacity-80 text-white"
          >
            <FaInstagram className="w-4 h-4" />
          </Link>

          <Link
            isExternal
            href="https://www.instagram.com/ykan_id"
            underline="none"
            className="hover:opacity-80 text-white"
          >
            <FaTwitter className="w-4 h-4" />
          </Link>

          <span className="text-white font-bold">@ykan_id</span>
        </div>

        <div className="flex items-center gap-1 px-2">
          <Link
            isExternal
            href="https://facebook.com/yayasankonservasialamnusantara"
            underline="none"
            className="hover:opacity-80 text-white"
          >
            <FaFacebookSquare className="w-4 h-4" />
          </Link>

          <Link
            isExternal
            href="https://www.linkedin.com/company/yayasan-konservasi-alam-nusantara/"
            underline="none"
            className="hover:opacity-80 text-white"
          >
            <FaLinkedin className="w-4 h-4" />
          </Link>

          <Link
            isExternal
            href="https://www.youtube.com/yayasankonservasialamnusantara"
            underline="none"
            className="hover:opacity-80 text-white"
          >
            <FaYoutube className="w-4 h-4" />
          </Link>

          <span className="text-white font-bold">
            Yayasan Konservasi Alam Nusantara
          </span>
        </div>

        <div className="flex items-center gap-1 px-2">
          <Link
            isExternal
            href="mailto:indonesia@ykan.or.id"
            underline="none"
            className="hover:opacity-80 text-white text-xs gap-1 items-center"
          >
            <FaRegEnvelope className="w-4 h-4" />
            <span className="text-white font-bold">indonesia@ykan.or.id</span>
          </Link>
        </div>

        <div className="flex items-center gap-1 px-2">
          <Link
            isExternal
            href="https://www.ykan.or.id"
            underline="none"
            className="hover:opacity-80 text-white text-xs gap-1 items-center"
          >
            <FaGlobe className="w-4 h-4" />
            <span className="text-white font-bold">ykan.or.id</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
