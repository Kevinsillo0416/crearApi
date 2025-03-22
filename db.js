import mysql from "mysql2"

// configurar la conexion 

const conexion = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "kevin040416",
    database : "api"
});

//conectar a la base de datos

conexion.connect((err) => {
    if (err){
        console.error("Error al conectar a la base de datos", err);
        return;
    }
    console.log("Conectando a la base de datos de MySQL");
});

export default conexion;