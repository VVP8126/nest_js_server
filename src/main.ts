import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./app.module";

async function start() {
    const PORT = process.env.PORT || 5000;
    const application = await NestFactory.create(ApplicationModule);
    await application.listen(
        PORT,
        () => {
            console.log(`Server started on PORT:${PORT}`);
        }
    );
}

start();
