'use client';

import { useState, useTransition } from 'react';
import { quicksand } from '@/lib/fonts';
import AuthCard from '@/components/auth/AuthCard';
import BrandPanel from '@/components/auth/BrandPanel';
import FormField from '@/components/auth/FormField';
import SubmitButton from '@/components/auth/SubmitButton';
import { emailIcon, lockIcon } from '@/components/auth/icons';
import { loginAction } from './actions';




export default function AlmuniLoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSignin = () => {
    setError(null);
    startTransition(async () => {
      const result = await loginAction(formData.email, formData.password);
      // On success, loginAction redirects server-side, so we only ever
      // land back here when there's an error to show.
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <AuthCard
      panelSide="left"
      fontClassName={quicksand.className}
      branding={
        <BrandPanel
          showLogo
          heading="Welcome Back!"
          description="Enter your personal details to use all of the site's features."
          cta={{ label: 'Create Account', href: '/almuni/almuni-register' }}
        />
      }
    >
      <h2 className="text-[28px] font-bold text-[#241B3A] mb-5">Welcome Back</h2>
      <p className="text-[12.5px] text-[#8B87A3] mb-6">
        Sign in with your email and password
      </p>

      <div className="mb-4">
        <FormField
          icon={emailIcon}
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={(v) => setFormData((p) => ({ ...p, email: v }))}
        />
      </div>
      <div className="mb-4">
        <FormField
          icon={lockIcon}
          type="password"
          isPassword
          placeholder="Password"
          value={formData.password}
          onChange={(v) => setFormData((p) => ({ ...p, password: v }))}
        />
      </div>

      {error && (
        <p className="text-[12.5px] text-red-500 mb-4">{error}</p>
      )}

      <div className="mb-2" />

      <SubmitButton onClick={handleSignin}>
        {isPending ? 'Signing in...' : 'Sign In'}
      </SubmitButton>
    </AuthCard>
  );
}