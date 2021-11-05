const sharp = require('sharp');
const compress_images = require('compress-images');
const fs = require('fs');

let path = process.argv[2]; //Primeiro argumento passado no terminal
let width = Number(process.argv[3]); //Segundo argumento passado no terminal
//no terminal: node app IMG_2078.JPG 500
console.log(path, width);

function resize(inputPath, outputPath, width) {
    sharp(inputPath).resize({ width: width }).toFile(outputPath, (err) => {
        //resize poderia passar altura e largura. No caso passamos apenas a largura.
        //toFile() é o endereço onde a imagem redimensionada será salva.
        if (err) {
            console.log(err);
        }
        else {
            console.log('Imagem redimensionada com sucesso!');
            compress(outputPath, "./compressed/");  //após o redimensionamento da imagem, chamamos a função de compressão (passando a imagem redimensionada e o 
            // caminho para seu salvamento como argumentos.)
        }
    });
};

function compress(pathInput, outputPath) {

    compress_images(pathInput, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        function (error, completed, statistic) {
            console.log("-------------");
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log("-------------");

            //Apagando o arquivo da pasta temp após a compressão.
            fs.unlink(pathInput, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(pathInput, " apagado!");
                }
            })
        }
    );
};

//Chamando a função
resize(path, './temp/output.jpg', width);
//path é o endereço da imagem. Se estiver na mesma pasta que o arquivo js, basta passar o seu nome.

//Correção de erros npm install:
//npm install gifsicle@5.2.1 --save
//npm install pngquant-bin@3.1.1 --save