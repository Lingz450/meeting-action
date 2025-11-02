'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface UpgradeButtonProps {
  plan: 'pro' | 'team';
  variant?: 'default' | 'outline';
  className?: string;
  children: React.ReactNode;
}

export function UpgradeButton({ plan, variant = 'default', className, children }: UpgradeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState<'stripe' | 'paystack'>('stripe');

  const handleUpgrade = async (selectedProvider?: 'stripe' | 'paystack', currency?: string) => {
    setIsLoading(true);
    const paymentProvider = selectedProvider || provider;
    
    try {
      const endpoint = paymentProvider === 'stripe' 
        ? '/api/stripe/checkout' 
        : '/api/paystack/checkout';
      
      const body: any = { plan };
      if (currency && paymentProvider === 'paystack') {
        body.currency = currency;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show specific error message if available
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to payment page
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to start checkout. Please try again.';
      alert(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex gap-2 ${className || ''}`}>
      <Button
        onClick={() => handleUpgrade()}
        disabled={isLoading}
        variant={variant}
        className="flex-1"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          children
        )}
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={variant}
            size="icon"
            className="w-10 flex-shrink-0"
            disabled={isLoading}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Choose Payment Method</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => handleUpgrade('stripe')}>
            <div className="flex flex-col">
              <span className="font-medium">💳 Stripe</span>
              <span className="text-xs text-gray-500">International cards</span>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs">Paystack (Africa)</DropdownMenuLabel>
          
          <DropdownMenuItem onClick={() => handleUpgrade('paystack', 'NGN')}>
            <div className="flex flex-col">
              <span className="font-medium">🇳🇬 Nigeria (NGN)</span>
              <span className="text-xs text-gray-500">
                {plan === 'pro' ? '₦45,000' : '₦235,000'} / month
              </span>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleUpgrade('paystack', 'GHS')}>
            <div className="flex flex-col">
              <span className="font-medium">🇬🇭 Ghana (GHS)</span>
              <span className="text-xs text-gray-500">
                {plan === 'pro' ? 'GH₵120' : 'GH₵625'} / month
              </span>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleUpgrade('paystack', 'ZAR')}>
            <div className="flex flex-col">
              <span className="font-medium">🇿🇦 South Africa (ZAR)</span>
              <span className="text-xs text-gray-500">
                {plan === 'pro' ? 'R350' : 'R1,825'} / month
              </span>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleUpgrade('paystack', 'USD')}>
            <div className="flex flex-col">
              <span className="font-medium">💵 USD (Paystack)</span>
              <span className="text-xs text-gray-500">
                {plan === 'pro' ? '$19' : '$99'} / month
              </span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

