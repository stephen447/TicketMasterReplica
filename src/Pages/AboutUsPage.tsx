import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className=" text-white p-6">
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 my-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-center text-blue-500">
            About Eventure
          </h1>
          <p className="text-lg text-gray-300 mb-4">
            Welcome to Eventure, your go-to platform for discovering and booking
            tickets to the best concerts, sports events, and theater
            performances. Our mission is to connect fans with unforgettable
            experiences while providing a seamless ticketing experience.
          </p>
          <h2 className="text-2xl font-semibold mb-3 text-blue-400">
            Why Choose Eventure?
          </h2>
          <ul className="list-disc list-inside text-gray-300">
            <li>Exclusive access to top events</li>
            <li>Secure and hassle-free ticket purchasing</li>
            <li>24/7 customer support</li>
            <li>Easy-to-use interface</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-3 text-blue-400">
            Our Vision
          </h2>
          <p className="text-lg text-gray-300">
            We believe in the power of live experiences to bring people
            together. At Eventure, we strive to make every event accessible and
            enjoyable for everyone.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-3 text-blue-400">
            Contact Us
          </h2>
          <p className="text-lg text-gray-300">
            Have questions? Reach out to our support team at{" "}
            <span className="text-blue-400">support@eventure.com</span>.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
