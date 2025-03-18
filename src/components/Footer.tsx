
import { Link } from 'react-router-dom';
import { Send, MessageCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import SubmitNewsForm from './SubmitNewsForm';
import { useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-20">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/2d4ceafd-1824-4085-bac7-a50af005350d.png" 
                alt="stablecoins.press logo" 
                className="h-10"
              />
            </Link>
            <p className="text-gray-500 mt-2 text-sm">
              The premier daily source for stablecoin news
            </p>
            <a 
              href="https://t.me/stablecoinspress" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-brand transition-colors gap-2 mt-3"
            >
              <Send className="h-5 w-5" />
              <span>Telegram</span>
            </a>
          </div>
          
          <div>
            <h3 className="font-jersey text-brand font-medium mb-2 text-lg">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
                  <DialogTrigger asChild>
                    <button className="text-gray-600 hover:text-brand transition-colors flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      <span>Submit News</span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md p-0">
                    <SubmitNewsForm onClose={() => setIsSubmitDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
              </li>
            </ul>
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
