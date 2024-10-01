import { FaPhoneAlt, FaEnvelope, FaQuestionCircle } from 'react-icons/fa';
import { NavLink } from "react-router-dom";

export default function HelpSupport() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Help & Support</h1>

        {/* Support Info Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Us */}
          <div className="p-6 border border-gray-200 rounded-lg bg-blue-50">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h2>
            <div className="flex items-center text-gray-800 mb-2">
              <FaPhoneAlt className="mr-2 text-blue-600" />
              <span className="text-sm">Phone: +1-234-567-890</span>
            </div>
            <div className="flex items-center text-gray-800 mb-4">
              <FaEnvelope className="mr-2 text-blue-600" />
              <span className="text-sm">Email: support@votingapp.com</span>
            </div>
            <p className="text-gray-600 text-sm">
              For any urgent queries or issues, feel free to reach out to our support team.
            </p>
          </div>

          {/* FAQs */}
          <div className="p-6 border border-gray-200 rounded-lg bg-green-50">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">FAQs</h2>
            <div className="flex items-center text-gray-800 mb-2">
              <FaQuestionCircle className="mr-2 text-green-600" />
              <span className="text-sm">How do I create an account?</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              You can create an account by clicking the Sign Up button on the homepage and filling in the required information.
            </p>

            <div className="flex items-center text-gray-800 mb-2">
              <FaQuestionCircle className="mr-2 text-green-600" />
              <span className="text-sm">How do I vote on an election?</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              To vote, navigate to the ongoing elections section, choose your preferred candidate, and submit your vote.
            </p>

            <NavLink
              to="/faqpage"
              className="text-sm text-blue-600 hover:underline"
            >
              View All FAQs
            </NavLink>
          </div>
        </div>

        {/* Feedback Form Section */}
        <div className="bg-gray-50 p-6 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Send Us Your Feedback</h2>
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Your Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Your Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Your Message</label>
              <textarea
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your message"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition duration-200"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
