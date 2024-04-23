# API_SISTEMA_BIBLIOTECA
Api de revisão sobre express e bcrypt  da grow

1. criar o package.json 

npm init -y 

2. Instalar as dependencias de desenvolvimento 

npm i -D nodemon sucrase 

3. Criar na raiz o gitignore e colocar a node_modules 

4. Criar o arquivo nodemon.json com as configurações base 

{
    "execMap": {
            "js": "node -r sucrase/register"
    }
}
    

5. Criar a pasta src onde colocaremos nossas configurações de servidor e dentro dela fazer o arquivo com extenção javascript


6. Criar o script de dev para startar a aplicação automaticamente 
   "dev": "nodemon ./src/index.js"

7. Instalar o express e cors para fazer as apis 

npm i express cors

8. Fazer as configurações iniciais de express 

import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.listen(3333,()=> console.log('Servidor rodando na porta 3333'))

9. Rodar o servidor e verificar se está rodando 

npm run dev

10. Caso o servidor esteja rodando, criar os seus endpoints e após esse passo e criar os endpoints, testá-los no postman

11. Ao finalizar os endpoints , fazer o deploy no render 

12. Atualizar o link do postman com o do deploy no render 