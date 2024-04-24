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
let pessoasBibliotecarias = []
let registroAutomatizado = 1
app.post('/bibliotecaria',(request, response)=>{
    const {nome, senha} = request.body

    if(!nome){
        response.status(400).send(JSON.stringify({Mensagem: 'Favor informar um nome válido!'}))
    }
    if(!senha){
        response.status(400).send(JSON.stringify({Mensagem: 'Favor informar uma senha válida!'}))
    }

    let novaPessoa = {id:registroAutomatizado, nome:nome, senha:senha}

    pessoasBibliotecarias.push(novaPessoa)
    registroAutomatizado++

    response.status(201).send(JSON.stringify({Mensagem: 'Pessoa bibliotecária registrada com sucesso!'}))
})

//--------------- LER PESSOA BIBLIOTECÁRIA ------------------

app.get('/bibliotecaria/:registro',(request, response)=>{
    const registro = Number(request.params.registro)

    if(!registro){
        response.status(400).send(JSON.stringify({ Mensagem: "Favor enviar um número de resgistro para consultar a pessoa bibliotecária" }))
    }

    const verificarRegistro = pessoasBibliotecarias.find((pessoa)=> pessoa.registro === registro)

    if(!verificarRegistro){
        response.status(400).send(JSON.stringify({ Mensagem: "Registro não encontrado no nosso banco de dados. Verifique se passou um registro válido" }))
    }

    if(verificarRegistro){
        let nomeEncontrado = verificarRegistro.nome
        response.status(200).send(JSON.stringify({ Mensagem: `A pessoa bibliotecária com esse registro é ${nomeEncontrado}` }))
    }else{
        response.status(500).send(JSON.stringify({ Mensagem: "Erro interno. Não foi possível realizar a operação " }))
    }
})





//--------------- DELETAR PESSOA BIBLIOTECÁRIA ----------------

app.delete('/bibliotecaria/:registro',(request, response)=>{
    const registro = Number(request.params.registro)

    const verificarPorRegistro = pessoasBibliotecarias.findIndex((numeroRegistro)=> numeroRegistro.registro === registro)

    if(verificarPorRegistro === -1){
        response
        .status(400)
        .send(JSON.stringify({ Mensagem: "Número de registro não encontrado" }))
    }

    if(verificarPorRegistro !== -1){
        pessoasBibliotecarias.splice(verificarPorRegistro, 1)

        response.status(200).send(JSON.stringify({ Mensagem: `Pessoa bibliotecária deletada com sucesso!` }))

    }

})

//--------------- VERIFICAR SERVIDOR ----------------


app.listen(PORT,()=> console.log('Servidor rodando na porta 3333'))