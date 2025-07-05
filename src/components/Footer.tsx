
import { Instagram, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/lovable-uploads/b99fef11-6aaf-4783-9d1e-a21e1985649b.png" 
                alt="Calibre Calisthenics Logo" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-muted-foreground mb-8 max-w-md text-base sm:text-lg leading-relaxed">
              Master your body with the power of calisthenics. Transform your physique through bodyweight training, no equipment needed.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-muted">
                <Instagram className="h-6 w-6 sm:h-7 sm:w-7" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-muted">
                <Youtube className="h-6 w-6 sm:h-7 sm:w-7" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-muted">
                <Twitter className="h-6 w-6 sm:h-7 sm:w-7" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-6 text-lg sm:text-xl">Quick Links</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-base sm:text-lg block py-1">Workouts</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-base sm:text-lg block py-1">Programs</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-base sm:text-lg block py-1">Progress</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-base sm:text-lg block py-1">Community</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-foreground font-semibold mb-6 text-lg sm:text-xl">Support</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-base sm:text-lg block py-1">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-base sm:text-lg block py-1">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-base sm:text-lg block py-1">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-base sm:text-lg block py-1">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 sm:mt-16 pt-8 sm:pt-12 text-center">
          <p className="text-muted-foreground text-sm sm:text-base">
            © 2024 Calibre. All rights reserved. Transform your body, transform your life.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
