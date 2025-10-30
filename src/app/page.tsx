import styles from "./page.module.css";
import Waitlist from "@/components/Waitlist";

export default function Home() {
	return (
		<div className={styles.page}>
			{/* Background Video */}
			<video
				className={styles.demoVideo}
				autoPlay
				muted
				playsInline
				loop
				preload="metadata"
				poster="/demo-poster.jpg"
				aria-label="FPS.SO gameplay demonstration">
				<source
					src="/Demo.mp4"
					type="video/mp4"
				/>
				Your browser does not support the video tag.
			</video>

			{/* Video Overlay */}
			<div className={styles.videoOverlay}></div>

			<main className={styles.main}>
				{/* Hero Section */}
				<div className={styles.hero}>
					<h1 className={styles.mainTitle}>FPS.SO</h1>
					<p className={styles.tagline}>
						The First Fully Onchain First Person Shooter on Solana
					</p>
					<div className={styles.badge}>
						<span className={styles.badgeText}>
							Solana Colosseum Cyberpunk Hackathon
						</span>
					</div>

					{/* CTA Buttons */}
					<div className={styles.ctaContainer}>
						<a
							href="https://game.fps.so"
							className={styles.primaryButton}
							target="_self"
							rel="noopener noreferrer">
							Launch Game
						</a>
						<a
							href="#waitlist"
							className={styles.secondaryButton}>
							Join Waitlist
						</a>
					</div>
				</div>

				{/* Features Section */}
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
						<p>
							Your weapons, achievements, and stats are yours forever
						</p>
					</div>
				</div>

				{/* Founding Team Section */}
				<section className={styles.teamSection}>
					<h2 className={styles.sectionTitle}>Founding Team</h2>
					<p className={styles.sectionSubtitle}>
						Meet the pioneers building the future of onchain gaming
					</p>

					<div className={styles.teamGrid}>
						<div className={styles.teamCard}>
							<div className={styles.teamImageWrapper}>
								<img
									src="/victor_profile.jpg"
									alt="Victor - Co-Founder"
									className={styles.teamImage}
								/>
							</div>
							<h3 className={styles.teamName}>Victor</h3>
							<p className={styles.teamRole}>Co-Founder</p>
							<p className={styles.teamBio}>Co-founded FPS.SO.</p>
							<div className={styles.teamSocials}>
								<a
									href="https://x.com/victorevolves"
									className={styles.socialLink}
									aria-label="Victor on X">
									𝕏
								</a>
								<a
									href="https://www.linkedin.com/in/victorevolves/"
									className={styles.socialLink}
									aria-label="Victor on LinkedIn">
									in
								</a>
							</div>
						</div>

						<div className={styles.teamCard}>
							<div className={styles.teamImageWrapper}>
								<img
									src="/sean_profile.jpg"
									alt="Sean Hoe - Co-Founder"
									className={styles.teamImage}
								/>
							</div>
							<h3 className={styles.teamName}>Sean Hoe</h3>
							<p className={styles.teamRole}>Co-Founder</p>
							<p className={styles.teamBio}>Co-founded FPS.SO.</p>
							<div className={styles.teamSocials}>
								<a
									href="https://x.com/sean_hoee"
									className={styles.socialLink}
									aria-label="Sean Hoe on X">
									𝕏
								</a>
								<a
									href="https://www.linkedin.com/in/sean-hoe-kai-zher-060882232/"
									className={styles.socialLink}
									aria-label="Sean Hoe on LinkedIn">
									in
								</a>
							</div>
						</div>

						<div className={styles.teamCard}>
							<div className={styles.teamImageWrapper}>
								<img
									src="/weihup_profile.jpg"
									alt="Wei Hup - Co-Founder"
									className={styles.teamImage}
								/>
							</div>
							<h3 className={styles.teamName}>Wei Hup</h3>
							<p className={styles.teamRole}>Co-Founder</p>
							<p className={styles.teamBio}>Co-founded FPS.SO.</p>
							<div className={styles.teamSocials}>
								<a
									href="https://x.com/_weihup"
									className={styles.socialLink}
									aria-label="Wei Hup on X">
									𝕏
								</a>
								<a
									href="https://www.linkedin.com/in/tan-wei-hup/"
									className={styles.socialLink}
									aria-label="Wei Hup on LinkedIn">
									in
								</a>
							</div>
						</div>
					</div>
				</section>

				{/* Waitlist Section */}
				<div id="waitlist">
					<Waitlist />
				</div>
			</main>

			<footer className={styles.footer}>
				<p className={styles.footerText}>
					Built with ❤️ for Solana Colosseum Cyberpunk Hackathon
				</p>
			</footer>
		</div>
	);
}
