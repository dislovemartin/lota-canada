// Type declarations for React

declare module 'react' {
  export type FC<P = {}> = FunctionComponent<P>;
  export interface FunctionComponent<P = {}> {
    (props: P & { children?: React.ReactNode }): React.ReactElement | null;
  }
  
  export type ReactNode = 
    | ReactElement
    | string
    | number
    | boolean
    | null
    | undefined;
    
  export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }
  
  export type Key = string | number;
  
  export type JSXElementConstructor<P> = 
    | ((props: P) => ReactElement | null)
    | (new (props: P) => Component<P, any>);
    
  export class Component<P, S> {
    constructor(props: P);
    props: Readonly<P>;
    state: Readonly<S>;
    setState(state: S | ((prevState: S, props: P) => S), callback?: () => void): void;
    forceUpdate(callback?: () => void): void;
    render(): ReactNode;
  }
  
  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: readonly any[]): void;
  export function useRef<T>(initialValue: T): { current: T };
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: readonly any[]): T;
  export function useMemo<T>(factory: () => T, deps: readonly any[]): T;
  
  export interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
  }
  
  export interface FormEvent<T = Element> extends SyntheticEvent<T> {}
  
  export interface KeyboardEvent<T = Element> extends SyntheticEvent<T> {
    altKey: boolean;
    charCode: number;
    ctrlKey: boolean;
    key: string;
    keyCode: number;
    metaKey: boolean;
    shiftKey: boolean;
  }
  
  export interface SyntheticEvent<T = Element, E = Event> {
    bubbles: boolean;
    cancelable: boolean;
    currentTarget: EventTarget & T;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    nativeEvent: E;
    preventDefault(): void;
    stopPropagation(): void;
    target: EventTarget;
    timeStamp: number;
    type: string;
  }
}

// Add missing React type declarations
declare namespace React {
  // Component types
  type ComponentType<P = {}> = React.FC<P>;
  type Component = any;
  
  // Ref types
  type ElementRef<T> = T extends React.ForwardRefExoticComponent<React.RefAttributes<infer U>> ? U : never;
  
  // Props types
  type ComponentProps<T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
    T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] :
    T extends React.JSXElementConstructor<infer P> ? P : never;
  
  type ComponentPropsWithoutRef<T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
    T extends React.ForwardRefExoticComponent<infer P> ? P :
    ComponentProps<T>;
  
  // HTML attributes
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    className?: string;
    // Add other common HTML attributes as needed
  }
  
  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: 'button' | 'submit' | 'reset';
    // Add other button-specific attributes as needed
  }
  
  // Forward ref
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>;
} 