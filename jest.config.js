module.exports = {
  bail: true, //Se um teste falhar ele para de executar o restante dos testes, se estiver como false como vem por padrão e um teste falhar, ele continua para os outros testes.

  coverageProvider: "v8", //

  testMatch: [ //Passamos um vetor[] para dizer qual o padrão dos arquivos de testes
    "<rootDir>/src/**/*.spec.js" 
    //rootDir = diretório atual, ** ou * = qualquer pasta ou nome
    //Desde que, o arquivo ou nome tenha o ".spec.js"
    //Isso melhora pq a hora que for executar os testes ele nao vai ler tudo e sim apenas os arquivos com .spec.js
  ],
};