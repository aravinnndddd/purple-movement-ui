"use client";

interface StepTwoFormData {
  selectedRole: string;
  whyHere: string;
  portfolioLink: string;
}

interface StepTwoProps {
  selectedFromPrevious?: string | null;
  formData: StepTwoFormData;
  onChange: (updates: Partial<StepTwoFormData>) => void;
  onNext?: () => void;
  onBack?: () => void;
}

export default function StepTwo({
  selectedFromPrevious,
  formData,
  onChange,
  onNext,
  onBack,
}: StepTwoProps) {
  const { selectedRole, whyHere, portfolioLink } = formData;
  const canProceed =
    (selectedRole?.trim() || "") !== "" && (whyHere?.trim() || "") !== "";

  // Define role options based on the category selected in StepOne
  const getRoleOptions = (category: string | null) => {
    switch (category) {
      case "individual":
        return [
          "Student",
          "Creator / Entrepreneur ",
          "Enthusiast / Professional mentoring, volunteering, or supporting initiatives",
          "Other",
        ];
      case "government":
        return [
          "Government Body – Local, state, or national departments supporting initiatives",
          "Policy Maker ",
          "Government Affiliated Institution ",
          "Public Sector – State-run companies and enterprises contributing to programs",
          "Other",
        ];
      case "organization":
        return [
          "Nonprofit / NGO: Supporting social and community initiatives",
          "Startup / Company: Building and scaling impactful solutions",
          "Educational / Training Institution: Enabling learning and skill development",
          "Research / Innovation Lab: Driving research and practical solutions",
          "Other",
        ];
      default:
        return [];
    }
  };

  const roleOptions = getRoleOptions(selectedFromPrevious || null);

  return (
    <div className="w-full px-4 sm:px-6 space-y-10">
      {/* Role Selection */}
      <div className="space-y-4">
        <div className="max-w-[864px] w-full mx-auto space-y-3">
          <label
            htmlFor="role-select"
            className="block text-base sm:text-xl md:text-2xl font-semibold font-montserrat capitalize text-white tracking-wide"
          >
            What defines you?
          </label>{" "}
          <div className="relative">
            <select
              id="role-select"
              value={selectedRole || ""}
              onChange={(e) => onChange({ selectedRole: e.target.value })}
              className="w-full h-11 px-4 text-sm sm:text-base bg-transparent border border-white rounded text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-700"
            >
              <option value="" className="bg-slate-900 text-white/75">
                Select...
              </option>
              {roleOptions.map((option) => (
                <option
                  key={option}
                  value={option}
                  className="bg-slate-900 text-white"
                >
                  {option}
                </option>
              ))}
            </select>

            {/* Custom Arrow */}
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg
                className="w-4 h-4 text-white/75"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Why are you here Question */}
      <div className="space-y-4">
        <div className="max-w-[864px] w-full mx-auto space-y-3">
          <label
            htmlFor="why-here"
            className="block text-base sm:text-xl md:text-2xl font-semibold font-montserrat capitalize text-white tracking-wide"
          >
            What Do You Want to Share?
          </label>
          <p>Contribute ideas, report issues, and drive impact.</p>

          <textarea
            id="why-here"
            value={whyHere}
            onChange={(e) => onChange({ whyHere: e.target.value })}
            placeholder="I’m here for Purple Movement to share, and turn ideas into real-world solutions without barriers...."
            className="w-full h-32 px-4 py-3 text-sm sm:text-base bg-slate-900 rounded-lg text-white placeholder-white/75 resize-none focus:outline-none focus:ring-2 focus:ring-violet-700"
            rows={6}
          />
        </div>

        <div className="max-w-[864px] w-full mx-auto">
          <div className="relative">
            <input
              id="link-input"
              type="url"
              value={portfolioLink}
              onChange={(e) => onChange({ portfolioLink: e.target.value })}
              placeholder="Share your works...(Optional)"
              className="w-full h-16 pl-14 pr-6 py-3 text-sm sm:text-base bg-slate-900 rounded-[10px] text-white placeholder-white/75 focus:outline-none focus:ring-2 focus:ring-violet-700"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-5 h-5 text-white/75"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center max-w-[864px] w-full mx-auto">
        <button
          onClick={onBack}
          className="w-full sm:w-32 py-2 bg-purple-700/60 hover:bg-purple-700 rounded flex justify-center items-center gap-1.5 transition-colors"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-white text-sm font-inter">Back</span>
        </button>

        <button
          onClick={canProceed ? onNext : undefined}
          disabled={!canProceed}
          className={`w-full sm:w-32 py-2 rounded flex justify-center items-center gap-1.5 transition-colors ${
            canProceed
              ? "bg-purple-700 hover:bg-purple-600"
              : "bg-purple-700/50 cursor-not-allowed"
          }`}
        >
          <span className="text-white text-sm font-inter">Next</span>
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {selectedFromPrevious && (
        <div className="text-xs sm:text-sm text-white/60 text-center mt-6">
          Joining as:{" "}
          <span className="text-violet-400 capitalize">
            {selectedFromPrevious}
          </span>
        </div>
      )}
    </div>
  );
}
