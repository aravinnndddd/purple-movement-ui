import React, { useState } from "react";

interface FormProps {
  isOpen: boolean;
  onClose: () => void;
}

const Form: React.FC<FormProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [studentName, setStudentName] = useState("");
  const [collegeName, setCollegeName] = useState("");

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      console.log({ studentName, collegeName });
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1A0B2E] p-6 rounded-2xl w-full max-w-lg shadow-lg relative">
        {/* Title */}
        <h2 className="text-white text-2xl font-bold text-center">
          What’s Your Untold Story?
        </h2>
        <p className="text-purple-400 text-lg text-center font-semibold">
          Unheard Voices
        </p>
        <p className="text-gray-300 text-sm text-center mt-2">
          We’re gathering real stories and challenges faced by students across
          colleges/university in Kerala. Your experiences will help us raise
          your voice and work towards positive change. All responses will remain
          confidential unless you choose to share them.
        </p>

        {/* Input Section */}
        <div className="mt-6">
          {step === 1 && (
            <div>
              <label className="block text-sm text-gray-200 mb-2">
                Student Name:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/30 border border-gray-500 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="block text-sm text-gray-200 mb-2">
                College Name:
              </label>
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/30 border border-gray-500 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            className="bg-purple-600 px-4 py-2 rounded-lg text-white hover:bg-purple-700"
          >
            ← Back
          </button>
          <button
            onClick={handleNext}
            className="bg-purple-600 px-4 py-2 rounded-lg text-white hover:bg-purple-700"
          >
            {step === 2 ? "Submit →" : "Next →"}
          </button>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-4 right-4">
          <div className="w-12 h-12 bg-purple-500 rounded-full opacity-80" />
        </div>
      </div>
    </div>
  );
};

export default Form;
