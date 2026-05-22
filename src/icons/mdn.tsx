import styles from "./mdn.module.css";

export function MDNIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      className={styles.mdnSearchBtn}
      role="img"
    >
      <title>MDN Web Docs</title>
      <path d="m21.538 1.1 -6.745 21.8h-2.77L18.77 1.1ZM24 1.1v21.8h-2.462V1.1Zm-12 0v21.8H9.538V1.1Zm-2.462 0L2.77 22.9H0L6.746 1.1Z" />
    </svg>
  );
}
