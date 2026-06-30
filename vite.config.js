import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'


function basicAuth({user, pass}) {
    return {
        name: "basic-auth",
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                    if (!req.url.startsWith("/admin")) {
                        return next();
                    }
                    const header = req.headers.authorization;
                    if (!header) {
                        wrongAuth(res, "login required")
                        return
                    }
                    const b64 = header.split(' ')[1];
                    const [user_decoded, pass_decoded] = Buffer.from(b64, "base64").toString().split(':');
                    if (user_decoded === user && pass_decoded === pass) {
                        next()
                        return
                    }
                    wrongAuth(res, "Wrong login or password")
                }
            )
        }
    }


}
function wrongAuth(res, message) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin"')
    res.end(message)
}


// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), basicAuth({user: 'admin', pass: '123'})],
    server: {
        port: 3000,
        host: '0.0.0.0'
    }
})
