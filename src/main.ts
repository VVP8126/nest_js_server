import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ApplicationModule } from "./app.module";
import { ValidationPipe } from "./pipes/validation.pipe";

async function start() {
    const PORT = process.env.PORT || 5000;
    const application = await NestFactory.create(ApplicationModule);
    
    // Block to create documentation - used library @nestjs/swagger
    const config = new DocumentBuilder()
                    .setTitle("Advanced Nestjs application")
                    .setDescription("Some Application description")
                    .setVersion("version 1.0.0")
                    .addTag("Main operations:")
                    .build();
    const document = SwaggerModule.createDocument(application, config);
    SwaggerModule.setup("/api/docs", application, document);
    // End of block (create documentation)

    // application.useGlobalPipes(new ValidationPipe());  // It's a way to set up global validation pipe to check request of every end-point 

    await application.listen(
        PORT,
        () => {
            console.log(`Server started on PORT:${PORT}`);
        }
    );
}

start();
