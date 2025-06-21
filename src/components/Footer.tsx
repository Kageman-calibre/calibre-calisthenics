
import { Zap, Instagram, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gold/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-8 w-8 text-gold" />
              <span className="text-2xl font-bold text-gold tracking-wider">CALIBRE</span>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              Master your body with the power of calisthenics. Transform your physique through bodyweight training, no equipment needed.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-gold transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-white/80 hover:text-gold transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="#" className="text-white/80 hover:text-gold transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-gold transition-colors">Workouts</a></li>
              <li><a href="#" className="text-white/80 hover:text-gold transition-colors">Programs</a></li>
              <li><a href="#" className="text-white/80 hover:text-gold transition-colors">Progress</a></li>
              <li><a href="#" className="text-white/80 hover:text-gold transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-gold transition-colors">Help Center</a></li>
              <li><a href="#" className="text-white/80 hover:text-gold transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-white/80 hover:text-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/80 hover:text-gold transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/20 mt-8 pt-8 text-center">
          <p className="text-white/80">
            © 2024 Calibre. All rights reserved. Transform your body, transform your life.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
