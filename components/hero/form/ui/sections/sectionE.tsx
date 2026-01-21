import { useApp } from "@/context";
import { AnimatePresence, motion } from "framer-motion";
import EmailForm from "./cta/emailForm";
import ContactForm from "./cta/contactForm";

export default function SectionE() {
  const { formData } = useApp();

  const showEmailForm = formData.d === "Ja, ich will meinen PEAK erreichen!";

  return (
    <AnimatePresence mode="wait">
      {showEmailForm ? (
        <motion.div
          key="email-form"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          <EmailForm />
        </motion.div>
      ) : (
        <motion.div
          key="contact-form"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="flex-none"
        >
          <ContactForm />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
