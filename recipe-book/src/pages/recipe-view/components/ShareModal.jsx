import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ShareModal = ({ recipe, isOpen, onClose }) => {
  const [shareMethod, setShareMethod] = useState('link');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(`Check out this delicious recipe: ${recipe?.title}`);
  const [copied, setCopied] = useState(false);

  const recipeUrl = `${window.location?.origin}/recipe-view?id=${recipe?.id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(recipeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Recipe: ${recipe?.title}`);
    const body = encodeURIComponent(`${message}\n\n${recipeUrl}`);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
  };

  const handleSocialShare = (platform) => {
    const text = encodeURIComponent(`${recipe?.title} - ${recipe?.description}`);
    const url = encodeURIComponent(recipeUrl);
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${text}&media=${encodeURIComponent(recipe?.image)}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`
    };

    window.open(shareUrls?.[platform], '_blank', 'width=600,height=400');
  };

  const generateRecipeCard = () => {
    const cardContent = `
      ${recipe?.title}
      
      ${recipe?.description}
      
      Prep Time: ${recipe?.prepTime} min
      Cook Time: ${recipe?.cookTime} min
      Servings: ${recipe?.servings}
      Difficulty: ${recipe?.difficulty}
      
      Ingredients:
      ${recipe?.ingredients?.map(ing => `• ${ing?.quantity} ${ing?.unit} ${ing?.name}`)?.join('\n')}
      
      Instructions:
      ${recipe?.instructions?.map((step, i) => `${i + 1}. ${step?.instruction}`)?.join('\n')}
      
      Recipe from RecipeBook: ${recipeUrl}
    `;
    
    return cardContent;
  };

  const handlePrintCard = () => {
    const printContent = generateRecipeCard();
    const printWindow = window.open('', '_blank');
    printWindow?.document?.write(`
      <html>
        <head>
          <title>${recipe?.title} - Recipe Card</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
            h1 { color: #333; border-bottom: 2px solid #E8B4B8; padding-bottom: 10px; }
            .meta { background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .section { margin: 20px 0; }
            .section h2 { color: #666; font-size: 18px; margin-bottom: 10px; }
            ul, ol { padding-left: 20px; }
            li { margin: 5px 0; }
          </style>
        </head>
        <body>
          <h1>${recipe?.title}</h1>
          <p>${recipe?.description}</p>
          <div class="meta">
            <strong>Prep Time:</strong> ${recipe?.prepTime} min | 
            <strong>Cook Time:</strong> ${recipe?.cookTime} min | 
            <strong>Servings:</strong> ${recipe?.servings} | 
            <strong>Difficulty:</strong> ${recipe?.difficulty}
          </div>
          <div class="section">
            <h2>Ingredients</h2>
            <ul>
              ${recipe?.ingredients?.map(ing => `<li>${ing?.quantity} ${ing?.unit} ${ing?.name}</li>`)?.join('')}
            </ul>
          </div>
          <div class="section">
            <h2>Instructions</h2>
            <ol>
              ${recipe?.instructions?.map(step => `<li>${step?.instruction}</li>`)?.join('')}
            </ol>
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #666;">
            Recipe from RecipeBook: ${recipeUrl}
          </p>
        </body>
      </html>
    `);
    printWindow?.document?.close();
    printWindow?.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-popover border border-border rounded-lg shadow-soft-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading font-semibold text-xl text-popover-foreground">
            Share Recipe
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Share Method Tabs */}
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setShareMethod('link')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                shareMethod === 'link' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Link
            </button>
            <button
              onClick={() => setShareMethod('social')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                shareMethod === 'social' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Social
            </button>
            <button
              onClick={() => setShareMethod('email')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                shareMethod === 'email' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Email
            </button>
          </div>

          {/* Link Sharing */}
          {shareMethod === 'link' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="font-body font-medium text-sm text-popover-foreground">
                  Recipe Link
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={recipeUrl}
                    readOnly
                    className="flex-1 px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyLink}
                    iconName={copied ? "Check" : "Copy"}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>
              
              <Button
                variant="outline"
                onClick={handlePrintCard}
                iconName="Printer"
                iconPosition="left"
                fullWidth
              >
                Print Recipe Card
              </Button>
            </div>
          )}

          {/* Social Sharing */}
          {shareMethod === 'social' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleSocialShare('facebook')}
                  iconName="Facebook"
                  iconPosition="left"
                  className="justify-start"
                >
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialShare('twitter')}
                  iconName="Twitter"
                  iconPosition="left"
                  className="justify-start"
                >
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialShare('pinterest')}
                  iconName="Image"
                  iconPosition="left"
                  className="justify-start"
                >
                  Pinterest
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialShare('whatsapp')}
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="justify-start"
                >
                  WhatsApp
                </Button>
              </div>
            </div>
          )}

          {/* Email Sharing */}
          {shareMethod === 'email' && (
            <div className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e?.target?.value)}
                placeholder="friend@example.com"
              />
              
              <div className="space-y-2">
                <label className="font-body font-medium text-sm text-popover-foreground">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e?.target?.value)}
                  className="w-full p-3 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                  rows={3}
                />
              </div>
              
              <Button
                variant="default"
                onClick={handleEmailShare}
                disabled={!email}
                iconName="Mail"
                iconPosition="left"
                fullWidth
              >
                Send Email
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;