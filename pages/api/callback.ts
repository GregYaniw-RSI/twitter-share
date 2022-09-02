// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie';

import TwitterApi from 'twitter-api-v2';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { oauth_token, oauth_verifier } = req.query;

  const cookies = cookie.parse(req.headers.cookie || '');
  const cookieContent = JSON.parse(cookies.tweet_details);

  if (!oauth_token || !oauth_verifier) {
    return res.status(400).send('You denied the app or your session expired!');
  }

  const clientOptions = {
    appKey: process.env.TWITTER_CONSUMER_KEY,
    appSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: oauth_token,
    accessSecret: cookieContent.oauth_token_secret,
  };

  const twitterClient = new TwitterApi(clientOptions as any);

  const resp = await fetch(cookieContent.url);
  const arrayBuffer = await resp.arrayBuffer();
  const byteBuffer = Buffer.from(arrayBuffer);

  try {
    const { client, userId } = await twitterClient.login(oauth_verifier as string);

    const mediaId = await client.v1.uploadMedia(byteBuffer, {
      type: 'pngfail',
      mimeType: 'image/pngfail',
    });
    const test = await client.v1.tweet(cookieContent.text, 'x213', {
      media_ids: mediaId,
    });

    console.log('test123', test);
  } catch (error) {
    console.log(error);

    res.status(401).json({
      status: 'FAILURE'
    });

    return;
  }

  res.status(200).json({
    oauthToken: req.query.oauth_token,
    oauthVerifier: req.query.oauth_verifier,
    accessToken: oauth_token,
    accessSecret: cookieContent.oauth_token_secret,
  });
}