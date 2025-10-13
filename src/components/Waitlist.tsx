'use client';

import { useState, FormEvent } from 'react';
import styles from './Waitlist.module.css';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, walletAddress }),
      });

      const data = await response.json() as { message?: string; error?: string };

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Successfully joined the waitlist!');
        setEmail('');
        setName('');
        setWalletAddress('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to submit. Please check your connection and try again.');
      console.error('Waitlist submission error:', error);
    }
  };

  return (
    <div className={styles.waitlistContainer}>
      <div className={styles.waitlistContent}>
        <h2 className={styles.title}>Join the Waitlist</h2>
        <p className={styles.subtitle}>
          Be among the first to experience the future of onchain FPS gaming
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              disabled={status === 'loading'}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              disabled={status === 'loading'}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Solana Wallet Address (optional)"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className={styles.input}
              disabled={status === 'loading'}
            />
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
          </button>
        </form>

        {message && (
          <div className={`${styles.message} ${styles[status]}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
