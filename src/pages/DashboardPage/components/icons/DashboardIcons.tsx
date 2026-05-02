const BASE_ATTRS = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

type IconProps = Readonly<{
  className?: string
  strokeWidth?: number
}>

export function GridIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...BASE_ATTRS} strokeWidth={strokeWidth} className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

export function PlusCircleIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...BASE_ATTRS} strokeWidth={strokeWidth} className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

export function PencilIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...BASE_ATTRS} strokeWidth={strokeWidth} className={className}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

export function CheckIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...BASE_ATTRS} strokeWidth={strokeWidth} className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function WarningTriangleIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...BASE_ATTRS} strokeWidth={strokeWidth} className={className}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export function QuizCircleIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...BASE_ATTRS} strokeWidth={strokeWidth} className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export function PlayIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...BASE_ATTRS} strokeWidth={strokeWidth} className={className}>
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

export function BookOpenIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...BASE_ATTRS} strokeWidth={strokeWidth} className={className}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

export function BookOpenLinesIcon({ className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg {...BASE_ATTRS} strokeWidth={strokeWidth} className={className}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="9" y1="7" x2="15" y2="7" />
      <line x1="9" y1="11" x2="15" y2="11" />
      <line x1="9" y1="15" x2="13" y2="15" />
    </svg>
  );
}
