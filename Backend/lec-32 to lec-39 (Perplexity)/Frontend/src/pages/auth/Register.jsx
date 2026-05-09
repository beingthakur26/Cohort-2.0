import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Lock, Eye, EyeOff, ShieldCheck, AlertCircle, CheckCircle2, Sparkles, Quote } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { setError } from '../../store/slices/auth.slice'

const testimonials = [
    {
        quote: "The citations are a game changer. I never have to worry about hallucination again.",
        author: "Elena Rodriguez",
        role: "Academic Researcher",
        avatar: "https://ui-avatars.com/api/?name=Elena+Rodriguez&background=0D8ABC&color=fff"
    },
    {
        quote: "Fast, precise, and focused. It's the only AI tool I use for my morning briefing.",
        author: "Marcus Vance",
        role: "Financial Analyst",
        avatar: "https://ui-avatars.com/api/?name=Marcus+Vance&background=6366f1&color=fff"
    },
    {
        quote: "This platform makes discovering new insights faster and easier than ever!",
        author: "John Abraham",
        role: "CEO, DragoCom",
        avatar: "https://ui-avatars.com/api/?name=John+Abraham&background=10b981&color=fff"
    }
]

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')
    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

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
            dispatch(setError('You must agree to the terms of service'))
            return
        }
        setSuccessMsg('')

        const payload = { ...formData }
        if (!payload.username) {
            payload.username = `${payload.email.split('@')[0]}${Math.floor(Math.random() * 1000)}`
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
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="auth-card"
            >
                <span className="auth-step">Step 1/3</span>
                <div className="auth-header">
                    <h1 className="auth-title">Start your journey</h1>
                    <p className="auth-subtitle">Focused AI search at your fingertips.</p>
                </div>

                <form onSubmit={submitForm}>
                    <AnimatePresence mode='wait'>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="auth-alert auth-alert-error"
                            >
                                <AlertCircle size={16} />
                                {error}
                            </motion.div>
                        )}
                        {successMsg && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="auth-alert auth-alert-success"
                            >
                                <CheckCircle2 size={16} />
                                {successMsg}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="form-group">
                        <label className="form-label" htmlFor="fullName">Full name</label>
                        <div className="input-container">
                            <User className="input-icon" size={18} />
                            <input
                                id="fullName"
                                type="text"
                                className="input-field"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="e.g. John Abraham"
                                autoComplete="name"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email address</label>
                        <div className="input-container">
                            <Mail className="input-icon" size={18} />
                            <input
                                id="email"
                                type="email"
                                className="input-field"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="e.g. demo@gmail.com"
                                autoComplete="email"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <div className="input-container">
                            <Lock className="input-icon" size={18} />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                className="input-field with-eye"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Min 8 characters"
                                autoComplete="new-password"
                                required
                            />
                            <button
                                type="button"
                                className="eye-button"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="auth-checkbox-row">
                        <input
                            id="agreeTerms"
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            className="auth-checkbox"
                        />
                        <label htmlFor="agreeTerms" className="auth-checkbox-label">
                            I agree to <span>Terms</span> and <span>Privacy Policy</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="auth-button auth-button-primary"
                    >
                        {loading ? 'Creating account...' : 'Continue'}
                    </button>
                </form>

                <div className="auth-divider">
                    <span>Or continue with</span>
                </div>

                <button type="button" className="auth-button auth-button-secondary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                </button>

                <p className="auth-footer">
                    Have an account?
                    <Link to="/login" className="auth-link">Log in</Link>
                </p>
            </motion.div>

            <aside className="auth-panel hidden lg:flex" aria-hidden="true">
                <div className="auth-panel-overlay"></div>
                <div className="auth-content">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="auth-brand-mark"
                    >
                        <ShieldCheck size={32} strokeWidth={2.5} />
                    </motion.div>
                    <h2 className="auth-panel-title">Neural Search. Verified Precision.</h2>
                    <p className="auth-panel-copy">
                        Discover the new standard for cognitive research with instant answers and verifiable citations.
                    </p>
                </div>
                
                <div className="auth-testimonial">
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-5">
                        <Quote size={80} />
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTestimonial}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="flex flex-col items-center"
                        >
                            <p className="auth-testimonial-text">
                                "{testimonials[currentTestimonial].quote}"
                            </p>
                            <div className="auth-testimonial-author">
                                <img 
                                    src={testimonials[currentTestimonial].avatar} 
                                    alt={testimonials[currentTestimonial].author} 
                                    className="auth-testimonial-avatar" 
                                />
                                <div className="auth-testimonial-info">
                                    <span className="auth-testimonial-name">{testimonials[currentTestimonial].author}</span>
                                    <span className="auth-testimonial-role">{testimonials[currentTestimonial].role}</span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    
                    <div className="flex gap-1.5 mt-6">
                        {testimonials.map((_, index) => (
                            <div 
                                key={index}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'bg-brand-950 w-4' : 'bg-brand-950/20'}`}
                            />
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default Register
