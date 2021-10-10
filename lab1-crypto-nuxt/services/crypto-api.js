import { Http } from '@/plugins/axios';

/**
 *
 * @param {Object} payload
 * @returns {*}
 */
export function transcodeApiEndpoint(payload) {
  return Http.post('/transcode', payload)
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
}
