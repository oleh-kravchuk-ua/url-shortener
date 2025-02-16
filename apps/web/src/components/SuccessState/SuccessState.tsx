import "./SuccessState.css";

interface SuccessStateProps {
  shortUrl: string;
  onReset: () => void;
  copyToClipboard: () => void;
}

const SuccessState = ({ shortUrl, onReset, copyToClipboard }: SuccessStateProps) => {
  return (
    <div className="success">
      <p>Success! Here's your short URL:</p>
      <input type="text" value={shortUrl} readOnly />
      <button type="button" onClick={copyToClipboard}>
        Copy
      </button>
      <button type="button" onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default SuccessState;
