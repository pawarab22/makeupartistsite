interface LogoIconProps {
  size?: number;
  className?: string;
}

export default function LogoIcon({ size = 48, className = '' }: LogoIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} w-full h-full`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#f093fb', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#f5576c', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="logoGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#E91E63', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#FF6B9D', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="brushGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#FFA500', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Background Circle with soft glow */}
      <circle cx="100" cy="100" r="95" fill="url(#logoGradient)" opacity="0.15"/>
      <circle cx="100" cy="100" r="85" fill="url(#logoGradient)" opacity="0.2"/>
      
      {/* Main Circle */}
      <circle cx="100" cy="100" r="75" fill="url(#logoGradient)" stroke="url(#logoGradient2)" strokeWidth="2.5"/>
      
      {/* Makeup Brush - Left side */}
      <g transform="translate(40, 80) rotate(-15)">
        {/* Brush handle */}
        <rect x="0" y="0" width="8" height="45" rx="4" fill="url(#brushGradient)" opacity="0.9"/>
        {/* Brush bristles */}
        <ellipse cx="4" cy="50" rx="12" ry="8" fill="#FFB6C1" opacity="0.8"/>
        <ellipse cx="4" cy="52" rx="10" ry="6" fill="#FFC0CB" opacity="0.9"/>
      </g>
      
      {/* Lipstick - Right side */}
      <g transform="translate(152, 75)">
        {/* Lipstick tube */}
        <rect x="0" y="0" width="12" height="35" rx="2" fill="#FF1493" opacity="0.9"/>
        <rect x="2" y="0" width="8" height="5" rx="1" fill="#FF69B4"/>
        {/* Lipstick tip */}
        <ellipse cx="6" cy="38" rx="5" ry="3" fill="#DC143C"/>
      </g>
      
      {/* Sparkles/Glitter around the circle */}
      <g>
        {/* Top sparkle */}
        <circle cx="100" cy="35" r="3" fill="#FFD700" opacity="0.9">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
        </circle>
        <path d="M 100 30 L 100 25 M 95 35 L 90 35 M 105 35 L 110 35" stroke="#FFD700" strokeWidth="2" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
        </path>
        
        {/* Right sparkle */}
        <circle cx="165" cy="100" r="2.5" fill="#FFD700" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite"/>
        </circle>
        <path d="M 165 95 L 165 90 M 160 100 L 155 100 M 170 100 L 175 100" stroke="#FFD700" strokeWidth="1.5" opacity="0.7">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite"/>
        </path>
        
        {/* Bottom sparkle */}
        <circle cx="100" cy="165" r="3" fill="#FFD700" opacity="0.7">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.2s" repeatCount="indefinite"/>
        </circle>
        <path d="M 100 160 L 100 155 M 95 165 L 90 165 M 105 165 L 110 165" stroke="#FFD700" strokeWidth="2" opacity="0.6">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.2s" repeatCount="indefinite"/>
        </path>
        
        {/* Left sparkle */}
        <circle cx="35" cy="100" r="2.5" fill="#FFD700" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.3s" repeatCount="indefinite"/>
        </circle>
        <path d="M 35 95 L 35 90 M 30 100 L 25 100 M 40 100 L 45 100" stroke="#FFD700" strokeWidth="1.5" opacity="0.7">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.3s" repeatCount="indefinite"/>
        </path>
      </g>
      
      {/* Mirror/Compact in center */}
      <g transform="translate(85, 85)">
        {/* Mirror frame */}
        <circle cx="15" cy="15" r="18" fill="none" stroke="#FFD700" strokeWidth="2" opacity="0.6"/>
        <circle cx="15" cy="15" r="14" fill="url(#logoGradient)" opacity="0.3"/>
        {/* Mirror reflection */}
        <ellipse cx="15" cy="15" rx="10" ry="12" fill="#E0E0E0" opacity="0.4"/>
      </g>
      
      {/* PAA Text with artistic styling */}
      <text 
        x="100" 
        y="135" 
        fontFamily="Arial, sans-serif" 
        fontSize="36" 
        fontWeight="bold" 
        fill="white" 
        textAnchor="middle" 
        opacity="0.95"
        style={{ letterSpacing: '2px' }}
      >
        PAA
      </text>
    </svg>
  );
}

