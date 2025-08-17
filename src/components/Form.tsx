import React, { useState } from "react";

interface FormProps {
  isOpen: boolean;
  onClose: () => void;
}

const Form: React.FC<FormProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [studentName, setStudentName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [growthSupport, setGrowthSupport] = useState("");
  const [syllabusChallenges, setSyllabusChallenges] = useState("");
  const [teachingMethod, setTeachingMethod] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const validateStep = () => {
    setError(""); // reset
    switch (step) {
      case 1:
        if (!studentName.trim()) {
          setError("Please enter your name.");
          return false;
        }
        break;
      case 2:
        if (!collegeName.trim()) {
          setError("Please enter your college name.");
          return false;
        }
        break;
      case 3:
        if (growthSupport.trim().length < 60) {
          setError("Please enter at least 60 characters.");
          return false;
        }
        break;
      case 4:
        if (syllabusChallenges.trim().length < 60) {
          setError("Please enter at least 60 characters.");
          return false;
        }
        break;
      case 5:
        if (teachingMethod.trim().length < 60) {
          setError("Please enter at least 60 characters.");
          return false;
        }
        break;

      default:
        break;
    }
    return true;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (step < 5) {
      setStep(step + 1);
    } else {
      setLoading(true); // start loading
      try {
        await fetch(import.meta.env.VITE_GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentName,
            collegeName,
            growthSupport,
            syllabusChallenges,
            teachingMethod,
          }),
        });

        console.log("Data sent to Google Sheets!");

        window.open(
          "https://chat.whatsapp.com/ErCREbUUzSKEqu7LTmSkeH",
          "_blank"
        );

        // Reset form fields
        setStudentName("");
        setCollegeName("");
        setGrowthSupport("");
        setSyllabusChallenges("");
        setTeachingMethod("");

        setError("");
        setStep(1);
        onClose();
      } catch (error) {
        console.error("Error sending data:", error);
      } finally {
        setLoading(false); // stop loading
      }
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
      <div className="bg-[#150b25] p-6 rounded-2xl w-full max-w-[800px] shadow-lg relative text-white">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold"
        >
          ×
        </button>
        {/* Title */}
        <h1 className="text-2xl font-bold text-center">
          What’s Your Untold Story?
        </h1>
        <h1 className="text-xl font-bold text-purple-500 text-center mt-1">
          Unheard Voices
        </h1>
        <p className="text-sm text-gray-300 text-center mt-3 mb-6 leading-relaxed">
          We’re gathering real stories and challenges faced by students across
          colleges/university in Kerala. Your experiences will help us raise
          your voice and work towards positive change. All responses will remain
          confidential unless you choose to share them.
        </p>

        {/* Card */}
        <div className="bg-black/20 rounded-lg p-6 text-left">
          <div className="text-purple-200 text-sm mb-3">Step {step} of 5</div>

          {/* Error Message */}
          {error && <div className="text-red-400 mb-3 text-sm">{error}</div>}

          {step === 1 && (
            <>
              <label className="block text-base mb-2">
                Student or Faculity
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter you answer"
                className="w-full px-3 py-2 rounded-md bg-transparent border border-white/40 text-white outline-none focus:border-purple-600"
              />
            </>
          )}

          {step === 2 && (
            <>
              <label className="block text-base mb-2">
                If you could change anything in your field or system, what would
                it be?
              </label>
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                placeholder="Enter you answer"
                className="w-full px-3 py-2 rounded-md bg-transparent border border-white/40 text-white outline-none focus:border-purple-600"
              />
            </>
          )}

          {step === 3 && (
            <>
              <label className="block text-base mb-2">
                What’s the one form of support you need most right now to grow?
              </label>
              <div className="flex rounded-md bg-transparent border border-white/40 overflow-hidden">
                <input
                  type="text"
                  value={growthSupport}
                  onChange={(e) => setGrowthSupport(e.target.value)}
                  placeholder="Enter you answer"
                  className="flex-1 px-3 py-2 bg-transparent text-white outline-none focus:border-purple-600"
                />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <label className="block text-base mb-2">
                What are the challenges you face with the current
                learning system?
              </label>
              <textarea
                value={syllabusChallenges}
                onChange={(e) => setSyllabusChallenges(e.target.value)}
                rows={4}
                placeholder="Enter you answer"
                className="w-full px-3 py-2 rounded-md bg-transparent border border-white/40 text-white outline-none focus:border-purple-600"
              />
            </>
          )}

          {step === 5 && (
            <>
              <label className="block text-base mb-2">
                The changes that you wish to see implemented
              </label>
              <textarea
                value={teachingMethod}
                onChange={(e) => setTeachingMethod(e.target.value)}
                rows={4}
                placeholder="Enter you answer"
                className="w-full px-3 py-2 rounded-md bg-transparent border border-white/40 text-white outline-none focus:border-purple-600"
              />
            </>
          )}

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleBack}
              className="flex-1 max-w-[100px] bg-purple-600 hover:bg-purple-700 text-white rounded-md py-2 font-medium"
            >
              ← Back
            </button>
            <button
              onClick={handleNext}
              className="flex-1 max-w-[120px] bg-purple-600 hover:bg-purple-700 text-white rounded-md py-2 font-medium flex items-center justify-center gap-2 disabled:opacity-60"
              disabled={loading}
            >
              {loading && (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                  ></path>
                </svg>
              )}
              {loading ? "Submitting..." : step === 5 ? "Submit →" : "Next →"}
            </button>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-5 right-6">
          <img
            src="./Group 93 3.svg"
            alt="Decorative Element"
            className="w-16 h-16"
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
