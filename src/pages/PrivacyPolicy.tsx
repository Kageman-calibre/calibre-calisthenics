
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen gradient-black-burgundy">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-gold hover:text-gold/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="bg-black/50 backdrop-blur-lg border-gold/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gold">Privacy Policy</CardTitle>
            <p className="text-white/80">Last updated: {new Date().toLocaleDateString('en-US')}</p>
          </CardHeader>
          <CardContent className="space-y-6 text-white/90">
            <section>
              <h2 className="text-2xl font-semibold text-gold mb-3">1. Information We Collect</h2>
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-white">Account Information:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Email address</li>
                  <li>Username</li>
                  <li>Profile information you provide</li>
                </ul>
                
                <h3 className="text-lg font-medium text-white">Workout Data:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Training data and progress</li>
                  <li>Exercise preferences</li>
                  <li>App usage analytics</li>
                  <li>Device information</li>
                </ul>
                
                <h3 className="text-lg font-medium text-white">Optional Information:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Progress photos (stored locally)</li>
                  <li>Body measurements</li>
                  <li>Training goals</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gold mb-3">2. How We Use Your Information</h2>
              <p className="mb-3">We use collected information to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Provide personalized workout recommendations</li>
                <li>Track your fitness progress</li>
                <li>Improve app functionality</li>
                <li>Send important app updates</li>
                <li>Provide customer support</li>
                <li>Show relevant ads to support the app</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gold mb-3">3. Data Sharing</h2>
              <p className="mb-3">We do NOT sell, trade, or share your personal information with third parties except:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>When required by law</li>
                <li>To protect our rights and safety</li>
                <li>With your explicit consent</li>
                <li>With advertising partners to show relevant ads (anonymized data)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gold mb-3">4. Data Security</h2>
              <p className="mb-3">We implement appropriate security measures to protect your personal information:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Encrypted data transmission</li>
                <li>Secure servers</li>
                <li>Regular security audits</li>
                <li>Limited access controls</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gold mb-3">5. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and data</li>
                <li>Export your data</li>
                <li>Opt out of communications</li>
                <li>Control ad settings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gold mb-3">6. Data Retention</h2>
              <p className="mb-3">We retain your data:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Account data: Until account deletion</li>
                <li>Usage data: Maximum 2 years</li>
                <li>Analytics data: Anonymized after 1 year</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gold mb-3">7. Advertising</h2>
              <p className="mb-3">Calibre uses advertising to keep the app free. We work with trusted advertising partners like Google AdMob to show relevant ads. Advertising partners may use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Show personalized ads based on your interests</li>
                <li>Measure ad effectiveness</li>
                <li>Improve ad experience</li>
              </ul>
              <p className="mt-3">You can adjust your ad settings in your device settings or by contacting us.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gold mb-3">8. Children's Privacy</h2>
              <p>Calibre is not intended for children under 13 years old. We do not knowingly collect information from children under 13.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gold mb-3">9. Privacy Policy Changes</h2>
              <p>We may update this policy. Users will be notified via app notification and email.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gold mb-3">10. Contact Information</h2>
              <p className="mb-3">For privacy questions, contact us at:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Email: privacy@calibre-app.com</li>
                <li>Address: [Your company address]</li>
              </ul>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
