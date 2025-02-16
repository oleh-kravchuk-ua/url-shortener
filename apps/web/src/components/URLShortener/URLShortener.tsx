import { useState } from "react";
import type React from "react";
import { useMutation } from "react-query";

import SubmitForm from "../SubmitForm/SubmitForm";
import SuccessState from "../SuccessState/SuccessState";

import { useDebounce } from "../../hooks/useDebounce";
import { useThrottle } from "../../hooks/useThrottle";

import * as API from "../../utils/api";
import { isValidHttpUrl } from "../../utils/validate.url";

import "./URLShortener.css";

const URLShortener: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");

  const mutation = useMutation({
    mutationFn: API.shortenUrl,
    onSuccess: (result) => {
      setShortUrl(result.data.attributes.shortUrl);
    },
    onError: (error: Error | API.IResponseError) => {
      const defaultMessage = "Failed to shorten the URL. Please try again.";

      if (error instanceof Error) {
        setError(defaultMessage);
      } else {
        if (error.title && error.errors) {
          const message = error.errors.map((error: API.IValidationError) => error.msg || error.reason).join(", ");
          setError(message);
        } else {
          setError(defaultMessage);
        }
      }
    },
  });

  const throttledApiCall = useThrottle(mutation.mutate, 1500);

  const validation = (inputUrl: string) => {
    const message = isValidHttpUrl(inputUrl) ? "" : "Please enter a valid URL.";
    setError(message);
  };

  const debouncedValidateURL = useDebounce(validation, 500);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    throttledApiCall(url);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    debouncedValidateURL(e.target.value);
  };

  const handleReset = () => {
    setUrl("");
    setShortUrl("");
    setError("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      alert("Short URL copied to clipboard!");
    });
  };

  const describedBy = "urlHelp";

  return (
    <div className="url-shortener">
      <SubmitForm
        url={url}
        error={error}
        onSubmit={handleSubmit}
        onChange={handleChange}
        isLoading={mutation.isLoading}
        describedBy={describedBy}
      />

      {shortUrl && <hr className="divider" />}

      {shortUrl && <SuccessState shortUrl={shortUrl} onReset={handleReset} copyToClipboard={copyToClipboard} />}
      <div id={describedBy} className="help">
        Please enter a valid URL starting with http:// or https://.
      </div>
    </div>
  );
};

export default URLShortener;
