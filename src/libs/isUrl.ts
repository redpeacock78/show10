export const isUrl = (url: string): boolean => {
  try {
    if (url.match(/^https?:\/\/[\w!\?\+\-_~=;\.,\*&@#\$%\(\)'\[\]]+/) === null)
      return false;
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
