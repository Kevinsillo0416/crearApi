import mysql from "mysql2"

// configurar la conexion 

const conexion = mysql.createConnection({
    host : "13.216.6.217",
    user : "root",
    password : "1234",
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