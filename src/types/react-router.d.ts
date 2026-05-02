import 'react-router';

declare module 'react-router' {
  interface RouteHandle {
    /** Shown in the shell header for this route */
    title?: string
  }
}
