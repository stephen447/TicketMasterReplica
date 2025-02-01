import Header from "../Components/Header";
import Footer from "../Components/Footer";
export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className=" p-6 text-white">
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Support</h1>
          <p className="text-gray-400 mb-4">
            Need help? We're here for you! Check out our frequently asked
            questions below or reach out to our support team.
          </p>

          <h2 className="text-2xl font-semibold mb-3">FAQs</h2>
          <div className="mb-4">
            <h3 className="font-semibold">How do I purchase tickets?</h3>
            <p className="text-gray-400">
              You can browse events and purchase tickets directly through our
              website.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">Can I get a refund?</h3>
            <p className="text-gray-400">
              Refund policies vary by event. Please check the event details for
              more information.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">
              How can I contact customer support?
            </h3>
            <p className="text-gray-400">
              You can reach us at support@eventure.com or call our helpline at
              (123) 456-7890.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <form className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-2 rounded bg-gray-700 text-white h-24"
            ></textarea>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
