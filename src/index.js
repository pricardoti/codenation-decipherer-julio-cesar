const express = require('express');
const sha1 = require('sha1');
const axios = require('axios');

const dotenv = require('dotenv');
const FormData = require('form-data');

const FileManager = require('./FileManager');
const decipherer = require('./decipherer').decodePhrase;

const app = express();

app.listen(3333);
dotenv.config();



const execute = async () => {
    const entity = 'answer';
    
    console.log('..:: Reading the .env ::..');

    const API_TOKEN = process.env.API_TOKEN;
    console.log('API_TOKEN:', API_TOKEN);

    // 1. Requisição HTTP para retornar o oconteúdo do JSON e salvando em um arquivo answer.json
    const response = await axios.get(`https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${API_TOKEN}`);
    const data = response.data;

    FileManager.save(entity, data);

    // 2. Decrifrando e gerando o sha1
    data.decifrado = decipherer(data.cifrado, data.numero_casas);
    data.resumo_criptografico = sha1(data.decifrado);

    console.log('..:: Show generated data ::..');
    console.log(data);

    // 3. Atualizando o arquivo
    FileManager.save(entity, data);

    // 4. Realizando envio do conteudo.
    console.log('..:: Enviando os dados... ::..');
    const form = new FormData();
    form.append(entity, FileManager.readStream(entity));

    axios.create({
        headers: form.getHeaders()
    }).post(`https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${API_TOKEN}`, form).then(response => {
        console.log('Response: ', response.data);
        console.log('Envio realizado com sucesso !!!!');
    }).catch(error => {
        if (error.response) {
            console.log(error.response);
        }
        console.log(error.message);
    });
}

execute();