'use client';

import { useState } from 'react';
import { quicksand } from '@/lib/fonts';
import AuthCard from '@/components/auth/AuthCard';
import BrandPanel from '@/components/auth/BrandPanel';
import FormField from '@/components/auth/FormField';
import SubmitButton from '@/components/auth/SubmitButton';
import { emailIcon, lockIcon } from '@/components/auth/icons';

export default function AlmuniLoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSignin = () => {
    console.log('Signing in:', formData);
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
      <div className="mb-6">
        <FormField
          icon={lockIcon}
          type="password"
          isPassword
          placeholder="Password"
          value={formData.password}
          onChange={(v) => setFormData((p) => ({ ...p, password: v }))}
        />
      </div>

      <SubmitButton onClick={handleSignin}>Sign In</SubmitButton>
    </AuthCard>
  );
}