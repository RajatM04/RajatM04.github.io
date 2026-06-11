import React from "react";

function baseProps(props) {
  return {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props
  };
}

function strokeProps(extra = {}) {
  return {
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...extra
  };
}

export function IconMail(props) {
  return (
    <svg {...baseProps(props)} aria-hidden="true">
      <path
        d="M4.5 7.5h15v9h-15v-9Z"
        {...strokeProps()}
      />
      <path
        d="M5 8l7 5 7-5"
        {...strokeProps()}
      />
    </svg>
  );
}

export function IconCopy(props) {
  return (
    <svg {...baseProps(props)} aria-hidden="true">
      <path
        d="M8 8h11v11H8V8Z"
        {...strokeProps()}
      />
      <path
        d="M5 16H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"
        {...strokeProps()}
      />
    </svg>
  );
}

export function IconArrowUpRight(props) {
  return (
    <svg {...baseProps(props)} aria-hidden="true">
      <path
        d="M7 17 17 7"
        {...strokeProps()}
      />
      <path
        d="M10 7h7v7"
        {...strokeProps()}
      />
    </svg>
  );
}

export function IconArrowDown(props) {
  return (
    <svg {...baseProps(props)} aria-hidden="true">
      <path
        d="M12 5v14"
        {...strokeProps()}
      />
      <path
        d="M19 12l-7 7-7-7"
        {...strokeProps()}
      />
    </svg>
  );
}

export function IconGithub(props) {
  return (
    <svg {...baseProps(props)} aria-hidden="true">
      <path
        d="M12 3c-4.9 0-8.9 3.8-8.9 8.6 0 3.8 2.5 7 6 8 .4.1.6-.2.6-.4v-2.1c-2.4.5-2.9-1-2.9-1-.4-.9-.9-1.2-.9-1.2-.7-.4.1-.4.1-.4.8.1 1.3.8 1.3.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.6-1.1-1.9-.2-4-1-4-4.2 0-.9.3-1.7.9-2.4-.1-.2-.3-1.1.1-2.2 0 0 .7-.2 2.4.9.7-.2 1.5-.3 2.3-.3s1.6.1 2.3.3c1.7-1.1 2.4-.9 2.4-.9.4 1.1.2 2 .1 2.2.6.7.9 1.5.9 2.4 0 3.2-2.1 4-4 4.2.3.3.6.8.6 1.6V20c0 .2.2.5.6.4 3.5-1 6-4.2 6-8 0-4.8-4-8.6-8.9-8.6Z"
        {...strokeProps({ strokeWidth: 2 })}
      />
      <path d="M9.2 18.3c.3.1.7.1 1 .1" {...strokeProps({ strokeWidth: 2 })} />
      <path d="M13.8 18.4c.4 0 .7 0 1-.1" {...strokeProps({ strokeWidth: 2 })} />
    </svg>
  );
}

export function IconLinkedIn(props) {
  return (
    <svg {...baseProps(props)} aria-hidden="true">
      <path d="M4.5 9.5h3v10h-3v-10Z" {...strokeProps()} />
      <path d="M6 4.6a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" {...strokeProps()} />
      <path
        d="M10 9.5h3v1.4c.5-1 1.6-1.7 3.2-1.7 2.9 0 3.6 2 3.6 4.6v5.7h-3v-5.1c0-1.4-.2-2.7-1.8-2.7-1.6 0-2 1.2-2 2.6v5.2h-3v-10Z"
        {...strokeProps()}
      />
    </svg>
  );
}
