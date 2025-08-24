import React, { useEffect, useMemo, useState } from "react";

type Role = "Student" | "Teacher" | "Thinker" | "Creator/Builder" | "Other";
type WhatsAppChoice = "Yes" | "Not right now";

type FormData = {
  roles: Role[];
  otherRole: string;
  name: string;
  purpose: string;
  mediaLinks: string;
  exciteReasons: string[];
  whatsappOptIn: WhatsAppChoice | "";
  whatsappNumber: string;
};

interface FormProps {
  isOpen: boolean;
  onClose: () => void;
}

const WEB_APP_URL = import.meta.env.VITE_GSHEETS_WEBAPP_URL;


const ROLES: Role[] = [
  "Student",
  "Teacher",
  "Thinker",
  "Creator/Builder",
  "Other",
];

const EXCITEMENTS = [
  "Learning from diverse perspectives",
  "Sharing my own ideas/projects",
  "Collaborating on creative initiatives",
  "Being part of something bigger",
];

const PurpleButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid" | "ghost" }
> = ({ children, className = "", variant = "solid", ...props }) => {
  const base = "px-6 py-3 rounded-full font-semibold transition-all";
  const solid =
    "bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]";
  const ghost =
    "bg-white/5 text-white border border-white/10 hover:bg-white/10";
  return (
    <button
      className={`${base} ${variant === "solid" ? solid : ghost} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const StepHeader: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <div className="mb-6">
    <h3 className="text-2xl md:text-3xl font-extrabold text-white">{title}</h3>
    {subtitle && (
      <p className="text-white/70 mt-2 leading-relaxed">{subtitle}</p>
    )}
  </div>
);

const CheckPill: React.FC<{
  checked: boolean;
  label: string;
  onClick: () => void;
}> = ({ checked, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 rounded-full border transition-all ${
      checked
        ? "bg-[#7C3AED]/20 border-[#A855F7] text-white"
        : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
    }`}
  >
    {label}
  </button>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#A855F7] focus:border-transparent ${
      props.className || ""
    }`}
  />
);

const Textarea = (
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) => (
  <textarea
    {...props}
    className={`w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#A855F7] focus:border-transparent ${
      props.className || ""
    }`}
  />
);

const ProgressDots: React.FC<{ total: number; current: number }> = ({
  total,
  current,
}) => (
  <div className="flex items-center gap-2 mb-6">
    {Array.from({ length: total }).map((_, i) => (
      <span
        key={i}
        className={`h-2 rounded-full transition-all ${
          i <= current ? "bg-[#A855F7]" : "bg-white/10"
        } ${i === current ? "w-8" : "w-2"}`}
      />
    ))}
  </div>
);

const initialData: FormData = {
  roles: [],
  otherRole: "",
  name: "",
  purpose: "",
  mediaLinks: "",
  exciteReasons: [],
  whatsappOptIn: "",
  whatsappNumber: "",
};

const stepsCount = 6;

const Form: React.FC<FormProps> = ({ isOpen, onClose }) => {
  const [data, setData] = useState<FormData>(initialData);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setSubmitting(false);
      setError(null);
    }
  }, [isOpen]);

 const toggleRole = (role: Role) => {
  setData(prev => {
    let roles = [...prev.roles];
    if (roles.includes(role)) {
      roles = roles.filter(r => r !== role);
    } else {
      roles.push(role);
      if (role === "Student") roles = roles.filter(r => r !== "Teacher");
      if (role === "Teacher") roles = roles.filter(r => r !== "Student");
    }
    return { ...prev, roles, otherRole: roles.includes("Other") ? prev.otherRole : "" };
  });
};

  const toggleExcite = (label: string) => {
    setData((prev) => {
      const exists = prev.exciteReasons.includes(label);
      const exciteReasons = exists
        ? prev.exciteReasons.filter((l) => l !== label)
        : [...prev.exciteReasons, label];
      return { ...prev, exciteReasons };
    });
  };

  const canNext = useMemo(() => {
    if (step === 0) {
      return data.roles.length > 0 && (!data.roles.includes("Other") || data.otherRole.trim() !== "");
    }
    if (step === 1) return data.name.trim().length > 0;
    if (step === 2) return data.purpose.trim().length > 0;
    if (step === 3) return data.exciteReasons.length > 0;
    if (step === 4) {
      if (!data.whatsappOptIn) return false;
      if (data.whatsappOptIn === "Yes")
        return data.whatsappNumber.trim().length > 0;
    }
    return true;
  }, [step, data]);

const submit = async () => {
  setSubmitting(true);
  setError(null);

  const payload = {
    timestamp: new Date().toISOString(),
    name: data.name.trim(),
    definesYou: data.roles,
    otherRole: data.roles.includes("Other") ? data.otherRole.trim() : "",
    purpose: data.purpose.trim(),
    mediaLinks: data.mediaLinks.trim(),
    exciteReasons: data.exciteReasons,
    whatsappOptIn: data.whatsappOptIn,
    whatsappNumber:
      data.whatsappOptIn === "Yes" ? data.whatsappNumber.trim() : "",
  };

  try {
    if (!WEB_APP_URL) throw new Error("Missing Web App URL");

    await fetch(WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      mode: "no-cors",
    });

    window.location.href =
      "https://chat.whatsapp.com/JfnuaMproG51BoNJZ21LNB?mode=ac_t";
  } catch (err: any) {
    setError(err.message || "Something went wrong. Please try again.");
  } finally {
    setSubmitting(false);
  }
};

  const next = () => setStep((s) => Math.min(s + 1, stepsCount - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => !submitting && onClose()}
      />
      <div
        className="relative z-[1000] w-[92%] md:w-[800px] rounded-3xl border border-white/20 p-6 md:p-8 text-white shadow-2xl bg-[#160C2A]
        bg-[radial-gradient(1200px_600px_at_80%_-20%,rgba(168,85,247,0.25),rgba(0,0,0,0)),radial-gradient(800px_400px_at_-20%_120%,rgba(124,58,237,0.18),rgba(0,0,0,0))]"
      >
        <button
          className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl leading-none"
          onClick={() => !submitting && onClose()}
        >
          ×
        </button>

        {step < 5 && (
          <>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-extrabold">Join Purple</h2>
                <p className="text-white/70 mt-2">
                  One tribe. One vision. One unstoppable movement.
                </p>
              </div>
              <img
                src="/mascot.png"
                alt=""
                className="w-20 h-20 object-contain hidden md:block"
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = "none")
                }
              />
            </div>
            <ProgressDots total={stepsCount - 1} current={step} />
          </>
        )}

        <div className="space-y-4">
          {step === 0 && (
            <>
              <StepHeader title="What defines you?" />
              <div className="flex flex-wrap gap-3">
                {ROLES.map((r) => (
                  <CheckPill
                    key={r}
                    checked={data.roles.includes(r)}
                    label={r}
                    onClick={() => toggleRole(r)}
                  />
                ))}
              </div>
              {data.roles.includes("Other") && (
                <div className="mt-4">
                  <Input
                    placeholder="Tell us who you are"
                    value={data.otherRole}
                    onChange={(e) =>
                      setData((p) => ({ ...p, otherRole: e.target.value }))
                    }
                  />
                </div>
              )}
            </>
          )}

          {step === 1 && (
            <>
              <StepHeader title="Who are you?" />
              <Input
                placeholder="Your name"
                value={data.name}
                onChange={(e) =>
                  setData((p) => ({ ...p, name: e.target.value }))
                }
              />
            </>
          )}

          {step === 2 && (
            <>
              <StepHeader title="Why do you want to join the Purple Movement?" subtitle="What is your purpose? Share your motivation. You can also include any relevant media links." />
              <Textarea
                rows={5}
                placeholder="Your story, goals, or what calls you to Purple…"
                value={data.purpose}
                onChange={(e) =>
                  setData((p) => ({ ...p, purpose: e.target.value }))
                }
              />
              <Input
                className="mt-3"
                placeholder="Media links (portfolio, socials, projects)"
                value={data.mediaLinks}
                onChange={(e) =>
                  setData((p) => ({ ...p, mediaLinks: e.target.value }))
                }
              />
            </>
          )}

          {step === 3 && (
            <>
              <StepHeader title="What excites you most about being part of a global community?" />
              <div className="flex flex-wrap gap-3">
                {EXCITEMENTS.map((label) => (
                  <CheckPill
                    key={label}
                    checked={data.exciteReasons.includes(label)}
                    label={label}
                    onClick={() => toggleExcite(label)}
                  />
                ))}
              </div>
            </>
          )}

          {step === 4 && (
  <>
    <StepHeader title="Would you like to join our WhatsApp group to connect directly with the Purple community?" />
    <div className="flex gap-3 mb-3">
      {["Yes", "Not right now"].map((c) => (
        <CheckPill
          key={c}
          checked={data.whatsappOptIn === (c as WhatsAppChoice)}
          label={c}
          onClick={() =>
            setData((prev) => ({
              ...prev,
              whatsappOptIn: c as WhatsAppChoice,
            
              whatsappNumber: c === "Yes" ? prev.whatsappNumber : "",
            }))
          }
        />
      ))}
    </div>

    {data.whatsappOptIn === "Yes" && (
      <div className="mt-2">
        <Input
          type="tel"
          inputMode="tel"
          pattern="[\+]?[0-9]{7,15}"
          placeholder="+1234567890"
          maxLength={15}
          value={data.whatsappNumber}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              whatsappNumber: e.target.value,
            }))
          }
        />
        <p className="text-xs text-white/50 mt-1">
          Include country code (e.g., +91 for India, +1 for USA).
        </p>
      </div>
    )}
  </>
)}

          {step === 5 && (
            <div className="text-center py-8">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-3">
                You’re now part of something unstoppable.
              </h3>
              <p className="text-white/80">Welcome to the Purple Movement. ⚡</p>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-xl p-3">
            {error}
          </div>
        )}

        <div className="mt-8 flex justify-between items-center">
  {step > 0 && step < 5 && (
    <PurpleButton variant="ghost" onClick={back} disabled={submitting}>
      Back
    </PurpleButton>
  )}
  {step < 4 && (
    <PurpleButton onClick={next} disabled={!canNext || submitting}>
      Next
    </PurpleButton>
  )}
  {step === 4 && (
    <PurpleButton onClick={submit} disabled={!canNext || submitting}>
      {submitting ? "Submitting..." : "Submit"}
    </PurpleButton>
  )}
</div>
      </div>
    </div>
  );
};

export default Form;