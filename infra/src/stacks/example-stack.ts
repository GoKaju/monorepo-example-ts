import * as cdk from 'aws-cdk-lib'
import {
  HttpApi,
  HttpMethod,
  HttpNoneAuthorizer,
} from 'aws-cdk-lib/aws-apigatewayv2'
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations'
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'

export interface ExampleStackProps extends cdk.StackProps {
  api: HttpApi
}

export class ExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ExampleStackProps) {
    super(scope, id, props)
    // Define your stack resources here

    // add test route
    props.api.addRoutes({
      methods: [HttpMethod.GET],
      path: '/hello',
      authorizer: new HttpNoneAuthorizer(),
      integration: new HttpLambdaIntegration(
        'TestIntegration',
        new Function(this, 'HelloFn', {
          runtime: Runtime.NODEJS_22_X,
          handler: 'index.handler',
          code: Code.fromInline(`
        exports.handler = async (event) => {
          return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Hola desde Lambda 🚀", event }),
          };
        };
      `),
        })
      ),
    })
  }
}
