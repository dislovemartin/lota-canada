import 'react';

declare module 'react' {
  // Augment ReactNode to ensure compatibility with React 19
  export interface ReactPortal {
    children: ReactNode;
  }
}
