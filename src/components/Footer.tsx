
import { Link } from 'react-router-dom';
import { Telegram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-20">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="font-jersey text-2xl font-semibold text-brand">
              stablecoins<span className="text-black">.press</span>
            </Link>
            <p className="text-gray-500 mt-2 text-sm">
              The premier daily source for stablecoin news
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div>
              <h3 className="font-jersey text-brand font-medium mb-2 text-lg">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://t.me/stablecoinspress" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-brand transition-colors gap-2"
                  >
                    <Telegram size={18} />
                    <span>Telegram</span>
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-jersey text-brand font-medium mb-2 text-lg">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-brand transition-colors"
                  >
                    Submit News
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-brand transition-colors"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} stablecoins.press. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
