//Criando um servidor

const http = require('http'); //método original do node
var parse = require('url-parse'); //URL module splits up a web address into readable parts;
//url.parse() method (descontinuado, substituído pela importação do módulo url-parse)-> will return a URL object with each part of the address as properties;
const fs = require('fs');

function handleFile(req, res, callback) {

    //request.url contém a url da requisição. Poderia estar dentro de uma variável.
    let path = parse(req.url).pathname; // pathname é um objeto de url;
    if (path == "" || path == "/") {
        path = "/index.html";
    };
    //Endereço do arquivo path:
    let fileName = "." + path; //concatenação do ponto com o path para informar que está na mesma pasta

    //Abrindo o arquivo:
    fs.readFile(fileName, (err, data) => {
        if (err) {
            if (callback) {
                if (!callback(req, res)) { //se o callback for falso
                    //cabeçalho -> diz ao navegador como interpretar o dado passado.
                    //código de status de requisição é o primeiro argumento passado dentro de writeHead;
                    res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" }); //text/plain é texto puro; text/html é texto html.
                    res.end("<h1>Página não encontrada.</h1>");
                };
            }
        }
        else { //sucesso
            res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
            res.write(data); //dados que estão no arquivo.
            res.end(); //encerra a requisição;
        };
    });
};

function handleRequest(req, res) {
    //Tratando tudo que não for leitura de arquivos:
    let path = parse(req.url).pathname;

    let method = req.method; //Método de request que estamos utilizando.
    console.log(method);
    if (method == 'PUT') {
        res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
    }

    if (path == "/teste") {
        res.end("Teste");
        return true; //finaliza a função, para garantir que o código não vai continuar lendo as linhas abaixo.
    }
    return false;
}

//recebe uma função com dois parâmetros: requisição e resposta;
http.createServer((request, response) => {

    handleFile(request, response, handleRequest);

}).listen(3000, (err) => {
    if (err) { console.log(err); }
    else {
        console.log("Servidor rodando na porta 3000.");
    }
});

//Também poderíamos passar um objeto json dentro do createServer
// response.writeHead(200, { 'Content-Type': 'application/json' });
// response.end(JSON.stringify({ texto: '<h1>Hello World</h1>' }));