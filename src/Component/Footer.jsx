import { Link } from "react-router-dom";
import { FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";
export default function Footer() {
  let date = new Date();
  let year = date.getFullYear();

  return (
    <>
      <footer className="bg-white text-[14px]">
        <div className="row">
          <div className="col">
            VoteGov
            <p>
              this footer is used for pratise , this is a responsive footer
              whil̥ōch is made by ME thanks for watching
            </p>
          </div>
          <div className="col">
            <h3>
              Office{" "}
              <div className="underline">
                <span></span>
              </div>
            </h3>
            <p>Nirvachan Sadan, Ashoka Road, New Delhi 110001</p>
            <p className="text-sm mb-2">
              Email:
              <Link
                to="mailto:support@votingapp.com"
                className="text-black hover:underline"
              >
                support@votingapp.com
              </Link>
            </p>
            <p className="text-sm">
              Phone:{" "}
              <Link to="tel:+1234567890" className="text-black hover:underline">
                +1 234 567 890
              </Link>
            </p>
          </div>
          <div className="col">
            <h3>
              Links
              <div className="underline">
                <span></span>
              </div>
            </h3>
            <ul>
              <li className="mb-1">
                <a href="#" className="text-black hover:underline">
                  Home
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-black hover:underline">
                  Create a Poll
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-black hover:underline">
                  My Polls
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-black hover:underline">
                  Results
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-black hover:underline">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
          <div className="col">
            {/* <form>
                <i className="fa-regular fa-envelope"></i>
                <input className="text-black" type="email" placeholder="Enter your Email-Id" required/>
                <button className="text-black bg-gray-500" type="submit"><i className="fa-solid fa-arrow-right"></i></button>
            </form> */}
            <div className="social-icon flex flex-wrap max-lg:flex">
              
              <Link className="brand text-[27px]" to="https://www.facebook.com">
                {" "}
                <FaFacebookF />
              </Link>
              <Link className="brand text-3xl" to="https://www.whatsapp.com">
                <FaWhatsapp />
              </Link>
              <Link className="brand text-3xl" to="https://www.twitter.com">
                <CiTwitter />
              </Link>
              <Link className="brand text-3xl" to="https://www.instagram.com">
                <IoLogoInstagram />
              </Link>
              {/* <Link className="brand text-3xl" href="https://www.discord.com">< FaDiscord /></Link> */}
            </div>
          </div>
        </div>
        {/* <hr> */}
        <p className="copyright">
          Copyright © <span>{year}</span> Charger. All Rights Reserved.
        </p>

        <p className="copyright">
          {" "}
          All individual works are copyright protected by their respective
          owners & contributors. BrandCrowd is handcrafted from around the world
        </p>
      </footer>
    </>
  );
}
