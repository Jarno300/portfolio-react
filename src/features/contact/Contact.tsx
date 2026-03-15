import { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const endpoint = "https://emailer.jarno-mommens.workers.dev";
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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
    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Failed to send message.");
      }

      setStatus("success");
      setStatusMessage("Message sent. Thanks for reaching out!");
      setFormState({ name: "", email: "", subject: "", message: "" });
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
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <h2>Send a message</h2>
            <p>Your message will be delivered directly to my inbox.</p>
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
