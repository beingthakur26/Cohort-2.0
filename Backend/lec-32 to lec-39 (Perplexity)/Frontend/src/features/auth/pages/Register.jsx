import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hook/useAuth'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react'
import { setError } from '../auth.slice'

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '', // Still keeping username as backend requires it
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  const { loading, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { handleRegister } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
        dispatch(setError(null))
    }
  }, [dispatch])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const submitForm = async (event) => {
    event.preventDefault()
    if (!agreeTerms) {
        dispatch(setError("You must agree to the terms of service"))
        return
    }
    setSuccessMsg('')

    // Auto-generate username from email if backend requires it but wireframe doesn't show it
    const payload = { ...formData }
    if (!payload.username) {
        payload.username = payload.email.split('@')[0] + Math.floor(Math.random() * 1000)
    }

    const result = await handleRegister(payload)
    if (result.success) {
      setSuccessMsg(result.message)
      setTimeout(() => navigate('/login'), 2000)
    }
  }

  return (
    <div className="auth-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="auth-card"
        style={{ maxWidth: '480px' }}
      >
        <div className="auth-header">
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Free forever, no credit card</p>
        </div>

        <button className="auth-button" style={{ backgroundColor: 'transparent', border: '1px solid var(--bg-depth-2)', color: 'var(--text-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign up with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--bg-depth-2)' }}></div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>or</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--bg-depth-2)' }}></div>
        </div>

        <AnimatePresence>
            {error && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.75rem', borderRadius: '0.75rem', color: '#f87171', fontSize: '0.875rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <AlertCircle size={16} />
                    {error}
                </motion.div>
            )}
            {successMsg && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{ backgroundColor: 'rgba(142, 182, 155, 0.1)', border: '1px solid rgba(142, 182, 155, 0.2)', padding: '0.75rem', borderRadius: '0.75rem', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <CheckCircle2 size={16} />
                    {successMsg}
                </motion.div>
            )}
        </AnimatePresence>

        <form onSubmit={submitForm}>
          <div className="form-group">
            <label className="form-label">Full name</label>
            <div className="input-container">
              <User className="input-icon" size={18} />
              <input
                id="fullName"
                type="text"
                className="input-field"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="input-container">
              <Mail className="input-icon" size={18} />
              <input
                id="email"
                type="email"
                className="input-field"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@email.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-container">
              <Lock className="input-icon" size={18} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="input-field with-eye"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 8 characters"
                required
              />
              <button 
                type="button"
                className="eye-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.5rem 0' }}>
            <input 
                type="checkbox" 
                checked={agreeTerms} 
                onChange={(e) => setAgreeTerms(e.target.checked)}
                style={{ width: '1.25rem', height: '1.25rem', borderRadius: '0.375rem', border: '1px solid var(--bg-depth-2)', backgroundColor: 'var(--bg-depth-0)', cursor: 'pointer' }} 
            />
            <label style={{ fontSize: '0.875rem', color: 'var(--text-bright)', cursor: 'pointer' }}>
                I agree to <span style={{ textDecoration: 'underline' }}>Terms of Service</span> and <span style={{ textDecoration: 'underline' }}>Privacy Policy</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="auth-button"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="auth-footer">
          Have account? 
          <Link to="/login" className="auth-link">Sign in</Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Register