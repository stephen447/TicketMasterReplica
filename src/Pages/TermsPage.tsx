import Header from "../Components/Header";
import Footer from "../Components/Footer";
export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="text-white p-6">
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-400 mb-4">
            Welcome to Eventure! These Terms of Service govern your use of our
            platform. By accessing or using Eventure, you agree to comply with
            these terms.
          </p>

          <h2 className="text-2xl font-semibold mt-4">
            1. User Responsibilities
          </h2>
          <p className="text-gray-400 mb-4">
            You are responsible for maintaining the security of your account and
            ensuring that your use of Eventure complies with all applicable
            laws.
          </p>

          <h2 className="text-2xl font-semibold mt-4">2. Ticket Purchases</h2>
          <p className="text-gray-400 mb-4">
            All ticket sales are final unless otherwise specified. Eventure is
            not responsible for cancellations or changes made by event
            organizers.
          </p>

          <h2 className="text-2xl font-semibold mt-4">
            3. Prohibited Activities
          </h2>
          <p className="text-gray-400 mb-4">
            Users must not engage in fraudulent activities, unauthorized access,
            or any action that disrupts the platform’s functionality.
          </p>

          <h2 className="text-2xl font-semibold mt-4">
            4. Limitation of Liability
          </h2>
          <p className="text-gray-400 mb-4">
            Eventure is not liable for any damages arising from your use of the
            platform, including but not limited to ticket availability or
            pricing errors.
          </p>

          <h2 className="text-2xl font-semibold mt-4">5. Changes to Terms</h2>
          <p className="text-gray-400 mb-4">
            We reserve the right to update these Terms of Service at any time.
            Continued use of Eventure after changes constitutes acceptance of
            the revised terms.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
