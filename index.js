let ReceiptPrinterEncoder = require('@point-of-sale/receipt-printer-encoder');
let SystemReceiptPrinter = require('@point-of-sale/system-receipt-printer');

let encoder = new ReceiptPrinterEncoder({
    language: 'star-prnt',
    feedBeforeCut: 4
});

const receiptPrinter = new SystemReceiptPrinter({ 
    name:   'Star MCP31'
});

receiptPrinter.connect();

let data = encoder
    .initialize()
    .text('The quick brown fox jumps over the lazy dog')
    .qrcode('https://projecthub.cloud', { model: 2, size: 8, errorlevel: 'h' })
    .newline()
    .font('B')
    .line('Small text')
    .font('A')
    .line('Normal text')
    .newline()
    .size(1,1)
    .line('One')
    .size(2,2)
    .line('Two')
    .size(3,3)
    .line('Three')
    .size(4,4)
    .line('Four')
    .size(5,5)
    .line('Five')
    .size(6,6)
    .line('Six')
    .size(1,1)
    .newline()
    .table(
        [
            { width: 36, marginRight: 2, align: 'left' },
            { width: 10, align: 'right' }
        ], 
        [
            [ 'Item 1', '€ 10,00' ],
            [ 'Item 2', '15,00' ],
            [ 'Item 3', '9,95' ],
            [ 'Item 4', '4,75' ],
            [ 'Item 5', '211,05' ],
            [ '', '='.repeat(10) ],
            [ 'Total', (encoder) => encoder.bold().text('€ 250,75').bold() ],
        ]
    )
    .box(
        { width: 30, align: 'right', style: 'double', marginLeft: 10 }, 
        'The quick brown fox jumps over the lazy dog'
    )
    .rule({ style: 'double' })
    
    .cut()
    .encode();

let data2 = encoder
    .initialize()
    .newline()
    .size(3,3)
    .align('center')
    .line('Richard')
    .size(1,1)
    .rule({style: 'single'})
    .size(2,2)
    .align('left')
    .line('Allergy:')
    .line('Egg')
    .newline()
    .size(1,1)
    .table(
        [
            { width: 15, marginRight: 2, align: 'left' },
            { width: 31, align: 'right' }
        ], 
        [
            [ 'Ice-cream', 'Strawberry Sorbet' ],
            [ 'The Dip', 'Berry Glaze' ],
            [ 'The Drizzle', 'White Chocolate' ],
            [ 'The Sprinkle', 'Freeze-dried berries' ],
        ]
    )
    .newline()
    .line('12:57:45 30/04/2025')
    .cut()
    .encode();

    let data3 = encoder
    .initialize()
    .newline()
    .size(3,3)
    .align('center')
    .line('Richard')
    .size(1,1)
    .rule({style: 'single'})
    .size(1,1)
    .align('left')
    .line('No allergy declared')
    .newline()
    .size(1,1)
    .table(
        [
            { width: 15, marginRight: 2, align: 'left' },
            { width: 31, align: 'right' }
        ], 
        [
            [ 'Ice-cream', 'Strawberry Sorbet' ],
            [ 'The Dip', 'Berry Glaze' ],
            [ 'The Drizzle', 'White Chocolate' ],
            [ 'The Sprinkle', 'Freeze-dried berries' ],
        ]
    )
    .newline()
    .line('12:57:55 30/04/2025')
    .cut()
    .encode();

receiptPrinter.print(data3);
