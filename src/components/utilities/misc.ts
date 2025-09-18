/**
 * Assorted utilities
 */

// Join class names considering condition
export const Clsss = (...classes: (string | boolean)[]) =>
  classes.filter(Boolean)?.join(' ')
