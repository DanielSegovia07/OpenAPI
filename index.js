// SERVIDOR
const express = require('express');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const PORT = process.env.PORT || 3000;
const app = express();

// Ruta principal
app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

// Opciones de configuración para Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Empleados',
            version: '1.0.0',
            description: 'API para la gestión de empleados.',
        },
        servers: [
            { url: "http://localhost:{port}", description: "Servidor local" }
        ],
    },
    apis: [path.join(__dirname, "index.js")], // Archivo donde están las rutas documentadas
};

/**
 * @swagger
 * /empleado:
 *   get:
 *     description: Consultar todos los empleados
 *     responses:
 *       200:
 *         description: Regresa un arreglo de objetos con los empleados.
 */
app.get('/empleado', async (req, res) => {
  // Simulación de respuesta con empleados
    const empleados = [
        { id: 1, nombre: "Juan Pérez", puesto: "Desarrollador" },
        { id: 2, nombre: "Ana López", puesto: "Diseñadora" },
    ];
    res.status(200).json(empleados);
});

/**
 * @swagger
 * /empleado:
 *   post:
 *     description: Alta de Empleados
 *     responses:
 *       200:
 *         description: Regresa un objeto con el resultado de la operacion de alta
 */
app.post('/empleado', (req, res, next) => {
    res.status(200).json({ message: "Operación de alta no implementada." });
});

// Generar la documentación con Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.get("/api-spec",(req,res)=>{
    res.json(swaggerDocs);
})

// Iniciar el servidor

app.listen(PORT, () => {
    console.log(`Servidor express corriendo en puerto ${PORT}`);
    console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
});
