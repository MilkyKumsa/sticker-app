export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 px-8 py-16">
      <h1 className="text-4xl font-bold text-center mb-10 text-green-700">Contact Us</h1>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-4">
        <p className="text-gray-600 text-center">
          Have questions, custom requests, or partnership ideas? Drop us a message!
        </p>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
