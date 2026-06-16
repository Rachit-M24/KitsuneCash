import React from 'react'

export interface AuthLeftPanelItem {
  type: 'image' | 'text' | 'custom'
  content: string | React.ReactNode
  className?: string
}

interface AuthLeftPanelProps {
  items?: AuthLeftPanelItem[]
  backgroundColor?: string
  children?: React.ReactNode
}

export function AuthLeftPanel({
  items = [],
  backgroundColor = 'from-zinc-950 via-zinc-900 to-zinc-950',
  children,
}: AuthLeftPanelProps) {
  return (
    <div className={`hidden lg:flex w-1/2 bg-gradient-to-br ${backgroundColor} flex-col items-center justify-center p-12 relative overflow-hidden`}>
      {/* Dynamic ambient gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top right subtle glow */}
        <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] bg-orange-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
        
        {/* Bottom left subtle glow */}
        <div className="absolute -bottom-40 -left-40 w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
        
        {/* Center subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-blue-500/5 rounded-full blur-[120px] mix-blend-screen"></div>

        {/* Abstract grid pattern over background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-20 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
      </div>

      {/* Content container with glassmorphism */}
      <div className="relative z-10 w-full max-w-lg text-left space-y-8 p-10 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
        {children}

        {items.length > 0 && (
          <div className="space-y-6">
            {items.map((item, index) => (
              <div key={index} className={item.className || ''}>
                {item.type === 'image' && typeof item.content === 'string' && (
                  <img
                    src={item.content}
                    alt={`Auth panel image ${index + 1}`}
                    className="w-full h-auto object-cover rounded-xl shadow-lg border border-white/10"
                  />
                )}
                {item.type === 'text' && typeof item.content === 'string' && (
                  <p className="text-zinc-300 text-lg leading-relaxed font-medium">{item.content}</p>
                )}
                {item.type === 'custom' && item.content}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
