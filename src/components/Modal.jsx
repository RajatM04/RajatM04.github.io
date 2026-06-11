import React, { useEffect, useRef } from "react";

function getFocusable(container) {
  if (!container) return [];
  const selector =
    'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll(selector)).filter(
    (element) =>
      !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true"
  );
}

export default function Modal({ open, title, children, onClose }) {
  const shellRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement;
    const shell = shellRef.current;
    const focusables = getFocusable(shell);
    (focusables[0] ?? shell)?.focus?.();

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
      if (event.key !== "Tab") return;

      const current = document.activeElement;
      const items = getFocusable(shell);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const isShift = event.shiftKey;

      if (!isShift && current === last) {
        event.preventDefault();
        first.focus();
      } else if (isShift && (current === first || current === shell)) {
        event.preventDefault();
        last.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("modalOpen");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modalOpen");
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modalOverlay" role="presentation" onMouseDown={onClose}>
      <div
        className="modalShell"
        ref={shellRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
        tabIndex={-1}
      >
        <div className="modalHead">
          <div className="modalTitle">{title}</div>
          <button className="modalClose" type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="modalBody">{children}</div>
      </div>
    </div>
  );
}
