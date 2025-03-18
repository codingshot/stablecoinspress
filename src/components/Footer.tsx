
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-20">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/603d52e2-2c07-43a9-80a0-67ce5195aa2b.png" 
                alt="stablecoins.press logo" 
                className="h-10"
              />
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-telegram"
                    >
                      <path d="M21 12a9 9 0 1 1-9-9c4.97 0 9 4.03 9 9z"></path>
                      <path d="M15 10.1L9 13.8l-2-1"></path>
                      <path d="M9 13.8v2.3a.5.5 0 0 0 .68.4L15 10.1"></path>
                    </svg>
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
