/**
 * 与えられた文字列が正常なURLかどうかを判別する
 * @param {string} url 与えられた文字列
 * @returns {boolean} 判定結果
 */
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
