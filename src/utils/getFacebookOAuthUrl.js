const { FB_OAUTH_REDIRECT_URI = '', FB_CLIENT_ID = '' } = process.env;

const getFacebookOAuthUrl = () => {
  const rootUrl = 'https://www.facebook.com/v16.0/dialog/oauth';
  const options = {
    redirect_uri: FB_OAUTH_REDIRECT_URI,
    client_id: FB_CLIENT_ID,
    scope: 'public_profile,email',
  };
  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};

module.exports = getFacebookOAuthUrl;
