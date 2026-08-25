"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CreditCard,
  Landmark,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { useState } from "react";

/* =========================================================
   CAMPAIGN DATA

   IMPORTANT:
   These slugs MUST match the slugs from CampaignsPage.tsx.

   Later this section should be replaced with a database query.
========================================================= */

const campaigns: Record<
  string,
  {
    title: string;
    image: string;
    description: string;
    goal: string;
  }
> = {
  /* =====================================================
     ACTIVE CAMPAIGNS
  ===================================================== */

  "science-lab-modernization": {
    title: "Science Lab Modernization",
    image: "/campaigns/science.jpg",
    description:
      "Help us upgrade our biology and chemistry laboratories with modern equipment.",
    goal: "Rs. 1,000,000",
  },

  "merit-scholarship-fund-2026": {
    title: "Merit Scholarship Fund 2026",
    image: "/campaigns/merit-scholarship.jpg",
    description:
      "Support outstanding students from marginalized communities through scholarships.",
    goal: "Rs. 500,000",
  },

  "campus-sports-complex": {
    title: "Campus Sports Complex",
    image: "/campaigns/sports.jpg",
    description:
      "Help us build a multipurpose indoor sports facility for students.",
    goal: "Rs. 500,000",
  },

  /* =====================================================
     FUTURE CAMPAIGNS
  ===================================================== */

  "library-digitization-phase-2": {
    title: "Library Digitization — Phase 2",
    image: "/campaigns/library.jpg",
    description:
      "Expanding our digital archive with academic resources, manuscripts and regional research collections.",
    goal: "Rs. 300,000",
  },

  "smart-learning-environment": {
    title: "Smart Learning Environment",
    image: "/campaigns/smart.jpg",
    description:
      "Expanding smart learning facilities to create a more interactive and technology-friendly classroom environment.",
    goal: "Rs. 400,000",
  },

  "campus-development-initiative": {
    title: "Campus Development Initiative",
    image: "/campaigns/campaign.jpg",
    description:
      "Supporting future campus improvements and creating a better environment for students and faculty.",
    goal: "Rs. 500,000",
  },
};

/* =========================================================
   PAYMENT METHODS
========================================================= */

const paymentOptions = [
  {
    id: "esewa",
    name: "eSewa",
    description: "Pay using eSewa",
    icon: Smartphone,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },

  {
    id: "khalti",
    name: "Khalti",
    description: "Pay using Khalti",
    icon: CreditCard,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },

  {
    id: "bank",
    name: "Bank Transfer",
    description: "Transfer directly to campus account",
    icon: Landmark,
    iconBg: "bg-[#0E76BD]/10",
    iconColor: "text-[#0E76BD]",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function DonatePage() {
  const params = useParams();
  const router = useRouter();

  const slug = params.slug as string;

  const campaign = campaigns[slug];

  /* =====================================================
     DONATION STATE
  ===================================================== */

  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  /* =====================================================
     AMOUNT VALIDATION
  ===================================================== */

  const numericAmount = Number(amount);

  const isAmountValid =
    amount.trim() !== "" &&
    !Number.isNaN(numericAmount) &&
    numericAmount > 0;

  /* =====================================================
     CAMPAIGN NOT FOUND
  ===================================================== */

  if (!campaign) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7FAFC]">
        <div className="text-center">

          <h1 className="text-2xl font-bold text-gray-800">
            Campaign not found
          </h1>

          <p className="mt-2 text-gray-500">
            The campaign you are looking for does not exist.
          </p>

          <button
            type="button"
            onClick={() => router.push("/campaigns")}
            className="
              mt-5
              rounded-xl
              bg-[#0E76BD]
              px-5
              py-2.5
              font-semibold
              text-white
              shadow-md
              shadow-[#0E76BD]/20
              transition
              hover:bg-[#095f99]
            "
          >
            Back to Campaigns
          </button>

        </div>
      </main>
    );
  }

  /* =====================================================
     CONTINUE TO PAYMENT
  ===================================================== */

  const handleContinuePayment = () => {
    if (!isAmountValid) return;

    if (!paymentMethod) return;

    /*
      DATABASE / PAYMENT LOGIC WILL GO HERE.

      Later:

      1. Create Donation record
      2. campaignId
      3. amount
      4. paymentMethod
      5. donor/user
      6. payment transaction
    */

    alert(
      `Donation of Rs. ${amount} using ${paymentMethod} selected.`
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7FAFC]">

      {/* =================================================
          BACKGROUND DECORATION
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-72
          w-72
          rounded-full
          bg-[#0E76BD]/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-24
          top-1/2
          h-72
          w-72
          rounded-full
          bg-[#0E76BD]/5
          blur-3xl
        "
      />

      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          relative
          border-b
          border-blue-100
          bg-white/80
          backdrop-blur
        "
      >

        <div className="mx-auto max-w-6xl px-6 py-5">

          <button
            type="button"
            onClick={() => router.push("/campaigns")}
            className="
              flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-gray-600
              transition
              hover:text-[#0E76BD]
            "
          >

            <ArrowLeft size={18} />

            Back to Campaign

          </button>

        </div>

      </div>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <section className="relative mx-auto max-w-6xl px-6 py-12">

        <div className="grid gap-8 lg:grid-cols-2">

          {/* =================================================
              CAMPAIGN INFORMATION
          ================================================= */}

          <div
            className="
              h-fit
              overflow-hidden
              rounded-3xl
              border
              border-[#0E76BD]/10
              bg-white
              shadow-[0_8px_35px_rgba(14,118,189,0.08)]
            "
          >

            {/* IMAGE */}

            <div className="relative h-72 overflow-hidden">

              <img
                src={campaign.image}
                alt={campaign.title}
                className="h-full w-full object-cover"
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#043B5C]/50
                  via-transparent
                  to-transparent
                "
              />

            </div>

            {/* CAMPAIGN DETAILS */}

            <div className="p-7">

              {/* CATEGORY */}

              <span
                className="
                  rounded-full
                  border
                  border-[#0E76BD]/10
                  bg-[#EAF6FC]
                  px-3
                  py-1.5
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-[#0E76BD]
                "
              >
                Campaign
              </span>

              {/* TITLE */}

              <h1
                className="
                  mt-4
                  text-3xl
                  font-bold
                  text-[#172B3A]
                "
              >
                {campaign.title}
              </h1>

              {/* DESCRIPTION */}

              <p className="mt-4 leading-7 text-gray-600">
                {campaign.description}
              </p>

              {/* CAMPAIGN GOAL */}

              <div
                className="
                  mt-6
                  rounded-2xl
                  border
                  border-[#0E76BD]/10
                  bg-[#EAF5FC]
                  p-4
                "
              >

                <p className="text-sm text-gray-500">
                  Campaign Goal
                </p>

                <p
                  className="
                    mt-1
                    text-xl
                    font-bold
                    text-[#0E76BD]
                  "
                >
                  {campaign.goal}
                </p>

              </div>

              {/* TRUST NOTE */}

              <div
                className="
                  mt-5
                  flex
                  items-center
                  gap-2
                  text-xs
                  font-medium
                  text-gray-400
                "
              >

                <ShieldCheck
                  size={15}
                  className="text-[#0E76BD]"
                />

                100% of your donation goes directly to this campaign.

              </div>

            </div>

          </div>

          {/* =================================================
              DONATION SECTION
          ================================================= */}

          <div
            className="
              h-fit
              rounded-3xl
              border
              border-[#0E76BD]/10
              bg-white
              p-7
              shadow-[0_8px_35px_rgba(14,118,189,0.08)]
            "
          >

            {/* TITLE */}

            <h2
              className="
                text-2xl
                font-bold
                text-[#172B3A]
              "
            >
              Make a Donation
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Your contribution helps improve education and student
              opportunities.
            </p>

            {/* =================================================
                DONATION AMOUNT
            ================================================= */}

            <div className="mt-7">

              <label
                htmlFor="donation-amount"
                className="
                  text-sm
                  font-semibold
                  text-gray-700
                "
              >
                Donation Amount
              </label>

              <div className="relative mt-2">

                <span
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    font-semibold
                    text-gray-500
                  "
                >
                  Rs.
                </span>

                <input
                  id="donation-amount"
                  type="number"
                  min="1"
                  step="1"
                  value={amount}
                  onChange={(event) =>
                    setAmount(event.target.value)
                  }
                  placeholder="Enter amount"
                  className={`
                    w-full
                    rounded-xl
                    border
                    py-3
                    pl-12
                    pr-4
                    outline-none
                    transition

                    ${
                      amount !== "" && !isAmountValid
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-300 focus:border-[#0E76BD] focus:ring-2 focus:ring-[#0E76BD]/10"
                    }
                  `}
                />

              </div>

              {/* HELPER TEXT */}

              {amount === "" && (
                <p className="mt-2 text-xs text-gray-400">
                  Enter the amount you would like to donate.
                </p>
              )}

              {/* VALIDATION */}

              {amount !== "" && !isAmountValid && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  Please enter a valid donation amount greater than Rs. 0.
                </p>
              )}

            </div>

            {/* =================================================
                PAYMENT METHODS
            ================================================= */}

            <div className="mt-7">

              <label className="text-sm font-semibold text-gray-700">
                Select Payment Method
              </label>

              <div className="mt-3 space-y-3">

                {paymentOptions.map((option) => {

                  const Icon = option.icon;

                  const isSelected =
                    paymentMethod === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() =>
                        setPaymentMethod(option.id)
                      }
                      className={`
                        flex
                        w-full
                        items-center
                        gap-4
                        rounded-xl
                        border
                        p-4
                        text-left
                        transition

                        ${
                          isSelected
                            ? "border-[#0E76BD] bg-[#EAF5FC] shadow-sm"
                            : "border-gray-200 hover:border-[#0E76BD]/50"
                        }
                      `}
                    >

                      <div
                        className={`
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-lg
                          ${option.iconBg}
                        `}
                      >

                        <Icon
                          size={20}
                          className={option.iconColor}
                        />

                      </div>

                      <div className="flex-1">

                        <p className="font-semibold text-[#172B3A]">
                          {option.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {option.description}
                        </p>

                      </div>

                      <span
                        className={`
                          flex
                          h-5
                          w-5
                          flex-shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border-2
                          transition

                          ${
                            isSelected
                              ? "border-[#0E76BD] bg-[#0E76BD]"
                              : "border-gray-300"
                          }
                        `}
                      >

                        {isSelected && (
                          <span className="h-2 w-2 rounded-full bg-white" />
                        )}

                      </span>

                    </button>
                  );
                })}

              </div>

            </div>

            {/* =================================================
                CONTINUE TO PAYMENT
            ================================================= */}

            <button
              type="button"
              disabled={
                !isAmountValid ||
                !paymentMethod
              }
              onClick={handleContinuePayment}
              className="
                mt-8
                w-full
                rounded-xl
                bg-[#0E76BD]
                py-3.5
                font-bold
                text-white
                shadow-lg
                shadow-[#0E76BD]/20
                transition-all
                hover:bg-[#095f99]
                hover:shadow-xl
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:bg-gray-300
                disabled:shadow-none
                disabled:active:scale-100
              "
            >
              Continue to Payment
            </button>

            {/* FOOTNOTE */}

            <p className="mt-4 text-center text-xs text-gray-400">
              Your donation will support the selected campus campaign.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}