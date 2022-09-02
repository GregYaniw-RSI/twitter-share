// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import TwitterApi from 'twitter-api-v2';
import cookie from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY || '',
    appSecret: process.env.TWITTER_CONSUMER_SECRET || '',
  });

  const {
    url,
    oauth_token_secret
  } = await twitterClient.generateAuthLink(process.env.TWITTER_CALLBACK_URL, { linkMode: 'authorize' });
  const cookieContent = JSON.stringify({ oauth_token_secret: String(oauth_token_secret), text: req.query.text, url: req.query.url });

  res.setHeader('Set-Cookie',
    cookie.serialize('tweet_details', cookieContent, {
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
  );

  return res.redirect(url);
}
