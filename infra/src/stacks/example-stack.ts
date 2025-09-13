import * as cdk from 'aws-cdk-lib'
import {
  HttpApi,
  HttpMethod,
  HttpNoneAuthorizer,
} from 'aws-cdk-lib/aws-apigatewayv2'
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'
import path from 'path'

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
        'TestLambdaIntegration',
        new NodejsFunction(this, 'HelloFn', {
          runtime: Runtime.NODEJS_22_X,
          handler: 'index.handler',
          entry: path.join(
            __dirname,
            '../../../apps/example-service/src/index.ts'
          ),
        })
      ),
    })
  }
}
