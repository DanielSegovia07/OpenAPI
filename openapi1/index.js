/**
 * @swagger
 * tags:
 *   - name: usuario
 *     description: Catálogo de usuarios
 *   - name: empleado
 *     description: Operaciones relacionadas con empleados
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Empleado:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del empleado
 *           example: 1
 *         nombre:
 *           type: string
 *           description: Nombre del empleado
 *           example: Juan Pérez
 *         puesto:
 *           type: string
 *           description: Puesto del empleado
 *           example: Desarrollador
 *     RespuestaAlta:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensaje del resultado de la operación
 *           example: Operación de alta no implementada.
 */

/**
 * @swagger
 * /usuario:
 *   get:
 *     tags:
 *       - usuario
 *     summary: Obtener Usuarios
 *     description: Devuelve un arreglo de usuarios
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Regresa un arreglo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /empleado:
 *   get:
 *     tags:
 *       - empleado
 *     summary: Consultar todos los empleados
 *     description: Devuelve un arreglo con la información de los empleados
 *     responses:
 *       200:
 *         description: Regresa un arreglo de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empleado'
 *   post:
 *     tags:
 *       - empleado
 *     summary: Alta de Empleados
 *     description: Agrega un nuevo empleado al sistema
 *     responses:
 *       200:
 *         description: Resultado de la operación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaAlta'
 */

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
            title: 'API Empleados Daniel Segovia Espinoza',
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
 * Rutas de empleados
 */
app.get('/empleado', async (req, res) => {
    const empleados = [
        { id: 1, nombre: "Juan Pérez", puesto: "Desarrollador" },
        { id: 2, nombre: "Ana López", puesto: "Diseñadora" },
    ];
    res.status(200).json(empleados);
});

app.post('/empleado', (req, res) => {
    res.status(200).json({ message: "Operación de alta no implementada." });
});

// Generar la documentación con Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.get("/api-spec", (req, res) => {
    res.json(swaggerDocs);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor express corriendo en puerto ${PORT}`);
    console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
});
