declare module 'lucide-react' {
  import React from 'react';

  export interface IconProps extends React.SVGAttributes<SVGElement> {
    color?: string;
    size?: string | number;
    strokeWidth?: string | number;
    absoluteStrokeWidth?: boolean;
  }

  export type Icon = React.FC<IconProps>;

  // Declare all the icons used in the project
  export const ArrowLeft: Icon;
  export const ArrowRight: Icon;
  export const ArrowUpDown: Icon;
  export const AlertTriangle: Icon;
  export const Award: Icon;
  export const BarChart3: Icon;
  export const BarChart4: Icon;
  export const Bell: Icon;
  export const Bookmark: Icon;
  export const Brain: Icon;
  export const Briefcase: Icon;
  export const Calendar: Icon;
  export const Check: Icon;
  export const CheckCircle2: Icon;
  export const ChevronLeft: Icon;
  export const ChevronRight: Icon;
  export const Clock: Icon;
  export const Code: Icon;
  export const DollarSign: Icon;
  export const Download: Icon;
  export const Eye: Icon;
  export const Facebook: Icon;
  export const FileText: Icon;
  export const Globe: Icon;
  export const Grid: Icon;
  export const Home: Icon;
  export const Instagram: Icon;
  export const LayoutGrid: Icon;
  export const Layout: Icon;
  export const LineChart: Icon;
  export const Linkedin: Icon;
  export const Mail: Icon;
  export const MapPin: Icon;
  export const MessageSquare: Icon;
  export const MoreHorizontal: Icon;
  export const Palette: Icon;
  export const Phone: Icon;
  export const Plus: Icon;
  export const Plug2: Icon;
  export const Quote: Icon;
  export const Search: Icon;
  export const Send: Icon;
  export const Share2: Icon;
  export const Shield: Icon;
  export const Sun: Icon;
  export const Moon: Icon;
  export const Target: Icon;
  export const Twitter: Icon;
  export const Users: Icon;
  export const Video: Icon;
  export const Zap: Icon;
  export const AlignLeft: Icon;
  export const ExternalLink: Icon;
} 