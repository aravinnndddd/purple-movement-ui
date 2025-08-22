import { useEffect, useCallback, useRef } from "react";

interface FormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Form({ isOpen, onClose }: FormProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Esc
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("keydown", handleEsc);

    // optional: focus the dialog for better a11y
    const prev = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleEsc);
      prev?.focus?.();
    };
  }, [isOpen, handleEsc]);

  if (!isOpen) return null;

  // Close only when the overlay (not the dialog) is clicked
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-purple-title"
      onClick={handleOverlayClick}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="flex md:gap-10 mx-10 bg-[#150b25] p-6 rounded-2xl w-full md:h-[300px] max-w-[600px] shadow-lg relative text-white items-center animate-scaleUp"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold"
        >
          ×
        </button>

        {/* Left content */}
        <div className="flex md:w-[70%] w-full flex-col">
          <h1
            id="join-purple-title"
            className="md:text-3xl text-xl font-extrabold text-center"
          >
            Join Purple
          </h1>

          <p className="md:text-md text-sm text-gray-300 text-center mt-3 mb-6 leading-relaxed">
            One tribe. One vision. One unstoppable movement. Be part of the
            global Purple community, where ideas turn into action
          </p>

          <div className="flex justify-center">
            <a href="https://chat.whatsapp.com/JfnuaMproG51BoNJZ21LNB?mode=ac_t">
              <button
                className="w-[68.54px] h-[27.55px] md:w-[164px] md:h-[42px] mt-[10px] bg-[#6F00CD] hover:bg-transparent border-[#6F00CD] border-2
                  text-center rounded-[20px] text-white text-sm sm:text-base
                  font-semibold ease transition-all duration-300 text-[8px] md:text-[20px]"
              >
                Join
              </button>
            </a>
          </div>
        </div>

        {/* Right image (plain <img> for Vite) */}
        <div className="md:flex absolute bottom-0 right-0 md:static md:flex-col md:w-[30%]">
          <img
            src="/exited.png"
            alt="Excited illustration"
            className="h-[100px] md:h-[200px] w-auto"
          />
        </div>
      </div>
    </div>
  );
}
