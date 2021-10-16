import { Http } from '@/plugins/axios';

/**
 * Gaming endpoint.
 *
 * @param {Object} payload - Requested payload.
 * @returns {*}
 */
export function transcodeApiEndpoint(payload) {
  return Http.post('/transcode', payload)
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
}

/**
 * Feistel endpoint to encode/decode data.
 *
 * @param {string} pattern - encode or decode.
 * @param {Object} payload - Requested payload.
 * @returns {*}
 */
export function feistelEndpoint(pattern, payload) {
  return Http.post(`/feistel/${pattern}/round`, payload)
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
}
