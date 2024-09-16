const connection = require('../config/db.js');
const dotenv= require('dotenv').config();

async function storeTask(request, response){
    const params = [
        request.body.item,
        request.body.date,
        request.body.hora,
        request.body.qnt,
        request.body.Id_User,
        request.body.Insti,
        'Agendada' 
    ];

    console.log(params);

    const query = 'INSERT INTO agendamentos(item, data_entrega, hora_entrega, qnt, id_doador, id_insti, _status) VALUES (?, ?, ?, ?, ?, ?, ?)';

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error(err);
            return response.status(400).json({
                success: false,
                message: "Ops, deu problema :(",
                data: err
            });
        }

        response.status(201).json({
            success: true,
            message: "Sucesso!",
            data: results
        });
    });
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

async function getTask(request, response) {
    const id_doador = request.params.id; // Captura o ID do colaborador

    const query = 'SELECT * FROM agendamentos WHERE id_doador = ?';

    connection.query(query, [id_doador], (err, results) => {
        if (err) {
            console.error(err);
            return response.status(500).json({
                success: false,
                message: "Erro ao recuperar agendamentos",
                data: err
            });
        }

        if (results.length > 0) {
            response.status(200).json({
                success: true,
                message: "Agendamentos recuperados com sucesso!",
                data: results
            });
        } else {
            response.status(404).json({
                success: false,
                message: "Nenhum agendamento encontrado para este colaborador"
            });
        }
    });
}

async function updateTask(request, response) {
    const id_agendamento = request.params.id_agendamento; 

    console.log(id_agendamento)

    const query = "UPDATE agendamentos SET _status = 'Realizada' WHERE id = ?";

    connection.query(query, [id_agendamento], (err, results) => {
        if (err) {
            console.error(err);
            return response.status(400).json({
                success: false,
                message: "Ops, deu problema :(",
                data: err
            });
        }

        if (results.affectedRows > 0) {
            return response.status(200).json({
                success: true,
                message: "Status atualizado com sucesso!",
                data: results
            });
        } else {
            return response.status(404).json({
                success: false,
                message: "Nenhum agendamento encontrado ou já está no status solicitado.",
                data: results
            });
        }
    });
}

module.exports = {
    storeTask,
    getTask,
    updateTask
}