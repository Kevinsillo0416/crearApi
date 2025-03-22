import express, {Router} from "express";
import conexion from "../db.js"; //Conexion MySQL
import json from "body-parser/lib/types/json.js";
import { sumar,restar,multiplicar,data } from "../module/librerias.js"

export const router = express.Router();

router.get('/',(req,res)=> {

    res.send("Se cargo la pagina");
});


//obtener todos los alumnos
router.get("/alumnos", (req,res) => {
    conexion.query("SELECT * FROM alumnos", (err,resultados)=> {
        if (err) {
            res.status(500).json({ error: "Error en la base de datos"});
        } else {
            res.json(resultados);
        }
    });
});


//obtener alumnos por id
router.get("/alumnos/:id", (req,res)=> {
    const id = req.params.id;
    conexion.query("SELECT * FROM alumnos WHERE id = ?", [id], (err,resultado) => {
        if (err){
            res.status(500).json({ error: "Error en la base de datos"});
        } else if (resultado.length === 0) {
            res.status(404).json({ error: "Alumno no encontrado"});
        } else {
            res.json(resultado[0]);
        }
    });
});

//agregar un nuevo alumno
router.post("/alumnos", (req, res) => {
    const { nombre, domicilio, edad, sexo } = req.body;
    const sql = "INSERT INTO alumnos (nombre, domicilio, edad, sexo) VALUES (?, ?, ?, ?)";
    conexion.query(sql, [nombre, domicilio, edad, sexo], (err, resultado) => {
      if (err) {
        res.status(500).json({ error: "Error al insertar en la base de datos" });
      } else {
        res.status(201).json({ id: resultado.insertId, nombre, domicilio, edad, sexo });
      }
    });
  });


// Eliminar un alumno
router.delete("/alumnos/:id", (req, res) => {
    const id = req.params.id;
    conexion.query("DELETE FROM alumnos WHERE id = ?", [id], (err, resultado) => {
      if (err) {
        res.status(500).json({ error: "Error en la base de datos" });
      } else if (resultado.affectedRows === 0) {
        res.status(404).json({ error: "Alumno no encontrado" });
      } else {
        res.json({ mensaje: "Alumno eliminado" });
      }
    });
  }); 

router.get('/1', (req,res)=> {
    res.send("Las sumas " + sumar(10,3))
})

router.get('/2',(req,res)=> {
    res.send('El alumno es ' + data.nombre)
})

export default router;


