import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="container mx-auto p-6 text-white">
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="mb-4">
            Welcome to Eventure. Your privacy is important to us. This Privacy
            Policy explains how we collect, use, and protect your information.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            1. Information We Collect
          </h2>
          <p className="text-gray-400 mb-4">
            We may collect personal information such as your name, email, and
            payment details when you use our services.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-400 mb-4">
            We use your information to process transactions, improve our
            services, and communicate with you about your bookings.
          </p>

          <h2 className="text-2xl font-semibold mt-6">3. Data Protection</h2>
          <p className="text-gray-400 mb-4">
            We implement security measures to protect your data from
            unauthorized access or disclosure.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            4. Third-Party Services
          </h2>
          <p className="text-gray-400 mb-4">
            We may share data with trusted third parties for payment processing
            and analytics, ensuring compliance with privacy laws.
          </p>

          <h2 className="text-2xl font-semibold mt-6">5. Your Rights</h2>
          <p className="text-gray-400 mb-4">
            You have the right to access, update, or delete your personal
            information. Contact us for assistance.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            6. Changes to This Policy
          </h2>
          <p className="text-gray-400 mb-4">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page.
          </p>

          <p className="mt-6">
            If you have any questions, please contact us at
            support@eventure.com.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
