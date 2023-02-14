import fetch from 'node-fetch';
import logger from './logger';

export default async function translate(authKey: string, bodyField: string, bodyContent: string) {
  const body = 'auth_key=' + authKey + '&' + bodyField + '=' + bodyContent + '&target_lang=EN&source_lang=DE'

  logger.info("Translating text from DE to EN");

  let response = await fetch("https://api-free.deepl.com/v2/translate", {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': body.length
    },
    method: 'POST',
    body: body
  })
  response = await response.json()
  logger.info("Translation successful");

  return response.translations[0].text;
};
