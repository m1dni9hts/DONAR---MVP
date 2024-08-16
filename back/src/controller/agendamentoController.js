const connection = require('../config/db.js');
const dotenv= require('dotenv').config();

async function storeTask(request, response){
    const params = Array(
        request.body.item,
        request.body.date,
        request.body.hora,
        request.body.qnt,
        request.body.Id_User,
        // request.body.Id_Insti

    );

    console.log(params)

    const query = 'INSERT INTO agendamentos(item, data_entrega, hora_entrega, qnt, id_doador) VALUES (?, ?, ?, ?, ?)';

    connection.query(query, params, (err, results) => {
        console.log(err)
        if (results) {
            response 
                .status(201)
                .json({
                    success: true,
                    massage: "Sucesso!",
                    data: results
                })
        }else{
            response
                .status(400)
                .json({
                    success: false,
                    message: "Ops, deu problema :(",
                    data: err
                })
        }
    })
}

// async function getID (request, response) {
     
//     const params = Array(
//         req.body.email
//     )
//     console.log("email p/ cadastro:", req.body.email)

//     const query = "id, tipo_usuario FROM cadastro_usuario WHERE email = ?";
//     // const query = "SELECT email, senha, FROM cadastro_usuario WHERE email = ?";

//     connection.query(query, params, (err, results) => {
//         console.log(err, results)
//         if(results.length > 0) {
//             let senhaForms = req.body.senha
//             let senhaDb = results[0].senha

//             if (senhaDb === senhaForms)
//                 console.log('Senha Correta!')   
//                 res
//                     .status(200)
//                     .json({
//                         success: true,
//                         message: "Login feito com Sucesso",
//                         data: results[0]
//                 });        
//             } else {
//                 res
//                     .status(400)
//                     .json({
//                         success: false,
//                         message: "Verifique sua Senha",
//                         data: results
//                 });  
//         }
//     });
    
// }

async function getTask(request, response){

    const params = Array(
        // request.body.Id_User,
        // // request.body.Id_Insti
        request.body.id
    );

     console.log(params)

    // A PÁGINA AGENDAMENTOS.HTML SÓ APARECE PARA COLABORADORES, PORTANTO,
    // A  DO ID QUE VIRA PARA PROCURAR NO BANCO SERÁ APENAS DE COLABORADORES

    const query = 'SELECT * from agendamentos WHERE id = ?';

    connection.query(query, params, (err, results) => {
        console.log(err)
        if (results) {
            response.status(201).json({
                    success: true,
                    massage: "Sucesso!",
                    data: results
                })
        }else{
            response.status(400).json({
                    success: false,
                    message: "Ops, deu problema :(",
                    data: err
            })
        }
    })
}

module.exports = {
    storeTask,
    getTask 
}