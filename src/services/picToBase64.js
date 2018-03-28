/*
 * @Author: weijie
 * @Date:   2018-03-28 21:32:52
 * @Last Modified by:   weijie
 * @Last Modified time: 2018-03-29 05:49:53
 */
/**
 * [getBase64 description]
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
export default function getBase64(url) {
  return getAndEncode(url)
    .then((data) => {
      return dataAsUrl(data, mimeType(url));
    });
}

/**
 * [parseExtension description]
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function parseExtension(url) {
  const match = /\.([^.]*?)$/g.exec(url);
  if (match) {
    return match[1];
  }
  return '';
}
/**
 * [mimes description]
 * @return {[type]} [description]
 */
function mimes() {
  /*
   * Only WOFF and EOT mime types for fonts are 'real'
   * see http://www.iana.org/assignments/media-types/media-types.xhtml
   */
  const WOFF = 'application/font-woff';
  const JPEG = 'image/jpeg';

  return {
    woff: WOFF,
    woff2: WOFF,
    ttf: 'application/font-truetype',
    eot: 'application/vnd.ms-fontobject',
    png: 'image/png',
    jpg: JPEG,
    jpeg: JPEG,
    gif: 'image/gif',
    tiff: 'image/tiff',
    svg: 'image/svg+xml',
    mp4: 'video/mp4'
  };
}

/**
 * [mimeType description]
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function mimeType(url) {
  const extension = parseExtension(url).toLowerCase();
  return mimes()[extension] || '';
}

/**
 * [dataAsUrl description]
 * @param  {[type]} content [description]
 * @param  {[type]} type    [description]
 * @return {[type]}         [description]
 */
function dataAsUrl(content, type) {
  return `data:${type};base64,${content}`;
}
/**
 * [getAndEncode description]
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getAndEncode(url) {
  const TIMEOUT = 30000;

  return new Promise((resolve) => {
    const request = new XMLHttpRequest();

    request.onreadystatechange = done;
    request.ontimeout = timeout;
    request.responseType = 'blob';
    request.timeout = TIMEOUT;
    request.open('GET', url, true);
    request.send();

    /**
     * [done description]
     * @return {Function} [description]
     */
    function done() {
      if (request.readyState !== 4) return;

      if (request.status !== 200) {
        fail(`cannot fetch resource: ${url}, status: ${request.status}`);

        return;
      }

      const encoder = new FileReader();
      encoder.onloadend = () => {
        const content = encoder.result.split(/,/)[1];
        resolve(content);
      };
      encoder.readAsDataURL(request.response);
    }

    /**
     * [timeout description]
     * @return {[type]} [description]
     */
    function timeout() {
      fail(`timeout of ${TIMEOUT}ms occured while fetching resource: ${url}`);
    }

    /**
     * [fail description]
     * @param  {[type]} message [description]
     * @return {[type]}         [description]
     */
    function fail(message) {
      resolve('');
    }
  });
}
