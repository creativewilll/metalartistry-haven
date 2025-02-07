const PrivacyPolicy = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Privacy Policy</h4>
      
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <section className="space-y-2">
        <h5 className="font-medium">Information We Collect</h5>
        <p>
          We collect information you provide directly to us when you contact us through our website,
          including your name, email address, phone number, and any other information you choose to provide.
        </p>
      </section>

      <section className="space-y-2">
        <h5 className="font-medium">How We Use Your Information</h5>
        <p>
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Respond to your inquiries and provide customer service</li>
          <li>Send you updates about our services and projects</li>
          <li>Improve our website and services</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h5 className="font-medium">Information Sharing</h5>
        <p>
          We do not sell, trade, or otherwise transfer your personal information to outside parties.
          This does not include trusted third parties who assist us in operating our website or
          servicing you, as long as those parties agree to keep this information confidential.
          WE ARE NOT INTERESTED IN YOUR SELLING YOUR PERSONAL INFORMATION! This is a personal, 
          portfolio-based website, SOLELY for the purpose of building and/or furthering the
          development, revenue, and progress of my client. 
        </p>
      </section>

      <section className="space-y-2">
        <h5 className="font-medium">Contact Us</h5>
        <p>
          If you have any questions about this Privacy Policy, please contact us at mcdesignart@aol.com
        </p>
      </section>
    </div>
  )
}

export default PrivacyPolicy
