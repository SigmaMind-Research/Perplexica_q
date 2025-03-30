/* eslint-disable react/no-unescaped-entities */
import React from 'react';

const TermsOfServicePage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#131010] text-white">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">Last Updated: March 22, 2025</p>

      <p className="mb-6">
        Welcome to PotatoAI ("Product"), operated by SigmaMind Research Labs ("Company," "we," "us," or "our"). By accessing or using our Service, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Use of the Service</h2>
        <p>
          PotatoAI is an AI-powered search engine designed to provide users with accurate and efficient search results based on natural language queries, web searches, and other data sources. You may use the Service only in compliance with these Terms and applicable laws.
        </p>
        <h3 className="text-xl font-medium mt-4 mb-2">Eligibility</h3>
        <p>
          You must be at least 11 years old to use the Service. By using the Service, you represent and warrant that you meet this age requirement and have the legal capacity to enter into these Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Data</h2>
        <p className="mb-2">
          We are committed to protecting your privacy and handling your data responsibly. By using the Service, you agree that we may collect, store, and process the following types of data:
        </p>
        <ul className="list-disc pl-6 mb-2">
          <li><strong>Personal Information</strong>: Information you provide, such as your name, email address, and payment details when you create an account or make a purchase.</li>
          <li><strong>Usage Data</strong>: Queries you submit, search history, and interactions with the Service to improve our AI algorithms and provide personalized results.</li>
          <li><strong>Uploaded Content</strong>: Any files, text, images, or other materials you upload for analysis or processing by the Service.</li>
        </ul>
        <p className="mb-2">We use this data to:</p>
        <ul className="list-disc pl-6 mb-2">
          <li>Deliver and improve the Service.</li>
          <li>Train our AI models to enhance search accuracy and functionality.</li>
          <li>Communicate with you about your account, updates, or promotions (with your consent where required).</li>
          <li>Comply with legal obligations.</li>
        </ul>
        {/* <p>
          For more details, please review our <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>. We do not sell your personal data to third parties, but we may share anonymized or aggregated data with partners for research or analytics purposes.
        </p> */}
      </section>

      {/* <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Pricing and Payment</h2>
        <p className="mb-2">The Service operates on a token-based and web search-based pricing model for general usage. Pricing details are as follows:</p>
        <h3 className="text-xl font-medium mt-4 mb-2">Tokens</h3>
        <ul className="list-disc pl-6 mb-2">
          <li>Tokens are the primary currency for accessing premium features, such as advanced AI queries, file analysis, or extended search capabilities.</li>
          <li>Token pricing:  
            <ul className="list-circle pl-6">
              <li>$10 for 1,000 tokens</li>
              <li>$25 for 3,000 tokens</li>
              <li>$100 for 15,000 tokens</li>
            </ul>
          </li>
          <li>Each query or action consumes a specific number of tokens based on complexity (e.g., 1 token for a basic search, 5 tokens for a web-enhanced search, 10 tokens for file analysis).</li>
        </ul>
        <h3 className="text-xl font-medium mt-4 mb-2">Web Searches</h3>
        <ul className="list-disc pl-6 mb-2">
          <li>Web searches are billed separately from token usage.</li>
          <li><b>**</b>Cost: $0.003 per web search,with a monthly cap of $50 for unlimited web searches (optional subscription).</li>
        </ul>
        <h3 className="text-xl font-medium mt-4 mb-2">Payment</h3>
        <ul className="list-disc pl-6">
          <li>Payments are processed securely via [list payment providers, e.g., Stripe, PayPal].</li>
          <li>All fees are non-refundable except as outlined in the Refund Policy below.</li>
          <li>We may update pricing at any time, with notice provided via email or on our website.</li>
        </ul>
      </section> */}

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. API Pricing</h2>
        <p className="mb-2">
          Potato AI offers API access for programmatic use of our AI models. API pricing is based on the specific model used, with costs calculated per million tokens for input and output, as well as web search usage where applicable.
        </p>
        <h3 className="text-xl font-medium mt-4 mb-2">Model Pricing</h3>
        <p className="mb-2">API costs are as follows (all prices are in USD per million tokens):</p>
        <table className="table-auto w-full mb-4 border-collapse border border-gray-600">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-600 px-4 py-2">Model Name</th>
              <th className="border border-gray-600 px-4 py-2">Input Token Per Million</th>
              <th className="border border-gray-600 px-4 py-2">Output Token Per Million</th>
              <th className="border border-gray-600 px-4 py-2">Web Search per 1000 search</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-600 px-4 py-2">orca</td>
              <td className="border border-gray-600 px-4 py-2">$0.12</td>
              <td className="border border-gray-600 px-4 py-2">$0.58</td>
              <td className="border border-gray-600 px-4 py-2">$3.00</td>
            </tr>
            <tr>
              <td className="border border-gray-600 px-4 py-2">orca-pro</td>
              <td className="border border-gray-600 px-4 py-2">$2.20</td>
              <td className="border border-gray-600 px-4 py-2">$8.50</td>
              <td className="border border-gray-600 px-4 py-2">$3.00</td>
            </tr>
          </tbody>
        </table>
        {/* <h3 className="text-xl font-medium mt-4 mb-2">Web Searches via API</h3>
        <ul className="list-disc pl-6 mb-2">
          <li>Web searches initiated through the API are billed at <b>$3 per 1000 search</b>, consistent with the general web search pricing.</li>
          <li>No monthly cap applies to API web searches unless explicitly subscribed to the $50 unlimited plan.</li>
        </ul> */}
        <h3 className="text-xl font-medium mt-4 mb-2">Billing</h3>
        <ul className="list-disc pl-6">
          <li>API usage is tracked by input and output tokens per model, plus any web searches.</li>
          <li>Invoices are generated monthly based on total usage and payable via our platform using Razorpay.</li>
          <li>API pricing is subject to change with notice provided via email or on our website.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Refund Policy</h2>
        <p>
          When you deposit funds into your account (e.g., a $100 deposit), the amount is converted into tokens and/or web search credits based on your usage preferences. We offer refunds only for unused credits, subject to the following conditions:
        </p>
        <ul className="list-disc pl-6 mb-2">
          <li>Refunds are calculated based on the remaining balance of unused tokens and web search credits at the time of your refund request.</li>
          <li>To request a refund, contact us at support@thepotatoai.com within 15 days of your deposit.</li>
          <li>Refunds will be processed to your original payment method within 14 business days.</li>
          <li>Any tokens or credits used prior to the refund request are non-refundable.</li>
        </ul>
        <p>Example: If you deposit $100 and use $30 worth of tokens and web searches, you may request a refund for the remaining $70.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
        <ul className="list-disc pl-6">
          <li><strong>Our Content</strong>: The Service, including its AI technology, design, and branding, is owned by SigmaMind Research Labs and protected by copyright, trademark, and other intellectual property laws.</li>
          <li><strong>Your Content</strong>: You retain ownership of any content you upload or submit to the Service. By providing content, you grant us a non-exclusive, worldwide, royalty-free license to use, process, and analyze it solely to provide and improve the Service.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Prohibited Conduct</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6">
          <li>Use the Service for illegal purposes or to violate any laws.</li>
          <li>Attempt to reverse-engineer, hack, or interfere with the Service.</li>
          <li>Submit harmful, offensive, or infringing content.</li>
          <li>Use the Service to generate content that violates third-party rights or applicable regulations.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
        <p>
          We may suspend or terminate your access to the Service at our discretion, with or without notice, if you violate these Terms or engage in conduct that harms the Service or other users. Upon termination, any unused tokens or credits are forfeited unless a refund is requested per Section 4.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Disclaimer of Warranties</h2>
        <p>
          The Service is provided "as is" and "as available" without warranties of any kind, express or implied. We do not guarantee that the Service will be uninterrupted, error-free, or completely accurate.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, SigmaMind shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service. Our total liability shall not exceed the amount you paid to us in the preceding 12 months.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">10. Company Address</h2>
        <p>
          SigmaMind Research Labs (OPC) Pvt. Ltd.  
          <br />Balaji Vihar, Govinpura 
          <br />Jaipur, Rajasthan  
          <br />India
          <br/> Mobile : +919351864458  
          <br />Email: support@thepotatoai.com
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">11. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. We will notify you of material changes via email or a notice on the Service. Your continued use of the Service after such changes constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
        <p>
          These Terms are governed by the laws of Rajasthan, India, without regard to conflict of law principles. Any disputes shall be resolved in the courts of India.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
        <p>
          If you have questions about these Terms, please contact us at support@thepotatoai.com.
        </p>
      </section>
      <footer className="text-gray-400 text-sm mt-12 text-center">
          © 2025 SigmaMind Research Labs. All Rights Reserved.
        </footer>
    </div>
  );
};

export default TermsOfServicePage;