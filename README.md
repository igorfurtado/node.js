
# Estudos node.js

Este repositório contém arquivos desenvolvidos durante o módulo introdutório de node.js do curso do Programador Br. Foram desenvolvidos um servidor local http e um sistema para redimensionamento e compactação de imagens. 

## Installation

Para o desenvolvimento do redimensionador e compactador de imagens, foram utilizados dois pacotes externos, que devem ser instalados da seguinte forma:

```bash
  npm install sharp
  npm install compress-images --save-dev
```
Além dos pacotes externos que podem ser encontrados em https://www.npmjs.com/package/libraries, é necessária a instalação local do "package.json" contido neste repositório.

OBS: é também necessária a instalação de dois pacotes externos para correções de eventuais erros durante a compactação de arquivos gif ou png:
```bash
npm install gifsicle@5.2.1 --save
npm install pngquant-bin@3.1.1 --save
```
-------------------------

Para o desenvolvimento do servidor http local, é necessário baixar uma dependência:

```bash
  npm install url-parse
  
```
## License

[MIT](https://choosealicense.com/licenses/mit/)


## Tech Stack

**Client:** HTML, Js;

**Server:** Node.

