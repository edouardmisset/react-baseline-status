import baselineStyles from "./feature-baseline-status.module.css";
import styles from "./feature-status-skeleton.module.css";

export const FeatureStatusSkeleton = () => (
  <div className={baselineStyles.baselineStatus}>
    <div className={baselineStyles.baselineSummary}>
      <div className={`${styles.skeletonBox} ${styles.baselineStatusSkeleton}`} />
      <div className={`${styles.skeletonBox} ${styles.featureNameSkeleton}`} />
      <div className={`${styles.skeletonBox} ${styles.browsersSkeleton}`} />
    </div>
  </div>
);
