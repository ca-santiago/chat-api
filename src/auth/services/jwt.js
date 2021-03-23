const jwt = require("jsonwebtoken");

const _secret1 = '28B2D447F95417849BB8ECC65733B977E2F10F9DD245861FA0F8867D7B2F9986';
const _secret2 = 'b9KwpREab2jsCPRFM7TWG31JWplWLZ4YhBu6WuVuQiJppO0lcm8QSSGi9YZURO7';

/**
 * Create a ephimeral access token.
 */
function createAccessToken(payload) {
  const token = jwt.sign(payload, _secret1, { expiresIn: '1m' });
  return token;
}

/**
 * Create a long live token used for refreshing access
 */
function createRefreshToken(payload) {
  const token = jwt.sign(payload, _secret2, { expiresIn: '15d' });
  return token;
}

function decodeToken(token) {
  try {
    const payload = jwt.verify(token, _secret1);
    if (!payload)
      return null;
    return payload;
  } catch (err) {
    return null;
  }
}

function decodeRefreshToken(token) {
  try {
    const payload = jwt.verify(token, _secret2);
    if (!payload)
      return null;
    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Create token and refresh token based on the individual methods
 */
async function createAuthTokens(payload = {}) {
  const token = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  return { token, refreshToken }
}

/**
 * Verify the authenticity of each token an return valid ones
 * if both are invalid, just return left.
 */
function processTokens({ token, refreshToken }) {

  // Verifying acces token authenticity
  // if is valid, just return right otherwise verify refreshToken
  const res = decodeToken(token);
  if (res)
    return {
      token, refreshToken, refreshed: false,
      accountId: res.accountId
    }

  // Verifying refresh token authenticity
  // if is invalid return left otherwise continue to generate new tokens
  const refreshResult = decodeRefreshToken(refreshToken);
  if (!refreshResult) return null;

  // Creating new tokens
  const newToken = createAccessToken({ accountId: refreshResult.accountId });
  const newRefToken = createRefreshToken({ accountId: refreshResult.accountId });

  return {
    token: newToken, refreshToken: newRefToken, refreshed: true,
    accountId: refreshResult.accountId
  };
}

module.exports = {
  processTokens, createAuthTokens,
  decodeToken,
  decodeRefreshToken
}