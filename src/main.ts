import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('MF API')
    .setDescription('The MF API description')
    .setVersion('0.3.0')
    .addBearerAuth({
      type: 'http', 
      scheme: 'bearer', 
      bearerFormat: 'JWT',
      description: 'Enter JWT token'
    },
      'access_token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
