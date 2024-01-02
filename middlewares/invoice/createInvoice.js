const PDFDocument = require('pdfkit');
const fs = require("fs");

const createInvoice = (req, res, next) => {
    const {id} = req.params;
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(`./public/invoices/${id}.pdf`));
    // HEAD
    doc
        .font("./public/static/Roboto/Roboto-Bold.ttf")
        .fontSize("25")
        .text("shopapp-web-api", 50, 25)
        .moveTo(47.5, 60)
        .lineTo(265,60)
        .fill('#000000')
        .font("./public/static/Roboto/Roboto-Bold.ttf")
        .fontSize("8")
        .text("Teslimat Adresi", 49, 65)
        .font("./public/static/Roboto/Roboto-Light.ttf")
        .text("abc", 49, 80,{
            width:220,
            height:30,
            align: 'left',
            
        })
        .font("./public/static/Roboto/Roboto-Bold.ttf")
        .text("Fatura Adresi", 49, 110)
        .font("./public/static/Roboto/Roboto-Light.ttf")
        .text("çşğüj", 49, 125,{
            width:220,
            height:30,
            align: 'left',          
        })
        .font("./public/static/Roboto/Roboto-Bold.ttf")
        .text("TC Kimlik Numarası", 49, 155)
        .font("./public/static/Roboto/Roboto-Light.ttf")
        .text("9999999999", 122, 155)
        
        .moveTo(47.5, 170)
        .lineTo(265,170)
        .fill('#000000')
        .image("./public/static/gib.png", 300, 40 ,{
                width:50,
                height:50
            })
        .font("./public/static/Roboto/Roboto-Bold.ttf")
        .text("e-Arşiv Fatura", 300, 100)
        .font("./public/static/Roboto/Roboto-Bold.ttf")
        .text("(e-Archive Invoice)", 292, 110)
        .image("./public/static/sign.png", 300, 120 ,{
            width:50,
            height:50
        })
        .moveTo(400, 25)
        .lineTo(570,25)
        .fill('#000000')
        .font("./public/static/Roboto/Roboto-Light.ttf")
        .text("asdasasdads asdadasd asdasdad asdasdas asdasd asd", 400, 30, {
            width: 170,
            align: 'justify'
        })
        .font("./public/static/Roboto/Roboto-Bold.ttf")
        .text("Web Sitesi", 400, 50)
        .font("./public/static/Roboto/Roboto-Light.ttf")
        .text("localhost:3000", 440, 50)
        .font("./public/static/Roboto/Roboto-Bold.ttf")
        .text("Vergi Dairesi", 400, 65)
        .font("./public/static/Roboto/Roboto-Light.ttf")
        .text("Arsin", 447.5, 65)
        .font("./public/static/Roboto/Roboto-Bold.ttf")
        .text("Vergi Kimlik No", 400, 80)
        .font("./public/static/Roboto/Roboto-Light.ttf")
        .text("12546845790", 457.5, 80, {
            width:200
        })
        .font("./public/static/Roboto/Roboto-Bold.ttf")
        .text("Ticaret Sicil No", 400, 95)
        .font("./public/static/Roboto/Roboto-Light.ttf")
        .text("1-790", 457.5, 95, {
            width:200
        })
        .font("./public/static/Roboto/Roboto-Bold.ttf")
        .text("Mersis No", 400, 110)
        .font("./public/static/Roboto/Roboto-Light.ttf")
        .text("1124561246475790", 457.5, 110, {
            width:200
        })
       
        
        
        .moveTo(400, 125)
        .lineTo(570, 125)
        .fill('#000000')
        .moveTo(400, 135)
        .lineTo(575, 135)
        .fill('#000000')
        .moveTo(400, 155)
        .lineTo(575, 155)
        .fill('#000000')
        .moveTo(400, 175)
        .lineTo(575, 175)
        .fill('#000000')
        .moveTo(400, 195)
        .lineTo(575, 195)
        .fill('#000000')
        .moveTo(400, 215)
        .lineTo(575, 215)
        .fill('#000000')
        .moveTo(400, 235)
        .lineTo(575, 235)
        .fill('#000000')
       
        .moveTo(482, 135)
        .lineTo(482, 255)
        .fill('#000000')

        .font("./public/static/Roboto/Roboto-Bold.ttf")
        .text("Sipariş No", 405, 140)
        .font("./public/static/Roboto/Roboto-Light.ttf")
        .text("15478965324875963284", 482,140, {width:93, align:"center"})

        .font("./public/static/Roboto/Roboto-Bold.ttf")
        .text("Fatura Senaryo", 405, 160)
        .font("./public/static/Roboto/Roboto-Light.ttf")
        .text("EARSIVFATURA", 482, 160, {width:93, align:"center"})

        .font("./public/static/Roboto/Roboto-Bold.ttf")
        .text("Fatura Tipi", 405, 180)
        .font("./public/static/Roboto/Roboto-Light.ttf")
        .text("SATIS", 482, 180, {width:93, align:"center"})
        
        .font("./public/static/Roboto/Roboto-Bold.ttf")
        .text("Fatura No", 405, 200)
        .font("./public/static/Roboto/Roboto-Light.ttf")
        .text("125467896584521547", 482, 200, {width:93, align:"center"})

        .font("./public/static/Roboto/Roboto-Bold.ttf")
        .text("Fatura Tarihi", 405, 220)
        .font("./public/static/Roboto/Roboto-Light.ttf")
        .text("15.11.2023", 482, 220, {width:93, align:"center"})

        .font("./public/static/Roboto/Roboto-Bold.ttf")
        .text("Düzeneleme Zamanı", 405, 240)        
        .font("./public/static/Roboto/Roboto-Light.ttf")
        .text("20:25:14", 482, 240, {width:93, align:"center"})
        .rect(400,135, 175,120)
        .stroke()

        .font("./public/static/Roboto/Roboto-Bold.ttf")
        .text("* Bu tutarlata KDV dahil değildir.", 47.5, 240,{
            width: 150,
            align: "left"
        })
        .rect(47.5,260, 527.5,30)
        .fillAndStroke("#cccccc", "black")

        .font("./public/static/Roboto/Roboto-Bold.ttf")
        .text("No", 47.5, 270)
        .moveTo(65, 260)
        .lineTo(65, 290)
        .fill('#000000')
        
        
        .font("./public/static/Roboto/Roboto-Bold.ttf")
        .text("No", 47.5, 270,{
            width: 17.5,
            align: "center"
        })
        .text("ADT", 65, 270,{
            width: 20,
            align: "center"
        })
        .moveTo(85, 260)
        .lineTo(85, 290)
        .fill("#000000")
        .text("Ürün Kodu", 85, 270,{
            width: 40,
            align: "center"
        })
        .moveTo(125, 260)
        .lineTo(125, 290)
        .fill("#000000")
        .text("Mal/Hizmet Cinsi", 125, 270,{
            width: 100,
            align: "center"
        })
        .moveTo(224, 260)
        .lineTo(224, 290)
        .fill("#000000")
        .text("Birim Fiyat*", 225, 270,{
            width: 45,
            align: "center"
        })
        .moveTo(271, 260)
        .lineTo(271, 290)
        .fill("#000000")
        .text("Genel Tutar*", 271, 270,{
            width: 50,
            align: "center"
        })
        .moveTo(320, 260)
        .lineTo(320, 290)
        .fill("#000000")
        .text("İskonto*", 320, 270,{
            width: 35,
            align: "center"
        })
        .moveTo(355, 260)
        .lineTo(355, 290)
        .fill("#000000")
        .text("KDV Oranı", 355, 270,{
            width: 45,
            align: "center"
        })
        .moveTo(400, 260)
        .lineTo(400, 290)
        .fill("#000000")
        .text("KDV Tutarı", 400, 270,{
            width: 45,
            align: "center"
        })
        .moveTo(445, 260)
        .lineTo(445, 290)
        .fill("#000000")
        .text("Toplam Tutar", 445, 270,{
            width: 50,
            align: "center"
        })
        .moveTo(496, 260)
        .lineTo(496, 290)
        .fill("#000000")
        .text("İade Tutarı", 496, 270,{
            width: 79,
            align: "center"
        })
       
        .end()
        req.doc = doc;
    next()
}

module.exports = {
    createInvoice
}