import { useLocation, Link } from 'react-router-dom'
import { AuthLeftPanel, type AuthLeftPanelItem } from './AuthLeftPanel'
import { AUTH_ROUTES } from '@/constants/app.routes'

interface AuthPageProps {
  children?: React.ReactNode
  title?: string
  description?: string
  leftPanelItems?: AuthLeftPanelItem[]
  leftPanelTitle?: React.ReactNode
  leftPanelSubtitle?: React.ReactNode
}

const AuthPage = ({
  children,
  title,
  description,
  leftPanelItems = [],
  leftPanelTitle,
  leftPanelSubtitle,
}: AuthPageProps) => {
  const location = useLocation()
  const isLogin = location.pathname.includes('login')

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col lg:flex-row font-sans w-full">
      {/* Left Panel - Branding/Images */}
      <AuthLeftPanel
        items={leftPanelItems}
      >
        {leftPanelTitle ? (
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-white">{leftPanelTitle}</h1>
            {leftPanelSubtitle && (
              <p className="text-zinc-400 text-lg font-medium">{leftPanelSubtitle}</p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-orange-500/20 rounded-xl mb-4 border border-orange-500/30">
              <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white">Unlock Your Financial Potential</h1>
            <p className="text-zinc-400 text-lg font-medium">AI-powered insights, automated budgeting, and smart goals to help you master your wealth.</p>
          </div>
        )}
      </AuthLeftPanel>

      {/* Right Panel - Form */}
      <div className="flex-1 lg:w-1/2 flex flex-col items-center justify-center px-6 lg:px-12 py-12 lg:py-0 relative">
        {/* Subtle right panel background decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-orange-50 to-transparent opacity-60 pointer-events-none"></div>

        <div className="w-full max-w-[440px] relative z-10">
          {/* Top Navigation */}
          <div className="mb-10 flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
                <span className="w-6 h-6 bg-orange-600 rounded-md flex items-center justify-center">
                  <span className="text-white text-xs font-bold">K</span>
                </span>
                KitsuneCash
              </h2>
            </div>
            {!isLogin && (
              <div className="text-sm text-zinc-500 font-medium flex items-center gap-1.5 hidden sm:flex">
                Already have an account?
                <Link
                  to={AUTH_ROUTES.login}
                  className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                >
                  Sign in
                </Link>
              </div>
            )}
            {isLogin && (
              <div className="text-sm text-zinc-500 font-medium flex items-center gap-1.5 hidden sm:flex">
                Don&apos;t have an account?
                <Link
                  to={AUTH_ROUTES.register}
                  className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                >
                  Create one
                </Link>
              </div>
            )}
          </div>

          {/* Form Header */}
          {(title || description) && (
            <div className="mb-8 space-y-2">
              {title && <h3 className="text-3xl font-bold tracking-tight text-zinc-900">{title}</h3>}
              {description && <p className="text-zinc-500 font-medium">{description}</p>}
            </div>
          )}

          {/* Form Card */}
          <div className="bg-white p-8 rounded-2xl shadow-[0_0_40px_-15px_rgba(0,0,0,0.1)] border border-zinc-200/60">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage;