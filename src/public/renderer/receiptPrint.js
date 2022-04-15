
const { getReceiptById }  = require('../knex');
function formatDate (input) {
    var datePart = input.match(/\d+/g),
    year = datePart[0], // get only two digits
    month = datePart[1], day = datePart[2];
  
    return day+'/'+month+'/'+year;
}
const dateFormatter = () => {
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return today = dd + '-' + mm + '-' + yyyy;
}
  
document.addEventListener('DOMContentLoaded', async () => {
    ipcRenderer.on('pdfInit', async (evt, receiptId) => {
        console.log('receipt Id is ', receiptId);
        try {
            let result = await getReceiptById(receiptId);
            console.log(result);
            let { 
                addressOfDelivery, addressOfSoruce, advanceAmt, consigneeInput, consignerInput, payableAmt, freightTotal, productInput, 
                totalBags, totalFreight, totalWeight, transportInput, valueOfGoods, receiptNo, receiptNumber, receiptDate, prefix
            } = result[0];
            consigneeInput = consigneeInput ? JSON.parse(consigneeInput) : '';
            consignerInput = consignerInput ? JSON.parse(consignerInput) : '';
            transportInput = transportInput ? JSON.parse(transportInput) : '';
            document.getElementById('receiptNumber').innerHTML = prefix && receiptNumber ? prefix+receiptNumber.toString() : '';
            document.getElementById('date').innerHTML = receiptDate ? formatDate(receiptDate) : dateFormatter();
            document.getElementById('lorryNumber').innerHTML = transportInput ? transportInput.vehicleNumber.toUpperCase() : '';
            document.getElementById('source').innerHTML = addressOfSoruce ? addressOfSoruce : ''; //sorry a typo here
            document.getElementById('destination').innerHTML = addressOfDelivery ? addressOfDelivery : '';
            document.getElementById('consigner').innerHTML = consignerInput ? consignerInput.consignerName : '';
            document.getElementById('consignerAddress').innerHTML = consignerInput ? consignerInput.address + ', ' + consignerInput.city : '';
            document.getElementById('consignerState').innerHTML = consignerInput ? consignerInput.state : '';
            document.getElementById('consignerGst').innerHTML = consignerInput ? consignerInput.gstin.toUpperCase() : '';
            document.getElementById('consignee').innerHTML = consigneeInput ? consigneeInput.consigneeName : '';
            document.getElementById('consigneeAddress').innerHTML = consigneeInput ? consigneeInput.address + ', ' + consigneeInput.city : '';
            document.getElementById('consigneeState').innerHTML = consigneeInput ? consigneeInput.state : '';
            document.getElementById('consigneeGst').innerHTML = consigneeInput ? consigneeInput.gstin.toUpperCase() : '';
            document.getElementById('weightTotal').innerHTML = totalWeight ? totalWeight : '';
            document.getElementById('bagTotal').innerHTML = totalBags ? totalBags : '';
            document.getElementById('freightTotal').innerHTML = totalFreight ? totalFreight : '';
            document.getElementById('advance').innerHTML = advanceAmt ? advanceAmt  : '';
            document.getElementById('amountToBePaid').innerHTML = payableAmt ? payableAmt : '';
            document.getElementById('valueOfGoods').innerHTML = valueOfGoods ? valueOfGoods : '';
            document.getElementById('vehicleOwnerName').innerHTML = transportInput ? transportInput.vehicleOwnerName+', ' : '';
            document.getElementById('ownerAddress').innerHTML = transportInput ? transportInput.vehicleOwnerAddress : '';
            document.getElementById('addressOfDelivery').innerHTML = addressOfDelivery ? addressOfDelivery : '';
            document.getElementById('driverName').innerHTML = transportInput ? transportInput.driverName+',' : '';
            document.getElementById('dlNumber').innerHTML = transportInput ? transportInput.dlNumber : '';
            document.getElementById('eway').innerHTML = transportInput ? transportInput.ebillNumber : '';
            // product
            productInput = JSON.parse(productInput);
            let slno = 1;
            let rows = '';
            productInput.map(product => {
                console.log(product);
                let { productName, packets, packetUnit, unit, weight } = product;
                rows += `<tr>`;
                rows += "<td>"+ slno +"</td>";
                rows += "<td>"+ packets+' '+packetUnit  +"</td>";
                rows += "<td>"+ productName +"</td>";
                rows += "<td>"+ weight + ' '+ unit +"</td>";
                rows += "</tr>";
                slno++;
            });
            document.getElementById('productTable').innerHTML = rows;
        } catch(e) {
            console.log('exception', e);

        }
    })
    ipcRenderer.on('pdfInitJson', async (evt, jsonData) => {
        console.log('receipt is ', jsonData);
        try {
            let { 
                addressOfDelivery, addressOfSoruce, advanceAmt, consigneeInput, consignerInput, payableAmt, freightTotal, productInput, 
                totalBags, totalFreight, totalWeight, transportInput, valueOfGoods, receiptNo, receiptNumber, receiptDate, prefix
            } = jsonData;
            consigneeInput = consigneeInput ? JSON.parse(consigneeInput) : '';
            consignerInput = consignerInput ? JSON.parse(consignerInput) : '';
            transportInput = transportInput ? JSON.parse(transportInput) : '';
            document.getElementById('receiptNumber').innerHTML = prefix && receiptNumber ? prefix+receiptNumber.toString() : '';
            document.getElementById('date').innerHTML = receiptDate ? formatDate(receiptDate) : dateFormatter();
            document.getElementById('lorryNumber').innerHTML = transportInput ? transportInput.vehicleNumber.toUpperCase() : '';
            document.getElementById('source').innerHTML = addressOfSoruce ? addressOfSoruce : ''; //sorry a typo here
            document.getElementById('destination').innerHTML = addressOfDelivery ? addressOfDelivery : '';
            document.getElementById('consigner').innerHTML = consignerInput ? consignerInput.consignerName : '';
            document.getElementById('consignerAddress').innerHTML = consignerInput ? consignerInput.address + ', ' + consignerInput.city : '';
            document.getElementById('consignerState').innerHTML = consignerInput ? consignerInput.state : '';
            document.getElementById('consignerGst').innerHTML = consignerInput ? consignerInput.gstin.toUpperCase() : '';
            document.getElementById('consignee').innerHTML = consigneeInput ? consigneeInput.consigneeName : '';
            document.getElementById('consigneeAddress').innerHTML = consigneeInput ? consigneeInput.address + ', ' + consigneeInput.city : '';
            document.getElementById('consigneeState').innerHTML = consigneeInput ? consigneeInput.state : '';
            document.getElementById('consigneeGst').innerHTML = consigneeInput ? consigneeInput.gstin.toUpperCase() : '';
            document.getElementById('weightTotal').innerHTML = totalWeight ? totalWeight : '';
            document.getElementById('bagTotal').innerHTML = totalBags ? totalBags : '';
            document.getElementById('freightTotal').innerHTML = totalFreight ? totalFreight : '';
            document.getElementById('advance').innerHTML = advanceAmt ? advanceAmt  : '';
            document.getElementById('amountToBePaid').innerHTML = payableAmt ? payableAmt : '';
            document.getElementById('valueOfGoods').innerHTML = valueOfGoods ? valueOfGoods : '';
            document.getElementById('vehicleOwnerName').innerHTML = transportInput ? transportInput.vehicleOwnerName+', ' : '';
            document.getElementById('ownerAddress').innerHTML = transportInput ? transportInput.vehicleOwnerAddress : '';
            document.getElementById('addressOfDelivery').innerHTML = addressOfDelivery ? addressOfDelivery : '';
            document.getElementById('driverName').innerHTML = transportInput ? transportInput.driverName+',' : '';
            document.getElementById('dlNumber').innerHTML = transportInput ? transportInput.dlNumber : '';
            document.getElementById('eway').innerHTML = transportInput ? transportInput.ebillNumber : '';
            // product
            productInput = JSON.parse(productInput);
            let slno = 1;
            let rows = '';
            productInput.map(product => {
                console.log(product);
                let { productName, packets, packetUnit, unit, weight } = product;
                rows += `<tr>`;
                rows += "<td>"+ slno +"</td>";
                rows += "<td>"+ packets+' '+packetUnit  +"</td>";
                rows += "<td>"+ productName +"</td>";
                rows += "<td>"+ weight + ' '+ unit +"</td>";
                rows += "</tr>";
                slno++;
            });
            document.getElementById('productTable').innerHTML = rows;
        } catch(e) {
            console.log('exception', e);

        }
    })
    ipcRenderer.on('receiptPdfInit', async (evt, receiptId) => {
        console.log('receipt Id is ', receiptId);
        try {
            let result = await getReceiptById(receiptId);
            console.log(result);
            let { 
                addressOfDelivery, addressOfSoruce, advanceAmt, consigneeInput, consignerInput, payableAmt, freightTotal, productInput, 
                totalBags, totalFreight, totalWeight, transportInput, valueOfGoods, receiptNo, receiptNumber, receiptDate, prefix
            } = result[0];
            consigneeInput = consigneeInput ? JSON.parse(consigneeInput) : '';
            consignerInput = consignerInput ? JSON.parse(consignerInput) : '';
            transportInput = transportInput ? JSON.parse(transportInput) : '';
            document.getElementById('receiptNumber').innerHTML = prefix && receiptNumber ? prefix+receiptNo.toString() : '';
            document.getElementById('date').innerHTML = receiptDate ? formatDate(receiptDate) : dateFormatter();
            document.getElementById('lorryNumber').innerHTML = transportInput ? transportInput.vehicleNumber.toUpperCase() : '';
            document.getElementById('source').innerHTML = addressOfSoruce ? addressOfSoruce : ''; //sorry a typo here
            document.getElementById('destination').innerHTML = addressOfDelivery ? addressOfDelivery : '';
            document.getElementById('consigner').innerHTML = consignerInput ? consignerInput.consignerName : '';
            document.getElementById('consignerAddress').innerHTML = consignerInput ? consignerInput.address + ', ' + consignerInput.city : '';
            document.getElementById('consignerState').innerHTML = consignerInput ? consignerInput.state : '';
            document.getElementById('consignerGst').innerHTML = consignerInput ? consignerInput.gstin.toUpperCase() : '';
            document.getElementById('consignee').innerHTML = consigneeInput ? consigneeInput.consigneeName : '';
            document.getElementById('consigneeAddress').innerHTML = consigneeInput ? consigneeInput.address + ', ' + consigneeInput.city : '';
            document.getElementById('consigneeState').innerHTML = consigneeInput ? consigneeInput.state : '';
            document.getElementById('consigneeGst').innerHTML = consigneeInput ? consigneeInput.gstin.toUpperCase() : '';
            document.getElementById('weightTotal').innerHTML = totalWeight ? totalWeight : '';
            document.getElementById('bagTotal').innerHTML = totalBags ? totalBags : '';
            document.getElementById('freightTotal').innerHTML = totalFreight ? totalFreight : '';
            document.getElementById('advance').innerHTML = advanceAmt ? advanceAmt  : '';
            document.getElementById('amountToBePaid').innerHTML = payableAmt ? payableAmt : '';
            document.getElementById('valueOfGoods').innerHTML = valueOfGoods ? valueOfGoods : '';
            document.getElementById('vehicleOwnerName').innerHTML = transportInput ? transportInput.vehicleOwnerName+', ' : '';
            document.getElementById('ownerAddress').innerHTML = transportInput ? transportInput.vehicleOwnerAddress : '';
            document.getElementById('addressOfDelivery').innerHTML = addressOfDelivery ? addressOfDelivery : '';
            document.getElementById('driverName').innerHTML = transportInput ? transportInput.driverName+',' : '';
            document.getElementById('dlNumber').innerHTML = transportInput ? transportInput.dlNumber : '';
            document.getElementById('eway').innerHTML = transportInput ? transportInput.ebillNumber : '';
            // product
            productInput = JSON.parse(productInput);
            let slno = 1;
            let rows = '';
            productInput.map(product => {
                console.log(product);
                let { productName, packets, packetUnit, unit, weight } = product;
                rows += `<tr>`;
                rows += "<td>"+ slno +"</td>";
                rows += "<td>"+ packets+' '+packetUnit  +"</td>";
                rows += "<td>"+ productName +"</td>";
                rows += "<td>"+ weight + ' '+ unit +"</td>";
                rows += "</tr>";
                slno++;
            });
            document.getElementById('productTable').innerHTML = rows;
            ipcRenderer.send('receiptPrint', 'loaded');
        } catch(e) {
            console.log('exception', e);
            ipcRenderer.send('receiptPrint', 'failed');

        }
    })
    ipcRenderer.on('viewPdfInit', async (evt, receiptId) => {
        console.log('receipt Id is ', receiptId);
        try {
            let result = await getReceiptById(receiptId);
            console.log(result);
            let { 
                addressOfDelivery, addressOfSoruce, advanceAmt, consigneeInput, consignerInput, payableAmt, freightTotal, productInput, 
                totalBags, totalFreight, totalWeight, transportInput, valueOfGoods, receiptNo, receiptNumber, receiptDate, prefix
            } = result[0];
            console.log('test ', receiptNumber);
            consigneeInput = consigneeInput ? JSON.parse(consigneeInput) : '';
            consignerInput = consignerInput ? JSON.parse(consignerInput) : '';
            transportInput = transportInput ? JSON.parse(transportInput) : '';
            document.getElementById('receiptNumber').innerHTML = prefix && receiptNumber ? prefix+receiptNumber.toString() : '';
            document.getElementById('date').innerHTML = receiptDate ? formatDate(receiptDate) : dateFormatter();
            document.getElementById('lorryNumber').innerHTML = transportInput ? transportInput.vehicleNumber.toUpperCase() : '';
            document.getElementById('source').innerHTML = addressOfSoruce ? addressOfSoruce : ''; //sorry a typo here
            document.getElementById('destination').innerHTML = addressOfDelivery ? addressOfDelivery : '';
            document.getElementById('consigner').innerHTML = consignerInput ? consignerInput.consignerName : '';
            document.getElementById('consignerAddress').innerHTML = consignerInput ? consignerInput.address + ', ' + consignerInput.city : '';
            document.getElementById('consignerState').innerHTML = consignerInput ? consignerInput.state : '';
            document.getElementById('consignerGst').innerHTML = consignerInput ? consignerInput.gstin.toUpperCase() : '';
            document.getElementById('consignee').innerHTML = consigneeInput ? consigneeInput.consigneeName : '';
            document.getElementById('consigneeAddress').innerHTML = consigneeInput ? consigneeInput.address + ', ' + consigneeInput.city : '';
            document.getElementById('consigneeState').innerHTML = consigneeInput ? consigneeInput.state : '';
            document.getElementById('consigneeGst').innerHTML = consigneeInput ? consigneeInput.gstin.toUpperCase() : '';
            document.getElementById('weightTotal').innerHTML = totalWeight ? totalWeight : '';
            document.getElementById('bagTotal').innerHTML = totalBags ? totalBags : '';
            document.getElementById('freightTotal').innerHTML = totalFreight ? totalFreight : '';
            document.getElementById('advance').innerHTML = advanceAmt ? advanceAmt  : '';
            document.getElementById('amountToBePaid').innerHTML = payableAmt ? payableAmt : '';
            document.getElementById('valueOfGoods').innerHTML = valueOfGoods ? valueOfGoods : '';
            document.getElementById('vehicleOwnerName').innerHTML = transportInput ? transportInput.vehicleOwnerName+', ' : '';
            document.getElementById('ownerAddress').innerHTML = transportInput ? transportInput.vehicleOwnerAddress : '';
            document.getElementById('addressOfDelivery').innerHTML = addressOfDelivery ? addressOfDelivery : '';
            document.getElementById('driverName').innerHTML = transportInput ? transportInput.driverName+',' : '';
            document.getElementById('dlNumber').innerHTML = transportInput ? transportInput.dlNumber : '';
            document.getElementById('eway').innerHTML = transportInput ? transportInput.ebillNumber : '';
            // product
            productInput = JSON.parse(productInput);
            let slno = 1;
            let rows = '';
            productInput.map(product => {
                console.log(product);
                let { productName, packets, packetUnit, unit, weight } = product;
                rows += `<tr>`;
                rows += "<td>"+ slno +"</td>";
                rows += "<td>"+ packets+' '+packetUnit  +"</td>";
                rows += "<td>"+ productName +"</td>";
                rows += "<td>"+ weight + ' '+ unit +"</td>";
                rows += "</tr>";
                slno++;
            });
            document.getElementById('productTable').innerHTML = rows;
            ipcRenderer.send('viewreceiptPrint', 'loaded');
        } catch(e) {
            console.log('exception', e);
            ipcRenderer.send('viewreceiptPrint', 'failed');

        }
    })
})