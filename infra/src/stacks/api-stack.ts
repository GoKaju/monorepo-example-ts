import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'

import {
  HttpApi,
  CorsHttpMethod,
  CorsPreflightOptions,
} from 'aws-cdk-lib/aws-apigatewayv2'
import { HttpUserPoolAuthorizer } from 'aws-cdk-lib/aws-apigatewayv2-authorizers'
import { UserPool } from 'aws-cdk-lib/aws-cognito'

export interface ApiStackProps extends StackProps {
  // Optionally pass props like environment, etc.
  originDomains: string[]
  userPool: UserPool
}

export class ApiStack extends Stack {
  public readonly api: HttpApi

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props)

    // HTTP API (v2)

    const corsOptions: CorsPreflightOptions = {
      allowOrigins: props?.originDomains || ['*'],
      allowMethods: [
        CorsHttpMethod.GET,
        CorsHttpMethod.POST,
        CorsHttpMethod.PUT,
        CorsHttpMethod.DELETE,
        CorsHttpMethod.OPTIONS,
      ],
      allowCredentials: true,
    }

    const authorizer = new HttpUserPoolAuthorizer(
      'HttpAuthorizer',
      props.userPool
    )
    this.api = new HttpApi(this, 'HttpApiGateway', {
      apiName: 'PayslipsHttpApi',
      description: 'HTTP API Gateway for Payslips Generator',
      corsPreflight: corsOptions,
      createDefaultStage: true,
      defaultAuthorizer: authorizer,
      disableExecuteApiEndpoint: false,
    })
  }
}
