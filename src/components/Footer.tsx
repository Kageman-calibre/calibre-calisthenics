
import { Zap, Instagram, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gold/20 py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-gold" />
              <span className="text-xl sm:text-2xl font-bold text-gold tracking-wider">CALIBRE</span>
            </div>
            <p className="text-white/80 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
              Master your body with the power of calisthenics. Transform your physique through bodyweight training, no equipment needed.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-gold transition-colors">
                <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-white/80 hover:text-gold transition-colors">
                <Youtube className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-white/80 hover:text-gold transition-colors">
                <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li><a href="#" className="text-white/80 hover:text-gold transition-colors text-sm sm:text-base">Workouts</a></li>
              <li><a href="#" className="text-white/80 hover:text-gold transition-colors text-sm sm:text-base">Programs</a></li>
              <li><a href="#" className="text-white/80 hover:text-gold transition-colors text-sm sm:text-base">Progress</a></li>
              <li><a href="#" className="text-white/80 hover:text-gold transition-colors text-sm sm:text-base">Community</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li><a href="#" className="text-white/80 hover:text-gold transition-colors text-sm sm:text-base">Help Center</a></li>
              <li><a href="#" className="text-white/80 hover:text-gold transition-colors text-sm sm:text-base">Contact Us</a></li>
              <li><a href="#" className="text-white/80 hover:text-gold transition-colors text-sm sm:text-base">Privacy Policy</a></li>
              <li><a href="#" className="text-white/80 hover:text-gold transition-colors text-sm sm:text-base">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-white/80 text-xs sm:text-sm">
            © 2024 Calibre. All rights reserved. Transform your body, transform your life.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
