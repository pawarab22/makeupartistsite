import LogoIcon from './LogoIcon';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtext?: boolean;
}

export default function Logo({ size = 'md', showSubtext = false }: LogoProps) {
  const sizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-3xl sm:text-4xl',
  };
  
  const iconSizes = {
    sm: 32,
    md: 48,
    lg: 64,
  };
  
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="flex-shrink-0 transform hover:scale-110 transition-all duration-300">
        <LogoIcon size={iconSizes[size]} className="drop-shadow-lg" />
      </div>
      <div>
        <h1 className={`font-bold leading-tight ${sizes[size]}`}>
          <span className="block text-deep-plum drop-shadow-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>Pooja's</span>
          <span className="block bg-gradient-to-r from-rose-accent via-rose-pink to-muted-rose bg-clip-text text-transparent drop-shadow-sm" style={{ WebkitTextFillColor: 'transparent', textShadow: '0 1px 2px rgba(194, 24, 91, 0.2)' }}>Aura Artistry</span>
        </h1>
        {showSubtext && (
          <p className="text-xs text-gray-700 hidden sm:block font-medium">Makeup & Makeovers</p>
        )}
      </div>
    </div>
  );
}

