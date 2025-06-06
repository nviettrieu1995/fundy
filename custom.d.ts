// custom.d.ts
/// <reference types="react" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'agent-id': string;
        'voice-id'?: string; // voice-id is optional
      }, HTMLElement>;
    }
  }
}

// This export {} is to ensure this file is treated as a module by TypeScript.
// This is important for `declare global` to correctly augment the global scope.
export {};