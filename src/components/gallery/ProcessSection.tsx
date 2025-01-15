export function ProcessSection() {
  return (
    <section className="bg-muted py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['Design', 'Craft', 'Install'].map((step, index) => (
            <div key={step} className="bg-card p-6 rounded-lg">
              <div className="text-accent text-2xl font-bold mb-4">0{index + 1}</div>
              <h3 className="text-xl font-semibold mb-2">{step}</h3>
              <p className="text-muted-foreground">
                {step === 'Design'
                  ? 'We begin with a consultation to understand your vision and create detailed designs.'
                  : step === 'Craft'
                  ? 'Each piece is meticulously handcrafted in our workshop using traditional techniques.'
                  : 'Professional installation ensures your piece is perfectly placed and secured.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}