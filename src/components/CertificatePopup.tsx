import html2canvas from "html2canvas";
import { useRef } from "react";
import styles from "./certificate.module.css";
import logo from "../assets/logos/logo_pm.png";
import { FaFacebookF, FaWhatsapp, FaLinkedin } from "react-icons/fa";

type CertificatePopupProps = {
  name: string | undefined;
  contribution: string | undefined;
  id: string | undefined;
  onClose: () => void;
};

const CertificatePopup: React.FC<CertificatePopupProps> = ({
  name,
  contribution,
  id,
  onClose,
}) => {
  const certRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!certRef.current) return;
    const canvas = await html2canvas(certRef.current, {
      useCORS: true,
      scale: 2,
    });
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${name}-certificate.png`;
    link.href = dataURL;
    link.click();
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    let shareUrl = "";
    if (platform === "linkedin") {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`;
    } else if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`;
    }
    window.open(shareUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={styles.popupWrapper}>
        <div ref={certRef} className={styles.certificate}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <h1 className={styles.title}>CERTIFICATE</h1>
          <p className={styles.subtitle}>of Appreciation</p>
          <div className={styles.name}>{name}</div>
          <p className={styles.description}>
            has officially joined as{" "}
            <span className="font-bold">{contribution}</span> Contributor to{" "}
            <span className={styles.highlight}>The Purple Movement</span>,
            joining the mission to redefine norms, spark bold ideas, and connect
            the dots that drive real change.
          </p>
          <p className={styles.id}>
            Unique ID: <span className="font-bold">{id}</span>
          </p>
          <p className={styles.hashtag}>#ThePurpleMovement</p>
        </div>

        <div className="flex flex-col gap-5 mt-6 w-full items-center">
          <button
            onClick={handleDownload}
            className="bg-[#8e5cb7] hover:bg-[#3d2d50] text-white rounded-full px-6 py-3 text-sm font-medium transition-colors"
          >
            Download Certificate
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => handleShare("linkedin")}
              className="p-3 rounded-full bg-[#e5a9ff] hover:bg-[#a675cc]"
            >
              <FaLinkedin className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="p-3 rounded-full bg-[#e5a9ff] hover:bg-[#a675cc]"
            >
              <FaFacebookF className="w-5 h-5 text-[#4267B2]" />
            </button>

            <a
              className="p-3 rounded-full bg-[#e5a9ff] hover:bg-[#a675cc]"
              href="https://chat.whatsapp.com/JfnuaMproG51BoNJZ21LNB?mode=r_c"
              target="_blank"
            >
              <FaWhatsapp className="w-5 h-5 text-[#25D366]" />
            </a>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 mt-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificatePopup;
