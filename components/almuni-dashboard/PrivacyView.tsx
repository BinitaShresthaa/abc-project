'use client';

import { useState } from 'react';

type Visibility = 'public' | 'private';

const visibilityOptions: { key: Visibility; label: string; description: string }[] = [
  {
    key: 'public',
    label: 'Public',
    description: 'Your profile and your activities will display to everyone.',
  },
  {
    key: 'private',
    label: 'Private',
    description: 'Your profile and activities will display or appear only to those connected within the system.',
  },
];

interface ShareFields {
  email: boolean;
  phone: boolean;
  job: boolean;
}

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-3 py-3 rounded-xl hover:bg-[#F5F4FB] transition-colors">
      <div className="min-w-0">
        <p className="text-[14px] font-semibold text-[#241B3A]">{label}</p>
        {description && (
          <p className="text-[12.5px] text-[#8B87A3] mt-0.5 leading-snug">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative shrink-0 w-11 h-6 rounded-full transition-colors ${
          checked ? 'bg-[#0E76BD]' : 'bg-black/15'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

export default function PrivacyView() {
  const [visibility, setVisibility] = useState<Visibility>('public');
  const [shareFields, setShareFields] = useState<ShareFields>({
    email: true,
    phone: true,
    job: true,
  });
  const [profileLocked, setProfileLocked] = useState(false);

  const updateShareField = (key: keyof ShareFields, value: boolean) => {
    setShareFields((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* visibility choice */}
      <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_3px_rgba(11,90,147,0.06)] p-6">
        <h2 className="text-[20px] font-bold text-[#241B3A]">Profile Privacy</h2>
        <p className="text-[13px] text-[#8B87A3] mt-1 mb-4">
          How would you like to display your profile?
        </p>

        <div className="space-y-1">
          {visibilityOptions.map((opt) => {
            const selected = visibility === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => setVisibility(opt.key)}
                className="w-full flex items-start justify-between gap-3 px-3 py-3 rounded-xl hover:bg-[#F5F4FB] transition-colors text-left"
              >
                <div>
                  <p className="text-[14px] font-semibold text-[#241B3A]">{opt.label}</p>
                  <p className="text-[12.5px] text-[#8B87A3] mt-0.5 leading-snug">{opt.description}</p>
                </div>
                <span
                  className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0
                             ${selected ? 'border-[#0E76BD]' : 'border-black/20'}`}
                >
                  {selected && <span className="w-2.5 h-2.5 rounded-full bg-[#0E76BD]" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Public — choose exactly what shows */}
      {visibility === 'public' && (
        <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_3px_rgba(11,90,147,0.06)] p-6">
          <h3 className="text-[15px] font-bold text-[#241B3A]">What to share</h3>
          <p className="text-[13px] text-[#8B87A3] mt-1 mb-2">
            Choose which details other alumni can see on your public profile.
          </p>

          <div className="divide-y divide-black/5">
            <Toggle
              label="Email"
              description="Show your email address on your profile."
              checked={shareFields.email}
              onChange={(v) => updateShareField('email', v)}
            />
            <Toggle
              label="Phone"
              description="Show your phone number on your profile."
              checked={shareFields.phone}
              onChange={(v) => updateShareField('phone', v)}
            />
            <Toggle
              label="Job"
              description="Show your current job on your profile."
              checked={shareFields.job}
              onChange={(v) => updateShareField('job', v)}
            />
          </div>
        </div>
      )}   

      {/* Private — lock the whole profile */}
      {visibility === 'private' && (
        <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_3px_rgba(11,90,147,0.06)] p-6">
          <h3 className="text-[15px] font-bold text-[#241B3A] mb-2">Lock profile</h3>
          <Toggle
            label="Lock Profile"
            description="When locked, other connected users who visit your profile will only see that it's locked and won't be able to view any of your details."
            checked={profileLocked}
            onChange={setProfileLocked}
          />
        </div>
      )}
    </div>
  );
}