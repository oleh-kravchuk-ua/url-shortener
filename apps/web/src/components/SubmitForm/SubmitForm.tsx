import type React from "react";

import "./SubmitForm.css";

interface SuccessStateProps {
  url: string;
  error: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  describedBy: string;
}

const SubmitForm = ({
  url,
  error,
  isLoading = false,
  onSubmit,
  onChange,
  describedBy = "urlHelp",
}: SuccessStateProps) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="urlInput">Enter the URL to shorten:</label>
      <input
        type="text"
        id="urlInput"
        value={url}
        onChange={onChange}
        placeholder="e.g., https://example.com"
        required
        aria-describedby={describedBy}
      />
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={isLoading || !url.trim() || !!error}>
        {isLoading ? "Shortening..." : "Shorten"}
      </button>
    </form>
  );
};

export default SubmitForm;
