'use client';

import { useState } from 'react';
import Link from 'next/link';
import { quicksand } from '@/lib/fonts';
import AuthCard from '@/components/auth/AuthCard';
import BrandPanel from '@/components/auth/BrandPanel';
import FormField from '@/components/auth/FormField';
import SubmitButton from '@/components/auth/SubmitButton';
import SecondaryButton from '@/components/auth/SecondaryButton';
import StepDots from '@/components/auth/StepDots';
import { emailIcon, lockIcon, userIcon } from '@/components/auth/icons';

type FieldKey = 'name' | 'email' | 'password';

const signupSteps: {
  key: FieldKey;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
}[] = [
  { key: 'name', label: 'Name', type: 'text', placeholder: 'Full name', icon: userIcon },
  { key: 'email', label: 'Email', type: 'email', placeholder: 'Email address', icon: emailIcon },
  { key: 'password', label: 'Password', type: 'password', placeholder: 'Password', icon: lockIcon },
];

export default function AlmuniRegisterPage() {
  const [step, setStep] = useState(0);
  const [signupData, setSignupData] = useState<Record<FieldKey, string>>({
    name: '',
    email: '',
    password: '',
  });

  const isLastStep = step === signupSteps.length - 1;
  const currentStep = signupSteps[step];
  const currentValue = signupData[currentStep.key];

  // Panel starts left and alternates sides as you move through the steps.
  const panelSide: 'left' | 'right' = step % 2 === 0 ? 'left' : 'right';

  const handleNext = () => {
    if (!currentValue.trim()) return;
    if (isLastStep) {
      console.log('Submitting registration:', signupData);
      return;
    }
    setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  return (
    <AuthCard
      panelSide={panelSide}
      fontClassName={quicksand.className}
      branding={
        <BrandPanel
          heading="Welcome Back!"
          description="Enter your personal details to use all of the site's features."
        />
      }
    >
      <h2 className="text-[26px] font-bold text-[#241B3A] mb-2">Create Account</h2>
      <p className="text-[12.5px] text-[#8B87A3] mb-6">
        Step {step + 1} of {signupSteps.length} — {currentStep.label}
      </p>

      <StepDots total={signupSteps.length} current={step} />

      <div className="mb-6">
        <FormField
          icon={currentStep.icon}
          type={currentStep.type}
          isPassword={currentStep.key === 'password'}
          placeholder={currentStep.placeholder}
          value={currentValue}
          onChange={(v) => setSignupData((p) => ({ ...p, [currentStep.key]: v }))}
          autoFocus
        />
      </div>

      <div className="flex items-center gap-3">
        {step > 0 && <SecondaryButton onClick={handleBack}>Back</SecondaryButton>}
        <SubmitButton onClick={handleNext} disabled={!currentValue.trim()} fullWidth={false}>
          {isLastStep ? 'Sign Up' : 'Next'}
        </SubmitButton>
      </div>

      <p className="text-center text-[12.5px] text-[#8B87A3] mt-6">
        Already have an account?{' '}
        <Link href="/almuni/almuni-login" className="text-[#0E76BD] font-semibold hover:underline">
          Sign In
        </Link>
      </p>
    </AuthCard>
  );
}