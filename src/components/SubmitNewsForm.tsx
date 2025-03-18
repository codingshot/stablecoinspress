import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Upload, Copy, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const SubmitNewsForm = ({ onClose }: { onClose: () => void }) => {
  const [tweetUrl, setTweetUrl] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [tweetId, setTweetId] = useState('');
  const [username, setUsername] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  
  const submissionText = "!submit @curatedotfun #stablecoins";

  const validateTweetUrl = (url: string) => {
    const twitterRegex = /(?:twitter|x)\.com\/([^\/]+)\/status\/(\d+)/i;
    const match = url.match(twitterRegex);
    
    if (match) {
      const extractedUsername = match[1];
      const extractedTweetId = match[2];
      setUsername(extractedUsername);
      setTweetId(extractedTweetId);
      setIsValid(true);
      return true;
    } else {
      setIsValid(false);
      setTweetId('');
      setUsername('');
      return false;
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(submissionText).then(() => {
      setCopySuccess(true);
      toast.success('Text copied to clipboard!');
      setTimeout(() => setCopySuccess(false), 3000);
    }).catch(err => {
      toast.error('Failed to copy text');
      console.error('Failed to copy: ', err);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateTweetUrl(tweetUrl)) {
      const replyIntentUrl = `https://twitter.com/intent/tweet?in_reply_to=${tweetId}&text=${encodeURIComponent(submissionText)}`;
      
      window.open(replyIntentUrl, '_blank');
      toast.success('Opening reply form in Twitter');
      onClose();
    } else {
      toast.error('Please enter a valid Twitter/X tweet URL');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Submit News</CardTitle>
        <CardDescription>
          Share a newsworthy tweet about stablecoins with our community
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="tweet-url" className="block text-sm font-medium text-gray-700 mb-1">
                Twitter/X Post URL
              </label>
              <Input
                id="tweet-url"
                type="text"
                value={tweetUrl}
                onChange={(e) => {
                  setTweetUrl(e.target.value);
                  validateTweetUrl(e.target.value);
                }}
                placeholder="https://x.com/username/status/123456789"
                className="w-full"
              />
              <p className="mt-1 text-xs text-gray-500">
                Paste the full URL of the tweet you want to submit
              </p>
            </div>

            <div className="flex items-center p-3 bg-gray-50 border border-gray-200 rounded-md gap-2">
              <div className="flex-grow">
                <p className="text-sm font-medium">{submissionText}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Copy this text to use in your submission
                </p>
              </div>
              <Button
                type="button" 
                variant="outline"
                size="sm"
                onClick={handleCopyText}
                className="flex-shrink-0"
              >
                {copySuccess ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>

            {isValid && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-800">
                  Valid tweet found from @{username}
                </p>
              </div>
            )}

            {tweetUrl && !isValid && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800">
                    Please enter a valid Twitter/X tweet URL
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    Format: https://x.com/username/status/123456789
                  </p>
                </div>
              </div>
            )}

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
              <h4 className="font-medium text-sm mb-2">Submission Instructions:</h4>
              <ol className="text-xs text-gray-700 space-y-1 list-decimal pl-4">
                <li>Enter the URL of a newsworthy tweet about stablecoins</li>
                <li>Copy the submission text shown above</li>
                <li>Click "Submit" to open a reply form on Twitter</li>
                <li>Post the reply to complete your submission</li>
                <li>Our curators will review your submission</li>
              </ol>
            </div>
          </div>
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={!isValid}
          className="gap-2"
        >
          <Upload className="h-4 w-4" />
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubmitNewsForm;
