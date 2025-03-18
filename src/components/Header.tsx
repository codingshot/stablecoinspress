
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll position to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-white py-5'
    }`}>
      <div className="container-narrow flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/603d52e2-2c07-43a9-80a0-67ce5195aa2b.png" 
            alt="stablecoins.press logo" 
            className="h-10 md:h-12"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-black font-medium hover:text-brand transition-colors">
            News
          </Link>
          <a 
            href="https://t.me/stablecoinspress" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black hover:text-brand transition-colors"
            aria-label="Telegram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
          </a>
          <button className="text-black hover:text-brand transition-colors">
            <Search size={20} />
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md animate-fade-in-up">
          <div className="container py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-black font-medium hover:text-brand transition-colors px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              News
            </Link>
            <a 
              href="https://t.me/stablecoinspress" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-black font-medium hover:text-brand transition-colors px-4 py-2 gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
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
            <div className="px-4 py-2">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search news..." 
                  className="w-full px-4 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
