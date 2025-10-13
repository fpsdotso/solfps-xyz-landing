import styles from "./page.module.css";
import Waitlist from "@/components/Waitlist";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.mainTitle}>SOLFPS.XYZ</h1>
          <p className={styles.tagline}>
            The First Fully Onchain First Person Shooter on Solana
          </p>
          <div className={styles.badge}>
            <span className={styles.badgeText}>Solana Colosseum Cyberpunk Hackathon</span>
          </div>
        </div>

        <div className={styles.videoContainer}>
          <video
            className={styles.demoVideo}
            controls
            preload="metadata"
            poster="/demo-poster.jpg"
          >
            <source src="/Demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <h3>⚡ Lightning Fast</h3>
            <p>Built on Solana for sub-second transaction finality</p>
          </div>
          <div className={styles.feature}>
            <h3>🔗 Fully Onchain</h3>
            <p>Every action, every move recorded on the blockchain</p>
          </div>
          <div className={styles.feature}>
            <h3>🎮 True Ownership</h3>
            <p>Your weapons, achievements, and stats are yours forever</p>
          </div>
        </div>

        <Waitlist />
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Built with ❤️ for Solana Colosseum Cyberpunk Hackathon
        </p>
      </footer>
    </div>
  );
}
