#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { ExampleStack } from './stacks/example-stack'
import { AuthStack } from './stacks/auth-stack'
import { ApiStack } from './stacks/api-stack'

const app = new cdk.App()

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
  envName: process.env.ENV_NAME || 'dev',
}

const removalPolicy =
  env.envName === 'dev' ? cdk.RemovalPolicy.DESTROY : cdk.RemovalPolicy.RETAIN

// Add common tags for cost traceability
cdk.Tags.of(app).add('Project', 'PayslipsGenerator')
cdk.Tags.of(app).add('Environment', env.envName)

const authStack = new AuthStack(app, 'AuthStack', {
  env,
  removalPolicy,
  frontUrl: 'http://localhost:5173',
})

const apiStack = new ApiStack(app, 'ApiStack', {
  env,
  originDomains: [
    'http://localhost:3000',
    'http://localhost:5173', // vite
    // 'https://frontend.example.com',
  ],
  userPool: authStack.userPool,
})

new ExampleStack(app, 'ExampleStack', {
  env,
  api: apiStack.api,
})
