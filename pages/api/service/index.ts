import { unstable_getServerSession } from 'next-auth/next'

import {
  getServices,
  createService,
  IService
} from '../../../model/Service'
import logger from '../../../services/logger'
import { authOptions } from '../auth/[...nextauth]'

/**
 * @swagger
 * /api/service:
 *   get:
 *     description: Returns all services
 *     responses:
 *       200:
 *         description: JSON object with all services
 *   post:
 *     description: Creates a new service
 *     responses:
 *       200:
 *         description: JSON object with the new service
 */
const handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions)
  const email = session?.user?.email

  if (!email)
    return res.status(401).json({ response: 'error', message: 'Not signed in' })

  const get = async () => {
    try {
      const services = await getServices()
      logger.info('Services retrieved')
      res.status(200).json({ response: 'success', services: services })
    } catch (ex) {
      logger.error(ex)
      res.status(500).json({ response: 'error', services: '' })
    }
  }

  const post = async (service: IService) => {
    if (service) {
      try {
        const new_service = await createService(service)
        logger.info('Service created')
        res
          .status(200)
          .json({ response: 'success', service: new_service })
      } catch (ex) {
        logger.error(ex)
        res.status(500).json({
          response: 'error',
          message: 'General application error',
          service: '',
        })
      }
    } else {
      logger.error('No service body provided')
      res.status(500).json({
        response: 'error',
        message: 'Body not provided',
        service: '',
      })
    }
  }

  switch (req.method) {
    case 'GET':
      await get()
      break
    case 'POST':
      await post(req.body.service)
      break
    default:
      res.status(405).json({ response: 'error', message: 'Method not allowed' })
      break
  }
}

export default handler
