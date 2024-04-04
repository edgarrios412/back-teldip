const {User} = require("../db")
const jwt = require("jsonwebtoken")
const { PdfSigner } = require("sign-pdf-lib")
const fs = require("node:fs/promises");

module.exports = {
    firmarDocumento: async (x,y,pagina) => {
        try {
            const info = {
                pageNumber: pagina,
                signature:{
                    name: 'sergioDev',
                    location: 'Medellin',
                    reason: 'Signing Certificate',
                    date: new Date(),
                    contactInfo: 'info@sergiodev.com',
                },
                visual: {
                    background: await fs.readFile('signature.png'),
                    rectangle: { 
                        // IMPORTANTE: si las coordenadas son negativas, se consideran desde la derecha o desde abajo.
                        left: y, 
                        top: x, 
                        right: y+130, 
                        bottom: x+50
                    },
                    // texts: 
                    // [
                    //     {
                    //     lines: [ 
                    //         '', 
                    //         ''
                    //     ]}, 
                    //     {
                    //     lines: [ 
                    //         'Firmado digitalmente por', 
                    //         'JOHN DOE', 
                    //         'Date: 2023.11.03', 
                    //         '20:28:46 +02\'00\''
                    //     ]}
                    // ],
                }
            };
            
            const settings = {
                signatureLength: 4000 - 6,
                rangePlaceHolder: 9999999,
                signatureComputer: {
                    certificate: await fs.readFile('Teldip.p12'),
                    password: 'teldip'
                }
            };
            
            const filePath = 'uploads/pdf-sample.pdf'; 
            const filePathVerify = 'firmado3.pdf';
            
            const pdfSigner = new PdfSigner(settings);
    
    
            const fileBytes = await fs.readFile(filePath);
            // const signedPdf = await pdfSigner.signAsync(fileBytes, info);

            const signedPdf = await pdfSigner.signAsync(fileBytes, info);
            console.log(signedPdf)
            await fs.writeFile(filePathVerify, signedPdf);
            return "Documento firmado exitosamente"
        } catch (error) {
            throw Error(error)
        }
    },
    verificarFirma: async (filePath) => {
        try{
            const settings = {
                signatureLength: 4000 - 6,
                rangePlaceHolder: 9999999,
                signatureComputer: {
                    certificate: await fs.readFile('Edgar.p12'),
                    password: 'edgarrios'
                }
            };
            const pdfSigner = new PdfSigner(settings);
            const fileBytesVerify = await fs.readFile(filePath);
            const verifyPdf = await pdfSigner.verifySignaturesAsync(fileBytesVerify);
            return verifyPdf
        } catch (error) {
            throw Error(error)
        }
    },
    ubicarFirma: async (x,y,pagina) => {
        try {
            const info = {
                pageNumber: pagina,
                signature:{
                    name: 'sergioDev',
                    location: 'Medellin',
                    reason: 'Signing Certificate',
                    date: new Date(),
                    contactInfo: 'info@sergiodev.com',
                },
                visual: {
                    background: await fs.readFile('signature.png'),
                    rectangle: { 
                        // IMPORTANTE: si las coordenadas son negativas, se consideran desde la derecha o desde abajo.
                        left: y, 
                        top: x, 
                        right: y+130, 
                        bottom: x+50
                    },
                    // texts: 
                    // [
                    //     {
                    //     lines: [ 
                    //         '', 
                    //         ''
                    //     ]}, 
                    //     {
                    //     lines: [ 
                    //         'Firmado digitalmente por', 
                    //         'JOHN DOE', 
                    //         'Date: 2023.11.03', 
                    //         '20:28:46 +02\'00\''
                    //     ]}
                    // ],
                }
            };
            
            const settings = {
                signatureLength: 4000 - 6,
                rangePlaceHolder: 9999999,
                signatureComputer: {
                    certificate: await fs.readFile('Edgar.p12'),
                    password: 'edgarrios'
                }
            };
            
            const filePath = 'uploads/pdf-sample.pdf'; 
            const filePathVerify = 'documento-firmado-ultimodd2.pdf';
            
            const pdfSigner = new PdfSigner(settings);
    
    
            const fileBytes = await fs.readFile(filePath);
            // const signedPdf = await pdfSigner.signAsync(fileBytes, info);

            const signedPdf = await pdfSigner.addFieldAsync(fileBytes, info);
            console.log(signedPdf)
            await fs.writeFile(filePathVerify, signedPdf);
            return "Documento firmado exitosamente"
        } catch (error) {
            throw Error(error)
        }
    },
    firmasUbicadas: async (filePath) => {
        try {
            const info = {
                pageNumber: pagina,
                signature:{
                    name: 'sergioDev',
                    location: 'Medellin',
                    reason: 'Signing Certificate',
                    date: new Date(),
                    contactInfo: 'info@sergiodev.com',
                },
                visual: {
                    background: await fs.readFile('signature.png'),
                    rectangle: { 
                        // IMPORTANTE: si las coordenadas son negativas, se consideran desde la derecha o desde abajo.
                        left: y, 
                        top: x, 
                        right: y+130, 
                        bottom: x+50
                    },
                    // texts: 
                    // [
                    //     {
                    //     lines: [ 
                    //         '', 
                    //         ''
                    //     ]}, 
                    //     {
                    //     lines: [ 
                    //         'Firmado digitalmente por', 
                    //         'JOHN DOE', 
                    //         'Date: 2023.11.03', 
                    //         '20:28:46 +02\'00\''
                    //     ]}
                    // ],
                }
            };
            
            const settings = {
                signatureLength: 4000 - 6,
                rangePlaceHolder: 9999999,
                signatureComputer: {
                    certificate: await fs.readFile('Edgar.p12'),
                    password: 'edgarrios'
                }
            };
            
            const filePath = 'uploads/pdf-sample.pdf'; 
            const filePathVerify = 'documento-firmado-ultimodd2.pdf';
            
            const pdfSigner = new PdfSigner(settings);
    
    
            const fileBytes = await fs.readFile(filePath);
            // const signedPdf = await pdfSigner.signAsync(fileBytes, info);

            const signedPdf = await pdfSigner.addFieldAsync(fileBytes, info);
            console.log(signedPdf)
            await fs.writeFile(filePathVerify, signedPdf);
            return "Documento firmado exitosamente"
        } catch (error) {
            throw Error(error)
        }
    },
    firmarCampoUbicado: async (filePath) => {
        try {
            const info = {
                pageNumber: pagina,
                signature:{
                    name: 'sergioDev',
                    location: 'Medellin',
                    reason: 'Signing Certificate',
                    date: new Date(),
                    contactInfo: 'info@sergiodev.com',
                },
                visual: {
                    background: await fs.readFile('signature.png'),
                    rectangle: { 
                        // IMPORTANTE: si las coordenadas son negativas, se consideran desde la derecha o desde abajo.
                        left: y, 
                        top: x, 
                        right: y+130, 
                        bottom: x+50
                    },
                    // texts: 
                    // [
                    //     {
                    //     lines: [ 
                    //         '', 
                    //         ''
                    //     ]}, 
                    //     {
                    //     lines: [ 
                    //         'Firmado digitalmente por', 
                    //         'JOHN DOE', 
                    //         'Date: 2023.11.03', 
                    //         '20:28:46 +02\'00\''
                    //     ]}
                    // ],
                }
            };
            
            const settings = {
                signatureLength: 4000 - 6,
                rangePlaceHolder: 9999999,
                signatureComputer: {
                    certificate: await fs.readFile('Edgar.p12'),
                    password: 'edgarrios'
                }
            };
            
            const filePath = 'uploads/pdf-sample.pdf'; 
            const filePathVerify = 'documento-firmado-ultimodd2.pdf';
            
            const pdfSigner = new PdfSigner(settings);
    
    
            const fileBytes = await fs.readFile(filePath);
            // const signedPdf = await pdfSigner.signAsync(fileBytes, info);

            const signedPdf = await pdfSigner.addFieldAsync(fileBytes, info);
            console.log(signedPdf)
            await fs.writeFile(filePathVerify, signedPdf);
            return "Documento firmado exitosamente"
        } catch (error) {
            throw Error(error)
        }
    },
    marcadorPosicionFirma: async (x,y,pagina) => {
        try {
            const info = {
                pageNumber: pagina,
                signature:{
                    name: 'sergioDev',
                    location: 'Medellin',
                    reason: 'Signing Certificate',
                    date: new Date(),
                    contactInfo: 'info@sergiodev.com',
                },
                visual: {
                    background: await fs.readFile('signature.png'),
                    rectangle: { 
                        // IMPORTANTE: si las coordenadas son negativas, se consideran desde la derecha o desde abajo.
                        left: y, 
                        top: x, 
                        right: y+130, 
                        bottom: x+50
                    },
                    // texts: 
                    // [
                    //     {
                    //     lines: [ 
                    //         '', 
                    //         ''
                    //     ]}, 
                    //     {
                    //     lines: [ 
                    //         'Firmado digitalmente por', 
                    //         'JOHN DOE', 
                    //         'Date: 2023.11.03', 
                    //         '20:28:46 +02\'00\''
                    //     ]}
                    // ],
                }
            };
            
            const settings = {
                signatureLength: 4000 - 6,
                rangePlaceHolder: 9999999,
                signatureComputer: {
                    certificate: await fs.readFile('Edgar.p12'),
                    password: 'edgarrios'
                }
            };
            
            const filePath = 'uploads/pdf-sample.pdf'; 
            const filePathVerify = 'documento-firmado-ultimodd2.pdf';
            
            const pdfSigner = new PdfSigner(settings);
    
    
            const fileBytes = await fs.readFile(filePath);
            // const signedPdf = await pdfSigner.signAsync(fileBytes, info);
    
            const signedPdf = await pdfSigner.addPlaceholderAsync(fileBytes, info);
            console.log(signedPdf)
            await fs.writeFile(filePathVerify, signedPdf);
            return "Documento firmado exitosamente"
        } catch (error) {
            throw Error(error)
        }
    } 
}