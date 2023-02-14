import { withSwagger } from 'next-swagger-doc'

const swaggerHandler = withSwagger({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Playground Swagger',
      version: '1.0.0',
    },
  },
  apiFolder: 'pages/api',
})

export default swaggerHandler()
