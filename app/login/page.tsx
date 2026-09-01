'use client';

import { Suspense, useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { quicksand } from '@/lib/fonts';
import { facultyMembers } from '@/lib/faculty-data';
import AuthCard from '@/components/auth/AuthCard';
import BrandPanel from '@/components/auth/BrandPanel';
import FormField from '@/components/auth/FormField';
import SelectField from '@/components/auth/SelectField';
import GenderToggle from '@/components/auth/GenderToggle';
import FileUploadField from '@/components/auth/FileUploadField';
import SubmitButton from '@/components/auth/SubmitButton';
import SecondaryButton from '@/components/auth/SecondaryButton';
import StepDots from '@/components/auth/StepDots';
import {
  emailIcon,
  lockIcon,
  userIcon,
  phoneIcon,
  graduationCapIcon,
  idCardIcon,
} from '@/components/auth/icons';
import { loginAction as staffLoginAction } from './action';
import { loginAction as alumniLoginAction } from '../almuni/almuni-login/actions';

type Mode = 'staff' | 'alumni-signin' | 'alumni-register';

type TextFieldKey =
  | 'fullName' | 'dobYear' | 'dobMonth' | 'dobDay' | 'gender'
  | 'contactNo' | 'email'
  | 'password' | 'confirmPassword'
  | 'faculty' | 'batch' | 'passoutYear' | 'registrationNo';

interface SelectOption {
  value: string;
  label: string;
}
interface SelectGroup {
  label: string;
  options: SelectOption[];
}

type StepFieldConfig =
  | { kind: 'input'; key: TextFieldKey; type: string; placeholder: string; icon: React.ReactNode; isPassword?: boolean }
  | { kind: 'select'; key: TextFieldKey; placeholder: string; icon?: React.ReactNode; options?: SelectOption[]; groups?: SelectGroup[] }
  | { kind: 'gender'; key: TextFieldKey }
  | { kind: 'nepali-date' }
  | { kind: 'file'; key: 'file'; accept?: string; placeholder?: string }
  | { kind: 'row'; label?: string; items: StepFieldConfig[] };

// Faculty options, grouped by level, pulled straight from lib/faculty-data.ts.
// A couple of department strings there have typos ("BA Englsih") — fix at
// the source if you want them cleaned up here too.
const facultyGroups: SelectGroup[] = (() => {
  const byLevel: Record<'bachelor' | 'master', Set<string>> = {
    bachelor: new Set(),
    master: new Set(),
  };
  facultyMembers.forEach((f) => byLevel[f.level].add(f.department));
  return [
    { label: "Bachelor's", options: Array.from(byLevel.bachelor).map((d) => ({ value: d, label: d })) },
    { label: "Master's", options: Array.from(byLevel.master).map((d) => ({ value: d, label: d })) },
  ];
})();

// --- Nepali (Bikram Sambat) calendar data ---
// NOTE: this is a simplified approximation, not a full B.S.<->A.D. converter.
// CURRENT_BS_YEAR is hardcoded from today's date and will drift by +1 each
// Baisakh (mid-April) — for calendar-accurate conversion, swap in a proper
// library such as `nepali-date-converter`. Days are a flat 1–32 range since
// exact days-per-month vary by year in the B.S. calendar.
const CURRENT_BS_YEAR = 2083;

const nepaliMonths: SelectOption[] = Array.from({ length: 12 }, (_, i) => {
  const m = String(i + 1);
  return { value: m, label: m };
});

const nepaliDays: SelectOption[] = Array.from({ length: 32 }, (_, i) => {
  const d = String(i + 1);
  return { value: d, label: d };
});

// Birth-year range: current B.S. year back ~80 years.
const dobYearOptions: SelectOption[] = Array.from({ length: 80 }, (_, i) => {
  const y = String(CURRENT_BS_YEAR - i);
  return { value: y, label: y };
});
// Batch years in B.S., from 2000 up through the current year, most recent first.
const batchOptions: SelectOption[] = Array.from({ length: CURRENT_BS_YEAR - 2000 + 1 }, (_, i) => {
  const y = String(CURRENT_BS_YEAR - i);
  return { value: y, label: y };
});

const registerSteps: { title: string; panelHeading: string; panelDescription: string; fields: StepFieldConfig[] }[] = [
  {
    title: 'Personal Details',
    panelHeading: 'Personal Information',
    panelDescription: 'Enter your personal information.',
    fields: [
      { kind: 'input', key: 'fullName', type: 'text', placeholder: 'Full name', icon: userIcon },
      { kind: 'nepali-date' },
      { kind: 'gender', key: 'gender' },
    ],
  },
  {
    title: 'Contact Details',
    panelHeading: 'Contact Details',
    panelDescription: 'Enter your contact details.',
    fields: [
      { kind: 'input', key: 'contactNo', type: 'tel', placeholder: 'Contact number', icon: phoneIcon },
      { kind: 'input', key: 'email', type: 'email', placeholder: 'Email address', icon: emailIcon },
    ],
  },
  {
    title: 'Set Password',
    panelHeading: 'Set Your Password',
    panelDescription: 'Please remember the password. You need this only when you are verified.',
    fields: [
      { kind: 'input', key: 'password', type: 'password', placeholder: 'Password', icon: lockIcon, isPassword: true },
      { kind: 'input', key: 'confirmPassword', type: 'password', placeholder: 'Confirm password', icon: lockIcon, isPassword: true },
    ],
  },
  {
    title: 'Verified As Aadikavian',
    panelHeading: 'Verified As You Are Aadikavian',
    panelDescription: 'Provide an image that contains your Aadikavi registration number.',
    fields: [
      { kind: 'select', key: 'faculty', placeholder: 'Select faculty', icon: graduationCapIcon, groups: facultyGroups },
      {
        kind: 'row',
        label: 'Batch & Passout Year (B.S.)',
        items: [
          { kind: 'select', key: 'batch', placeholder: 'Batch', options: batchOptions },
          { kind: 'select', key: 'passoutYear', placeholder: 'Passout year', options: batchOptions },
        ],
      },
      { kind: 'input', key: 'registrationNo', type: 'text', placeholder: 'Registration number', icon: idCardIcon },
      { kind: 'file', key: 'file', placeholder: 'Upload ID / registration proof', accept: '.pdf,.jpg,.jpeg,.png' },
    ],
  },
];

const emptyRegisterData: Record<TextFieldKey, string> = {
  fullName: '', dobYear: '', dobMonth: '', dobDay: '', gender: '',
  contactNo: '', email: '',
  password: '', confirmPassword: '',
  faculty: '', batch: '', passoutYear: '', registrationNo: '',
};

function LoginPageInner() {
  const searchParams = useSearchParams();
  const asParam = searchParams.get('as');
  const initialMode: Mode =
    asParam === 'alumni-register' ? 'alumni-register' :
    asParam === 'alumni' ? 'alumni-signin' :
    'staff';

  const [mode, setMode] = useState<Mode>(initialMode);

  // --- sign-in state (shared shape for both staff and alumni sign-in) ---
  const [signinData, setSigninData] = useState({ email: '', password: '' });
  const [signinError, setSigninError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // --- registration wizard state ---
  const [step, setStep] = useState(0);
  const [registerData, setRegisterData] = useState<Record<TextFieldKey, string>>(emptyRegisterData);
  const [file, setFile] = useState<File | null>(null);

  const switchToStaffSignin = () => {
    setMode('staff');
    setSigninData({ email: '', password: '' });
    setSigninError(null);
  };

  const switchToAlumniSignin = () => {
    setMode('alumni-signin');
    setSigninData({ email: '', password: '' });
    setSigninError(null);
  };

  const switchToRegister = () => {
    setMode('alumni-register');
    setStep(0);
    setRegisterData(emptyRegisterData);
    setFile(null);
  };

  const handleSignin = () => {
    setSigninError(null);
    startTransition(async () => {
      const action = mode === 'staff' ? staffLoginAction : alumniLoginAction;
      const result = await action(signinData.email, signinData.password);
      // On success, the action redirects server-side, so we only ever land
      // back here when there's an error to show.
      if (result?.error) {
        setSigninError(result.error);
      }
    });
  };

  // --- registration wizard logic (unchanged from the standalone register page) ---
  const isLastStep = step === registerSteps.length - 1;
  const currentRegisterStep = registerSteps[step];

  const updateRegisterField = (key: TextFieldKey, value: string) =>
    setRegisterData((p) => ({ ...p, [key]: value }));

  const isFieldValid = (f: StepFieldConfig): boolean => {
    if (f.kind === 'file') return file !== null;
    if (f.kind === 'nepali-date') return !!(registerData.dobYear && registerData.dobMonth && registerData.dobDay);
    if (f.kind === 'row') return f.items.every(isFieldValid);
    const val = registerData[f.key];
    if (!val.trim()) return false;
    if (f.key === 'confirmPassword') return val === registerData.password;
    return true;
  };

  const isStepValid = (idx: number) => registerSteps[idx].fields.every(isFieldValid);

  const handleRegisterNext = () => {
    if (!isStepValid(step)) return;
    if (isLastStep) {
      console.log('Submitting registration:', { ...registerData, file });
      return;
    }
    setStep((s) => s + 1);
  };

  const handleRegisterBack = () => setStep((s) => Math.max(0, s - 1));

  function renderField(field: StepFieldConfig): React.ReactNode {
    if (field.kind === 'row') {
      return (
        <div key={field.items.map((i) => ('key' in i ? i.key : i.kind)).join('-')}>
          {field.label && <p className="text-[12.5px] text-[#8B87A3] mb-2 ml-1">{field.label}</p>}
          <div className="grid grid-cols-2 gap-2">
            {field.items.map((item) => renderField(item))}
          </div>
        </div>
      );
    }

    if (field.kind === 'input') {
      const mismatch =
        field.key === 'confirmPassword' &&
        registerData.confirmPassword.length > 0 &&
        registerData.confirmPassword !== registerData.password;
      return (
        <div key={field.key}>
          <FormField
            icon={field.icon}
            type={field.type}
            isPassword={field.isPassword}
            placeholder={field.placeholder}
            value={registerData[field.key]}
            onChange={(v) => updateRegisterField(field.key, v)}
          />
          {mismatch && (
            <p className="text-[11.5px] text-red-500 mt-2 ml-2">Passwords do not match</p>
          )}
        </div>
      );
    }

    if (field.kind === 'select') {
      return (
        <SelectField
          key={field.key}
          icon={field.icon}
          placeholder={field.placeholder}
          value={registerData[field.key]}
          onChange={(v) => updateRegisterField(field.key, v)}
          options={field.options}
          groups={field.groups}
        />
      );
    }

    if (field.kind === 'gender') {
      return (
        <GenderToggle
          key={field.key}
          value={registerData.gender}
          onChange={(v) => updateRegisterField('gender', v)}
        />
      );
    }

    if (field.kind === 'nepali-date') {
      return (
        <div key="nepali-date">
          <p className="text-[12.5px] text-[#8B87A3] mb-2 ml-1">Date of Birth (B.S.)</p>
          <div className="grid grid-cols-3 gap-2">
            <SelectField
              placeholder="Year"
              value={registerData.dobYear}
              onChange={(v) => updateRegisterField('dobYear', v)}
              options={dobYearOptions}
            />
            <SelectField
              placeholder="Month"
              value={registerData.dobMonth}
              onChange={(v) => updateRegisterField('dobMonth', v)}
              options={nepaliMonths}
            />
            <SelectField
              placeholder="Day"
              value={registerData.dobDay}
              onChange={(v) => updateRegisterField('dobDay', v)}
              options={nepaliDays}
            />
          </div>
        </div>
      );
    }

    return (
      <FileUploadField
        key={field.key}
        value={file}
        onChange={setFile}
        accept={field.accept}
        placeholder={field.placeholder}
      />
    );
  }

  // --- panel side ---
  // staff = left, alumni sign-in = right (matches the original two pages).
  // alumni-register uses the original standalone wizard's pattern (step 1
  // starts left), so there's a visible jump right→left entering it from
  // alumni sign-in — that's intentional, not a bug.
  const panelSide: 'left' | 'right' =
    mode === 'staff' ? 'left' :
    mode === 'alumni-signin' ? 'right' :
    (step % 2 === 0 ? 'left' : 'right');

  // --- branding ---
  let branding: React.ReactNode;
  if (mode === 'staff') {
    branding = (
      <BrandPanel
        showLogo
        heading="Welcome Back!"
        description="Enter your personal details to use all of the site's features."
        cta={{ label: 'Join as Alumni', onClick: switchToAlumniSignin }}
      />
    );
  } else if (mode === 'alumni-signin') {
    branding = (
      <BrandPanel
        showLogo
        heading="Welcome Back!"
        description="Enter your personal details to use all of the site's features."
        cta={{ label: 'Connect As Alumni', onClick: switchToRegister }}
      />
    );
  } else {
    branding = (
      <BrandPanel
        heading={currentRegisterStep.panelHeading}
        description={currentRegisterStep.panelDescription}
      />
    );
  }

  return (
    <AuthCard panelSide={panelSide} fontClassName={quicksand.className} backHref="/" branding={branding}>
      {(mode === 'staff' || mode === 'alumni-signin') && (
        <>
          <h2 className="text-[28px] font-bold text-[#241B3A] mb-5">Welcome Back</h2>
          <p className="text-[12.5px] text-[#8B87A3] mb-6">
            Sign in with your email and password
          </p>

          <div className="mb-4">
            <FormField
              icon={emailIcon}
              type="email"
              placeholder="Email address"
              value={signinData.email}
              onChange={(v) => setSigninData((p) => ({ ...p, email: v }))}
            />
          </div>
          <div className="mb-4">
            <FormField
              icon={lockIcon}
              type="password"
              isPassword
              placeholder="Password"
              value={signinData.password}
              onChange={(v) => setSigninData((p) => ({ ...p, password: v }))}
            />
          </div>

          {signinError && (
            <p className="text-[12.5px] text-red-500 mb-4">{signinError}</p>
          )}

          <div className="mb-2" />

          <SubmitButton onClick={handleSignin}>
            {isPending ? 'Signing in...' : 'Sign In'}
          </SubmitButton>
        </>
      )}

      {mode === 'alumni-register' && (
        <>
          <h2 className="text-[26px] font-bold text-[#241B3A] mb-1.5">Create Account</h2>
          <p className="text-[12.5px] text-[#8B87A3] mb-5">
            Step {step + 1} of {registerSteps.length} — {currentRegisterStep.title}
          </p>

          <StepDots total={registerSteps.length} current={step} />

          <div className="mb-2 space-y-3">
            {currentRegisterStep.fields.map((field) => renderField(field))}
          </div>

          <div className="flex items-center gap-3 mt-5">
            {step > 0 && <SecondaryButton onClick={handleRegisterBack}>Back</SecondaryButton>}
            <SubmitButton onClick={handleRegisterNext} disabled={!isStepValid(step)} fullWidth={false}>
              {isLastStep ? 'Sign Up' : 'Next'}
            </SubmitButton>
          </div>

          {step === 0 && (
            <p className="text-center text-[12.5px] text-[#8B87A3] mt-5">
              Already have an account?{' '}
              <button
                type="button"
                onClick={switchToAlumniSignin}
                className="text-[#0E76BD] font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </>
      )}
    </AuthCard>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageInner />
    </Suspense>
  );
}