import {
  addDoc,
  collection,
  getCountFromServer,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { X } from "lucide-react";
import { useRef, useState } from "react";
// import { useFormStatus } from "react-dom";
import { db } from "../lib/firebase";
import ReCAPTCHA from "react-google-recaptcha";
type RecordType = {
  name: string;
  phone: string;
  email: string;
  contribution: string;
  timestamp: string;
};

export type PopupContentType = {
  title: string;
  message: string;
  id?: string;
  timestamp?: string;
  name?: string;
  phone?: string;
  email?: string;
  contribution?: string;
  isSuccess?: boolean;
  count?: number;
};

const Form = ({
  isOpen,
  onClose,
  onResult,
}: {
  onClose: () => void;
  isOpen: boolean;
  onResult: (result: PopupContentType) => void;
}) => {
  const [emailError, setEmailError] = useState<string>();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";
  const formRef = useRef<HTMLFormElement>(null);
  // const { pending } = useFormStatus();
  const [pending, setPending] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    if (!recaptchaRef.current) return;

    const token = await recaptchaRef.current.executeAsync();
    recaptchaRef.current.reset();

    if (!token) {
      alert("CAPTCHA validation failed. Please try again.");
      return;
    }

    // const form = e.currentTarget as HTMLFormElement;
    if (!formRef.current) {
      console.error("Form not found!");
      return;
    }
    const formData = new FormData(formRef.current);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const contribution = formData.get("contribution") as string;

    const digitsOnly = phone.replace(/\D/g, ""); // Remove +, -, spaces etc.

    if (digitsOnly.length !== 10) {
      setError(
        "Phone number must contain exactly 10 digits (excluding country code)."
      );
      return;
    } else {
      setError("");
    }

    try {
      const { emailExists, record } = await checkIfEmailExists(email);
      if (emailExists) {
        onResult({
          title: "Success",
          message: "Email already exists",
          ...record,
        });
        return;
      }

      const res = await storeRecord({
        name,
        phone,
        email,
        contribution,
        timestamp: new Date().toISOString(),
      });

      onResult({
        title: res.title,
        message: res.message,
        id: res.id,
        timestamp: res.timestamp,
        name,
        phone,
        email,
        contribution,
        count: res.count,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 px-5 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute m-auto w-[90%] md:w-[50%] p-2.5 bg-[#1B0E27] rounded-2xl shadow-2xl">
        <div className="absolute right-5">
          <button
            onClick={onClose}
            className="text-white hover:text-purple-400 transition duration-300 p-1"
            aria-label="Close"
          >
            <X color="white" size={24} />
          </button>
        </div>
        <h2 className="text-xl text-white sm:text-2xl font-bold text-center my-10">
          Register Now
        </h2>

        <form
          className="flex flex-col gap-2 sm:gap-6 w-full px-2 mx-auto md:px-[60px]"
          onSubmit={onSubmit}
          ref={formRef}
        >
          <input
            required
            type="text"
            pattern="[a-zA-Z\s]+"
            title="Name can only be Alphabets"
            placeholder="Full Name"
            id="name"
            name="name"
            className="p-3 border-2 border-purple-700 bg-transparent text-[12px] rounded-md text-white placeholder-white/70"
          />

          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className="p-3 text-[12px] border-2 border-purple-700 bg-transparent rounded text-white placeholder-white/70"
            required
            minLength={10}
            maxLength={18}
          />

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <input
            required
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            className="p-3 text-[12px] rounded border-2 border-purple-700 bg-transparent text-white placeholder-white/70"
            onChange={() => {
              if (emailError) {
                setEmailError(undefined);
              }
            }}
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

          <input
            required
            type="text"
            placeholder="What do you do?"
            id="contribution"
            name="contribution"
            className="p-3 text-[12px] rounded border-2 border-purple-700 bg-transparent text-white placeholder-white/70"
          />
          <ReCAPTCHA sitekey={siteKey} size="invisible" ref={recaptchaRef} />
          <button
            type="submit"
            className="active:bg-transparent text-white bg-purple-600 
              transition-all duration-300 ease px-2 md:px-4 mx-auto md:py-1 py-1.4 max-w-fit my-5 rounded-md font-bold text-[18px] md:text-xl"
          >
            {pending ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;

const storeRecord = async (record: RecordType): Promise<PopupContentType> => {
  try {
    const data = await addDoc(collection(db, "FormData"), record);
    const count = await fetchTotalCount();
    return {
      title: "Success",
      message: "Your registration was successful!",
      id: data.id,
      timestamp: record.timestamp,
      isSuccess: true,
      count,
    };
  } catch (error) {
    console.error("Error storing record:", error);
    return {
      title: "Error",
      message: "An error occurred. Please try again later.",
      isSuccess: false,
    };
  }
};

const fetchTotalCount = async () => {
  try {
    const colRef = collection(db, "FormData");
    const snapshot = await getCountFromServer(colRef);
    return snapshot.data().count || 0;
  } catch (error) {
    console.error("Error fetching total count:", error);
    return 0;
  }
};

const checkIfEmailExists = async (
  email: string
): Promise<{
  emailExists: boolean;
  record: {
    id: string;
    timestamp: string;
    email: string;
    name: string;
    phone: string;
    contribution: string;
  };
}> => {
  const formDataRef = collection(db, "FormData");
  const q = query(formDataRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const emailExists = !querySnapshot.empty;
  if (!emailExists) {
    return {
      emailExists: false,
      record: {
        id: "",
        timestamp: "",
        email: "",
        name: "",
        phone: "",
        contribution: "",
      },
    };
  }
  const documentId = querySnapshot.docs[0].id;
  const rawTimestamp = querySnapshot.docs[0].data().timestamp;
  const name = querySnapshot.docs[0].data().name;
  const phone = querySnapshot.docs[0].data().phone;
  const contribution = querySnapshot.docs[0].data().contribution;
  const count = undefined;
  let timestamp = "";

  if (rawTimestamp?.toDate) {
    timestamp = rawTimestamp.toDate().toISOString(); // ✅ Firebase Timestamp
  } else if (typeof rawTimestamp === "string") {
    timestamp = new Date(rawTimestamp).toISOString(); // ✅ already a string
  } else {
    timestamp = new Date().toISOString(); // fallback
  }
  const record = {
    id: documentId,
    timestamp: new Date(timestamp).toISOString(),
    email,
    name,
    phone,
    contribution,
    count,
  };
  return {
    emailExists: true,
    record,
  };
};
