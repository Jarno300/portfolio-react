import { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const endpoint = "/api/contact";
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot — hidden from humans, filled by bots
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /* Honeypot check — silently absorb bot submissions */
    if (formState.website.trim().length > 0) {
      setStatus("success");
      setStatusMessage("Message sent. Thanks for reaching out!");
      setFormState({ name: "", email: "", subject: "", message: "", website: "" });
      return;
    }

    setStatus("sending");
    setStatusMessage("");

    try {
      const { name, email, subject, message } = formState;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Failed to send message.");
      }

      setStatus("success");
      setStatusMessage("Message sent. Thanks for reaching out!");
      setFormState({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className={styles.contactContainer}>
      <h1>Get in Touch</h1>

      <div className={styles.contactLayout}>
        <form
          className={styles.contactForm}
          onSubmit={(e) => {
            void handleSubmit(e);
          }}
        >
          <div className={styles.formHeader}>
            <h2>Send a message</h2>
            <p>Your message will be delivered directly to my inbox.</p>
          </div>

          {/* Honeypot — invisible to humans */}
          <div style={{ position: "absolute", left: "-9999px", opacity: 0 }} aria-hidden="true">
            <label htmlFor="hpt-website">Website</label>
            <input
              type="text"
              id="hpt-website"
              name="website"
              value={formState.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className={styles.formGrid}>
            <label className={styles.formField}>
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </label>

            <label className={styles.formField}>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="you@email.com"
                autoComplete="email"
                required
              />
            </label>

            <label className={styles.formField}>
              <span>Subject</span>
              <input
                type="text"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                placeholder="Project inquiry"
                autoComplete="off"
              />
            </label>
          </div>

          <label className={styles.formField}>
            <span>Message</span>
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              rows={5}
              required
            />
          </label>

          <button type="submit" className={styles.formButton}>
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
          {status !== "idle" && (
            <p
              className={`${styles.formStatus} ${status === "success" ? styles.formStatusSuccess : styles.formStatusError}`}
              role="status"
            >
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
