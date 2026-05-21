// Build paths that respect the configured `base` (e.g. "/z4go").
// Use this for every internal <a href> and asset reference.
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function url(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${clean}`;
}
