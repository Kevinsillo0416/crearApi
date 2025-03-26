import express, {Router} from "express";
// import conexion from "../db.js"; //Conexion MySQL
import json from "body-parser/lib/types/json.js";
import { alumnos ,sumar,restar,multiplicar } from "../module/librerias.js"

export const router = express.Router();


// Ruta de prueba
router.get('/',(req,res)=> {

    res.send("Se cargo la pagina");
});


//obtener todos los alumnos
router.get("/alumnos", (req,res) => {
  res.json(alumnos);
    });



//obtener alumnos por nombre
router.get("/alumnos/:name", (req, res) => {
  const name = req.params.name;
  const alumno = alumnos.find(a => a.name.toLowerCase() === name.toLowerCase());
  if (!alumno) return res.status(404).json({ error: "Alumno no encontrado" });
  res.json(alumno);
});





// ----------------------------------------------------------------------------------------------------------
// peticiones mysql
//agregar un nuevo alumno
router.post("/alumnos", (req, res) => {
    const { name, domicilio, edad, sexo } = req.body;
    const sql = "INSERT INTO alumnos (name, domicilio, edad, sexo) VALUES (?, ?, ?, ?)";
    conexion.query(sql, [name, domicilio, edad, sexo], (err, resultado) => {
      if (err) {
        res.status(500).json({ error: "Error al insertar en la base de datos" });
      } else {
        res.status(201).json({ id: resultado.insertId, name, domicilio, edad, sexo });
      }
    });
  });


// Eliminar un alumno
router.delete("/alumnos/:id", (req, res) => {
    const id = req.params.id;
    conexion.query("DELETE FROM alumnos WHERE idUser = ?", [id], (err, resultado) => {
      if (err) {
        res.status(500).json({ error: "Error en la base de datos" });
      } else if (resultado.affectedRows === 0) {
        res.status(404).json({ error: "Alumno no encontrado" });
      } else {
        res.json({ mensaje: "Alumno eliminado" });
      }
    });
  }); 


// Actualizar un alumno
router.patch("/alumnos/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  // Generar la consulta SQL dinámicamente
  const fields = Object.keys(updates).map(field => `${field} = ?`).join(", ");
  const values = Object.values(updates);

  if (fields.length === 0) {
      return res.status(400).json({ error: "No se proporcionaron campos para actualizar" });
  }

  const sql = `UPDATE alumnos SET ${fields} WHERE idUser = ?`;
  conexion.query(sql, [...values, id], (err, resultado) => {
      if (err) {
          res.status(500).json({ error: "Error en la base de datos" });
      } else if (resultado.affectedRows === 0) {
          res.status(404).json({ error: "Alumno no encontrado" });
      } else {
          res.json({ mensaje: "Alumno actualizado correctamente" });
      }
  });
});  

// router.get('/1', (req,res)=> {
//     res.send("Las sumas " + sumar(10,3))
// })

// router.get('/2',(req,res)=> {
//     res.send('El alumno es ' + data.name)
// })

export default router;
  

