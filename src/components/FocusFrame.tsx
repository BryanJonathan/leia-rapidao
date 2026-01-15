import '../styles/FocusFrame.css';

export function FocusFrame() {
  return (
    <div className="focus-frame">
      <div className="focus-line focus-line-top-left"></div>
      <div className="focus-line focus-line-top-right"></div>
      <div className="focus-line focus-line-bottom-left"></div>
      <div className="focus-line focus-line-bottom-right"></div>
    </div>
  );
}
