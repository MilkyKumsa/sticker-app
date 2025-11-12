export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 text-gray-800 px-8 py-16">
      <h1 className="text-4xl font-bold text-center mb-10 text-green-700">Pricing</h1>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[
          { title: "Basic Pack", price: "$5", desc: "5 custom stickers, matte finish" },
          { title: "Pro Pack", price: "$12", desc: "15 premium stickers, glossy finish" },
          { title: "Mega Pack", price: "$20", desc: "30 mixed stickers, waterproof" },
        ].map((plan) => (
          <div
            key={plan.title}
            className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-2">{plan.title}</h2>
            <p className="text-3xl font-bold mb-2">{plan.price}</p>
            <p className="text-gray-500">{plan.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
    