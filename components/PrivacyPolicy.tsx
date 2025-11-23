import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-secondary/30 p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Privacy Policy</h1>
        <p className="text-primary/60 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-primary/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-primary mb-3">1. Introduction</h2>
            <p>
              Welcome to Gather. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you visit our 
              website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-3">2. Information We Collect</h2>
            <p className="mb-3">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-primary/70">
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
              <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-3">3. How We Use Your Personal Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-primary/70">
              <li>To provide the venue booking services you request.</li>
              <li>To manage your relationship with us.</li>
              <li>To improve our website, products/services, marketing or customer relationships.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-3">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-3">5. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us via our Contact page or email us at privacy@gather.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};