const io = require('./io/io');

const writer = new io.StringWriter();

writer
    .write('Iko')
    .write('ti')
    .write('si')
    .write('baraba');

console.log(writer.toString());

