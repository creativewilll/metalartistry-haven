const TermsOfService = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Terms of Service</h4>
      
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <section className="space-y-2">
        <h5 className="font-medium">Agreement to Terms</h5>
        <p>
          By accessing our website, you agree to be bound by these Terms of Service and to comply
          with all applicable laws and regulations. If you do not agree with any of these terms,
          you are prohibited from using or accessing this site.
        </p>
      </section>

      <section className="space-y-2">
        <h5 className="font-medium">Use License</h5>
        <p>
          Permission is granted to temporarily view the materials (information or software) on
          Matt Coffey Design's website for personal, non-commercial transitory viewing only.
          This is the grant of a license, not a transfer of title, and under this license you may not:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose</li>
          <li>Remove any copyright or other proprietary notations from the materials</li>
          <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h5 className="font-medium">Disclaimer</h5>
        <p>
          The materials on Matt Coffey Design's website are provided on an 'as is' basis.
          Matt Coffey Design makes no warranties, expressed or implied, and hereby disclaims
          and negates all other warranties including, without limitation, implied warranties
          or conditions of merchantability, fitness for a particular purpose, or non-infringement
          of intellectual property or other violation of rights.
        </p>
      </section>

      <section className="space-y-2">
        <h5 className="font-medium">Contact Information</h5>
        <p>
          If you have any questions about these Terms of Service, please contact us at mcdesignart@aol.com
        </p>
      </section>
    </div>
  )
}

export default TermsOfService
