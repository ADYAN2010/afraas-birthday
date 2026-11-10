import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Lock, KeyRound, AlertTriangle, X, CheckCircle2, Loader2, Eye, EyeOff } from 'lucide-react';

export default function PrivacyBreachScreen({ onRecovered }) {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState(false);

  const handleAdminSubmit = async (e) => {
    e?.preventDefault();
    if (!adminPassword.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setRecoverySuccess(true);
        setIsLoading(false);
        // Smooth transition back to normal website after confirmation display
        setTimeout(() => {
          setIsAdminModalOpen(false);
          if (onRecovered) {
            onRecovered();
          } else {
            window.location.reload();
          }
        }, 1800);
      } else {
        setErrorMsg(data.error || 'Access denied. Invalid administrator credentials.');
        setIsLoading(false);
      }
    } catch (err) {
      setErrorMsg('Failed to reach server. Please check your connection.');
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0C0A0D',
        backgroundImage: 'radial-gradient(ellipse at 50% 30%, rgba(139, 26, 43, 0.22) 0%, rgba(12, 10, 13, 0.98) 75%)',
        color: '#F7FAFC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        zIndex: 99999,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Discreet Admin Recovery Shortcut in Top-Right Corner */}
      <button
        id="admin-recovery-trigger-btn"
        onClick={() => {
          setIsAdminModalOpen(true);
          setErrorMsg('');
          setRecoverySuccess(false);
          setAdminPassword('');
        }}
        title="Admin Recovery"
        aria-label="Admin Recovery"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#718096',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          outline: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(229, 62, 62, 0.15)';
          e.currentTarget.style.color = '#E53E3E';
          e.currentTarget.style.borderColor = 'rgba(229, 62, 62, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
          e.currentTarget.style.color = '#718096';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        }}
      >
        <KeyRound size={15} />
      </button>

      {/* Main Warning Shield Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: '560px',
          width: '100%',
          backgroundColor: 'rgba(22, 17, 24, 0.85)',
          border: '1.5px solid rgba(229, 62, 62, 0.35)',
          borderRadius: '24px',
          padding: 'clamp(32px, 6vw, 48px) clamp(20px, 5vw, 36px)',
          textAlign: 'center',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(229, 62, 62, 0.15)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          position: 'relative',
        }}
      >
        {/* Animated Security Icon */}
        <div style={{ position: 'relative', width: '74px', height: '74px', margin: '0 auto 20px' }}>
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.65, 0.35] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(229, 62, 62, 0.4) 0%, rgba(229, 62, 62, 0) 70%)',
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: '#1E1216',
              border: '2px solid #E53E3E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#E53E3E',
              zIndex: 1,
            }}
          >
            <ShieldAlert size={36} />
          </div>
        </div>

        {/* Status Pill: PRIVACY BREACHED */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 16px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(229, 62, 62, 0.14)',
            border: '1.5px solid #E53E3E',
            color: '#FC8181',
            fontSize: '0.78rem',
            fontWeight: 800,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          <AlertTriangle size={13} color="#E53E3E" />
          <span>PRIVACY BREACHED</span>
        </div>

        {/* Primary Alert Headline: WEBSITE UNDER LOCKDOWN */}
        <h1
          style={{
            fontSize: 'clamp(1.6rem, 4.5vw, 2.2rem)',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            marginBottom: '12px',
            lineHeight: 1.2,
          }}
        >
          WEBSITE UNDER LOCKDOWN
        </h1>

        {/* Secondary Alert Subtitle */}
        <p
          style={{
            fontSize: '1.05rem',
            fontWeight: 600,
            color: '#FEB2B2',
            marginBottom: '16px',
            lineHeight: 1.4,
          }}
        >
          Unauthorized access activity detected.
        </p>

        {/* Explanation Message */}
        <p
          style={{
            fontSize: '0.92rem',
            color: '#A0AEC0',
            lineHeight: 1.6,
            marginBottom: '24px',
            maxWidth: '440px',
            margin: '0 auto 24px',
          }}
        >
          This private birthday experience has been temporarily locked to protect its contents.
        </p>

        {/* Action Callout */}
        <div
          style={{
            padding: '14px 20px',
            borderRadius: '14px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(229, 62, 62, 0.25)',
            display: 'inline-block',
            marginBottom: '18px',
          }}
        >
          <span
            style={{
              fontSize: '0.95rem',
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '0.02em',
            }}
          >
            Please contact Adyan to restore access.
          </span>
        </div>

        {/* Discreet Unlock Lockdown Button */}
        <div>
          <button
            id="unlock-lockdown-btn"
            onClick={() => {
              setIsAdminModalOpen(true);
              setErrorMsg('');
              setRecoverySuccess(false);
              setAdminPassword('');
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#CBD5E0',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(229, 62, 62, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(229, 62, 62, 0.35)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.color = '#CBD5E0';
            }}
          >
            <span>Unlock Lockdown 🔓</span>
          </button>
        </div>
      </motion.div>

      {/* SECURE ADMIN RECOVERY MODAL */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <motion.div
            id="admin-recovery-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target.id === 'admin-recovery-modal-backdrop') {
                setIsAdminModalOpen(false);
              }
            }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              zIndex: 100000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '440px',
                backgroundColor: '#161318',
                borderRadius: '24px',
                border: '1.5px solid rgba(229, 62, 62, 0.4)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(229, 62, 62, 0.2)',
                padding: '30px 24px',
                textAlign: 'center',
                color: '#F7FAFC',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsAdminModalOpen(false)}
                aria-label="Close recovery modal"
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'transparent',
                  border: 'none',
                  color: '#718096',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={18} />
              </button>

              {/* Recovery Success State */}
              {recoverySuccess ? (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(72, 187, 120, 0.15)',
                      border: '2px solid #48BB78',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      color: '#48BB78',
                    }}
                  >
                    <CheckCircle2 size={30} />
                  </div>

                  <div
                    style={{
                      display: 'inline-block',
                      padding: '4px 14px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(72, 187, 120, 0.15)',
                      border: '1px solid #48BB78',
                      color: '#68D391',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      marginBottom: '12px',
                    }}
                  >
                    PRIVACY LOCKDOWN REMOVED
                  </div>

                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      marginBottom: '6px',
                    }}
                  >
                    Access has been restored successfully.
                  </h3>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: '#A0AEC0',
                      marginBottom: '10px',
                    }}
                  >
                    Device registry has been reset.
                  </p>
                </div>
              ) : (
                <>
                  {/* Lock Icon */}
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(229, 62, 62, 0.12)',
                      border: '1.5px solid #E53E3E',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 14px',
                      color: '#E53E3E',
                    }}
                  >
                    <Lock size={22} />
                  </div>

                  {/* Header: Administrator verification */}
                  <h2
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      marginBottom: '6px',
                    }}
                  >
                    Administrator verification
                  </h2>

                  {/* Subtitle: Enter your website password to restore access. */}
                  <p
                    style={{
                      fontSize: '0.86rem',
                      color: '#A0AEC0',
                      lineHeight: 1.5,
                      marginBottom: '20px',
                    }}
                  >
                    Enter your website password to restore access.
                  </p>

                  <form onSubmit={handleAdminSubmit}>
                    <div style={{ position: 'relative', marginBottom: '16px' }}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={adminPassword}
                        onChange={(e) => {
                          setAdminPassword(e.target.value);
                          if (errorMsg) setErrorMsg('');
                        }}
                        placeholder="Enter website password..."
                        autoFocus
                        disabled={isLoading}
                        aria-label="Website password"
                        style={{
                          width: '100%',
                          padding: '12px 42px 12px 14px',
                          borderRadius: '12px',
                          border: errorMsg ? '1.5px solid #E53E3E' : '1.5px solid rgba(255, 255, 255, 0.15)',
                          backgroundColor: '#0C0A0D',
                          fontSize: '0.92rem',
                          color: '#FFFFFF',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'transparent',
                          border: 'none',
                          color: '#718096',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '4px',
                        }}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    {errorMsg && (
                      <p style={{ color: '#FC8181', fontSize: '0.84rem', marginBottom: '14px', fontWeight: 600 }}>
                        {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading || !adminPassword.trim()}
                      style={{
                        width: '100%',
                        padding: '12px 20px',
                        borderRadius: '12px',
                        backgroundColor: isLoading || !adminPassword.trim() ? '#4A5568' : '#E53E3E',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        cursor: isLoading || !adminPassword.trim() ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 14px rgba(229, 62, 62, 0.3)',
                        transition: 'background-color 0.2s',
                      }}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={16} className="soundtrack-spinner" />
                          <span>Verifying credentials...</span>
                        </>
                      ) : (
                        <>
                          <Lock size={15} />
                          <span>Unlock Lockdown 🔓</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
