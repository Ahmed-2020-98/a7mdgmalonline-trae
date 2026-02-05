export function getApiBaseUrl() {
  return process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
}

export function buildApiUrl(path: string) {
  const base = getApiBaseUrl();
  if (!base) {
    return path;
  }
  return `${base}${path}`;
}

export function getClientApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
}

export function buildClientApiUrl(path: string) {
  const base = getClientApiBaseUrl();
  if (!base) {
    return path;
  }
  return `${base}${path}`;
}
