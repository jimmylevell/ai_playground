import { unstable_getServerSession } from 'next-auth/next'
import { IUseCase } from '../../../model/useCase'

import logger from '../../../services/logger'
import deepl from '../../../services/deepl'
import { authOptions } from '../auth/[...nextauth]'
import openAI from '../../../services/openAI'

const useCaseExecuter = {
  "openai": openAI,
  "deepl": deepl
}

/**
 * @swagger
 * /api/usecase:
 *   post:
 *     description: Execute a use case
 *     responses:
 *       200:
 *         description: JSON object with the result of the use case
 */
const handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions)
  const email = session?.user?.email

  if (!email)
    return res.status(401).json({ response: 'error', message: 'Not signed in' })

  const post = async (usecaseData: IUseCase) => {
    if (usecaseData) {
      try {
        const exec = useCaseExecuter[usecaseData.service.executer]
        const response = await exec(usecaseData.service.api_key, usecaseData.service.bodyField, usecaseData.body)
        logger.info('Use case executed')
        res
          .status(200)
          .json({ response: 'success', output: response })
      } catch (ex) {
        logger.error(ex)
        res.status(500).json({
          response: 'error',
          message: 'General application error',
          output: '',
        })
      }
    } else {
      logger.error('No service body provided')
      res.status(500).json({
        response: 'error',
        message: 'Body not provided',
        output: '',
      })
    }
  }

  switch (req.method) {
    case 'POST':
      await post(req.body)
      break
    default:
      res.status(405).json({ response: 'error', message: 'Method not allowed' })
      break
  }
}

export default handler
