export interface SubmenuItem {
  name: string;
  href: string;
  description?: string;
  /** Metadata for future AI-powered features */
  aiMetadata?: {
    relevance?: string[];
    keywords?: string[];
  };
}

export interface NavigationItem {
  name: string;
  href: string;
  submenu?: SubmenuItem[];
  /** Metadata for future AI-powered features */
  aiMetadata?: {
    relevance?: string[];
    keywords?: string[];
  };
}

export interface HeaderProps {
  /** Additional CSS classes to apply to the header */
  readonly className?: string;
}

export interface DesktopMenuProps {
  readonly navigation: readonly NavigationItem[];
}

export interface MobileMenuProps {
  readonly navigation: readonly NavigationItem[];
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export interface CTAButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  readonly href: string;
  readonly children: React.ReactNode;
  readonly className?: string;
  /** Optional variant for different button styles */
  readonly variant?: 'primary' | 'secondary';
  /** Optional size for different button sizes */
  readonly size?: 'sm' | 'md' | 'lg';
} 