import { CfnOutput, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'

import {
  UserPool,
  UserPoolClient,
  AccountRecovery,
  StringAttribute,
  UserPoolEmail,
  OAuthScope,
  ManagedLoginVersion,
  CfnManagedLoginBranding,
  UserPoolClientIdentityProvider,
} from 'aws-cdk-lib/aws-cognito'

export interface AuthStackProps extends StackProps {
  // Optionally pass props like environment, etc.
  removalPolicy: RemovalPolicy
  frontUrl: string
}

export class AuthStack extends Stack {
  public readonly userPool: UserPool
  public readonly userPoolClient: UserPoolClient

  constructor(scope: Construct, id: string, props: AuthStackProps) {
    super(scope, id, props)

    // Cognito User Pool
    this.userPool = new UserPool(this, 'UserPool', {
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      accountRecovery: AccountRecovery.EMAIL_ONLY,
      autoVerify: { email: true },
      userVerification: {
        emailBody: 'Your verification code is {####}',
        emailSubject: 'Verify your email for Payslips Generator',
        smsMessage: 'Your verification code is {####}',
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: false,
        },
        fullname: {
          required: false,
          mutable: true,
        },
      },
      customAttributes: {
        // Add custom attributes if needed
        // e.g., 'role': new StringAttribute({ mutable: true }),
        role: new StringAttribute({ mutable: true }),
        apps: new StringAttribute({ mutable: true }),
      },
      deviceTracking: {
        challengeRequiredOnNewDevice: true,
        deviceOnlyRememberedOnUserPrompt: true,
      },
      email: UserPoolEmail.withCognito(), // Using Cognito's built-in email functionality for simplicity (not for production) -- use SES in production

      removalPolicy: props?.removalPolicy, // NOT recommended for production code
    })

    // 3. Crear App Client (User Pool Client)
    this.userPoolClient = this.userPool.addClient('AppClient', {
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: [OAuthScope.EMAIL, OAuthScope.OPENID],
        callbackUrls: [`${props?.frontUrl}/callback`],
        logoutUrls: [`${props?.frontUrl}/logout`],
      },
      supportedIdentityProviders: [
        UserPoolClientIdentityProvider.COGNITO,
        UserPoolClientIdentityProvider.GOOGLE,
      ],
    })

    // add managed login
    // 2. Crear un dominio (requerido para Hosted UI)
    const domain = this.userPool.addDomain('CognitoDomain', {
      cognitoDomain: {
        domainPrefix: 'mi-example-app-9662', // Debe ser único a nivel global - solo para pruebas
      },
      managedLoginVersion: ManagedLoginVersion.NEWER_MANAGED_LOGIN,
    })

    new CfnManagedLoginBranding(this, 'ManagedLoginBranding', {
      userPoolId: this.userPool.userPoolId,
      clientId: this.userPoolClient.userPoolClientId,
      useCognitoProvidedValues: true,

      // OJO: no incluyas `settings` ni `assets` si activas esta bandera
    })

    new CfnOutput(this, 'HostedUILoginURL', {
      value:
        domain.baseUrl() +
        '/login?client_id=' +
        this.userPoolClient.userPoolClientId +
        `&response_type=code&scope=email+openid&redirect_uri=${props?.frontUrl}/callback`,
    })
  }
}
