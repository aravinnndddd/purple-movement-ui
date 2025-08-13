import React, { useState } from "react";

interface FormProps {
  isOpen: boolean;
  onClose: () => void;
}

const Form: React.FC<FormProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [studentName, setStudentName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [phone, setPhone] = useState("");
  const [syllabusChallenges, setSyllabusChallenges] = useState("");
  const [teachingMethod, setTeachingMethod] = useState("");
  const [messageEducator, setMessageEducator] = useState("");
  const [desiredChanges, setDesiredChanges] = useState("");
  const [error, setError] = useState("");

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
        if (!/^\d{10}$/.test(phone)) {
          setError("Please enter a valid 10-digit phone number.");
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
      case 6:
        if (messageEducator.trim().length < 60) {
          setError("Please enter at least 60 characters.");
          return false;
        }
        break;
      case 7:
        if (desiredChanges.trim().length < 60) {
          setError("Please enter at least 60 characters.");
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (step < 7) {
      setStep(step + 1);
    } else {
      // Log data (optional)
      console.log({
        studentName,
        collegeName,
        phone,
        syllabusChallenges,
        teachingMethod,
        messageEducator,
        desiredChanges,
      });

      // Open WhatsApp group link
      window.open("https://chat.whatsapp.com/ErCREbUUzSKEqu7LTmSkeH", "_blank");

      // Reset form fields
      setStudentName("");
      setCollegeName("");
      setPhone("");
      setSyllabusChallenges("");
      setTeachingMethod("");
      setMessageEducator("");
      setDesiredChanges("");
      setError("");

      // Reset step to 1
      setStep(1);

      // Close popup
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
          <div className="text-purple-200 text-sm mb-3">Step {step} of 7</div>

          {/* Error Message */}
          {error && <div className="text-red-400 mb-3 text-sm">{error}</div>}

          {step === 1 && (
            <>
              <label className="block text-base mb-2">Student Name:</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 rounded-md bg-transparent border border-white/40 text-white outline-none focus:border-purple-600"
              />
            </>
          )}

          {step === 2 && (
            <>
              <label className="block text-base mb-2">College Name:</label>
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                placeholder="Enter your college name"
                className="w-full px-3 py-2 rounded-md bg-transparent border border-white/40 text-white outline-none focus:border-purple-600"
              />
            </>
          )}

          {step === 3 && (
            <>
              <label className="block text-base mb-2">Phone Number:</label>
              <div className="flex rounded-md bg-transparent border border-white/40 overflow-hidden">
                <span className="px-3 py-2 bg-black/40 text-gray-200 select-none">
                  +91
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="flex-1 px-3 py-2 bg-transparent text-white outline-none focus:border-purple-600"
                />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <label className="block text-base mb-2">
                What are the challenges you face with the current syllabus?
              </label>
              <textarea
                value={syllabusChallenges}
                onChange={(e) => setSyllabusChallenges(e.target.value)}
                rows={4}
                placeholder="Share your challenges..."
                className="w-full px-3 py-2 rounded-md bg-transparent border border-white/40 text-white outline-none focus:border-purple-600"
              />
            </>
          )}

          {step === 5 && (
            <>
              <label className="block text-base mb-2">
                If you were the teacher now, how would you teach so students
                actually understand and enjoy learning?
              </label>
              <textarea
                value={teachingMethod}
                onChange={(e) => setTeachingMethod(e.target.value)}
                rows={4}
                placeholder="Describe your teaching method..."
                className="w-full px-3 py-2 rounded-md bg-transparent border border-white/40 text-white outline-none focus:border-purple-600"
              />
            </>
          )}

          {step === 6 && (
            <>
              <label className="block text-base mb-2">
                You have one chance to speak directly to every educator in the
                country. What’s your powerful message?
              </label>
              <textarea
                value={messageEducator}
                onChange={(e) => setMessageEducator(e.target.value)}
                rows={4}
                placeholder="Write your message..."
                className="w-full px-3 py-2 rounded-md bg-transparent border border-white/40 text-white outline-none focus:border-purple-600"
              />
            </>
          )}

          {step === 7 && (
            <>
              <label className="block text-base mb-2">
                The changes that you wish to see implemented:
              </label>
              <textarea
                value={desiredChanges}
                onChange={(e) => setDesiredChanges(e.target.value)}
                rows={4}
                placeholder="List the changes..."
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
              className="flex-1 max-w-[100px] bg-purple-600 hover:bg-purple-700 text-white rounded-md py-2 font-medium"
            >
              {step === 7 ? "Submit →" : "Next →"}
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
