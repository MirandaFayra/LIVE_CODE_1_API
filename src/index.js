import express from 'express'
import cors from 'cors'


const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3333



//--------------- CRIAR PESSOA BIBLIOTECÁRIA ----------------

/* 
    CRIAR UMA PESSOA BIBLIOTECÁRIA , COM OS SEGUINTES CARACTERISTICAS : 

    - Lista estática chamada  pessoasBibliotecarias
    - Id automatizado chamado registroAutomatizado 
    - Nome deve ser passado durante a requisição 
    - Senha deve ser passado durante a requisição
    - Registro , deve ser um número automatizado 

    ALÉM DISSO, todos os itens devem ser validados separadamente, fornecendo uma resposta para a pessoa usuária. 

*/

let pessoasBibliotecarias = [];
let registroAutomatizado = 1

// http://localhost:3333/bibliotecaria
app.post('/bibliotecaria',(request, response)=>{
    const { nome, senha } = request.body

    if (!nome || nome.trim() === "") {
        return response.status(400).json({ Mensagem: "Favor passar um nome válido"});
    }

    if (!senha || isNaN(senha)) {
        return response.status(400).json({ Mensagem: "Favor passa uma senha válida"})
    }

    let bibliotecaria = {
        registro: registroAutomatizado,
        nome,
        senha
    }
    registroAutomatizado++

    pessoasBibliotecarias.push(bibliotecaria)

    return response.status(200).json({ Mensagem: "Pessoa bibliotecaria criada com sucesso",
        bibliotecaria
    })
})

//--------------- LER PESSOA BIBLIOTECÁRIA ------------------
// http://localhost:3333/bibliotecaria/:registro
app.get('/bibliotecaria/:registro',(request, response)=>{
    const registro = Number(request.params.registro)

    if(!registro){
        return response.status(400).json({ 
            Mensagem: "Favor enviar um número de resgistro para consultar a pessoa bibliotecária" 
        })
    }

    const verificarRegistro = pessoasBibliotecarias.find((pessoa)=> pessoa.registro === registro)

    if(!verificarRegistro){
        return response.status(400).json({ Mensagem: "Registro não encontrado no nosso banco de dados. Verifique se passou um registro válido" })
    }

    if(verificarRegistro){
        let nomeEncontrado = verificarRegistro.nome
        return response.status(200).json({ Mensagem: `A pessoa bibliotecária com esse registro é ${nomeEncontrado}` })
    } else {
        return response.status(500).json({ Mensagem: "Erro interno. Não foi possível realizar a operação " })
    }
})

//--------------- ATUALIZAR PESSOA BIBLIOTECÁRIA ----------------
// http://localhost:3333/bibliotecaria/:registro
app.put('/bibliotecaria/:registro', (request, response) => {
    const registro = Number(request.params.registro);
    const { nome, senha } = request.body;

    if (!registro){
        return response.status(400).json({ Mensagem: "Favor enviar um registro válido" });
    }

    if (!nome || nome.trim() === "") {
        return response.status(400).json({ Mensagem: "Favor passar um nome válido" });
    }

    if (!senha || isNaN(senha)) {
        return response.status(400).json({ Mensagem: "Favor passar uma senha válida" });
    }

    const encontrarIndex = pessoasBibliotecarias.findIndex(bibliotecaria => bibliotecaria.registro === registro);

    if (encontrarIndex === -1){
        return response.status(400).json({ Mensagem: "Pessoa bibliotecaria não encontrada" });
    }
   
    if (encontrarIndex !== -1) {
        const atualizada = pessoasBibliotecarias[encontrarIndex];

        atualizada.nome = nome;
        atualizada.senha = senha;

        return response.status(200).json({ Mensagem: "Pessoa bibliotecaria atualizada com sucesso",
            atualizada
        });
    }
});



//--------------- DELETAR PESSOA BIBLIOTECÁRIA ----------------
// http://localhost:3333/bibliotecaria/:registro
app.delete('/bibliotecaria/:registro',(request, response)=>{
    const registro = Number(request.params.registro)

    const verificarPorRegistro = pessoasBibliotecarias.findIndex((numeroRegistro)=> numeroRegistro.registro === registro)

    if(verificarPorRegistro === -1){
        return response
        .status(400)
        .json({ Mensagem: "Número de registro não encontrado" })
    }

    if(verificarPorRegistro !== -1){
        pessoasBibliotecarias.splice(verificarPorRegistro, 1)

        return response.status(200).json({ Mensagem: `Pessoa bibliotecária deletada com sucesso!` })

    }

})

//--------------- VERIFICAR SERVIDOR ----------------


app.listen(PORT,()=> console.log('Servidor rodando na porta 3333'))