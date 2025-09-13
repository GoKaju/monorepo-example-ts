import { APIGatewayProxyEventV2 } from 'aws-lambda'

// app example-service
console.log('[apps/example-service] módulo creado')

export const handler = async (event: APIGatewayProxyEventV2) => {
  const name = event.queryStringParameters?.name || 'World'

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello ${name} from Example Service! 🚀🚀🚀`,
    }),
  }
}
