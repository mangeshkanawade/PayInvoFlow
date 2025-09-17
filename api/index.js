import { createRequestHandler } from '@vercel/node'; // Not needed—use direct import

// Dynamically import the built Angular SSR app (adjust <project-name> to match your dist folder)
let app;
async function bootstrap() {
    if (!app) {
        const { app: angularApp } = await import('../distpayinvoflow/server/server.mjs');
        app = angularApp;
    }
    return app;
}

// Vercel handler: Await bootstrap and pass req/res
export default createRequestHandler({
    async createApp() {
        return await bootstrap();
    },
});