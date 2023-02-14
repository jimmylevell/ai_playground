import { unstable_getServerSession } from 'next-auth/next'

import {
  Service,
  updateService,
  deleteService,
  IService
} from '../../../model/Service'
import logger from '../../../services/logger'
import { authOptions } from '../auth/[...nextauth]'

/**
 * @swagger
 * /api/service/{id}:
 *   put:
 *     description: Updates the service with the given id
 *     responses:
 *       200:
 *         description: JSON object with the updated service
 */
const handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions)
  const email = session?.user?.email

  if (!email)
    return res.status(401).json({ response: 'error', message: 'Not signed in' })

  const put = async (service: IService) => {
    if (service) {
      try {
        const new_service = await updateService(service)
        logger.info('Service updated')
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
      logger.error('Service body not provided')
      res.status(500).json({
        response: 'error',
        message: 'Body not provided',
        service: '',
      })
    }
  }

  const delete_method = async (id: string) => {
    if (id) {
      try {
        const new_service = await deleteService(id)
        logger.info('Service removed')
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
      logger.error('Service id not provided')
      res
        .status(500)
        .json({ response: 'error', message: 'ID not provided', service: '' })
    }
  }

  switch (req.method) {
    case 'PUT':
      await put(req.body.service)
      break
    case 'DELETE':
      const { pid } = req.query
      await delete_method(pid)
      break
    default:
      res.status(405).json({ response: 'error', message: 'Method not allowed' })
      break
  }
}

export default handler
