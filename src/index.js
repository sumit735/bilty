const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
require('@electron/remote/main').initialize();
const fs = require('fs');
const ipcMain = require('electron').ipcMain;

// listen from render process
ipcMain.on('renderer', (evt, message) => {
  console.log('event message from renderer is ', message);
  // window related stuff
  if(message == 'createNewWindow') {
    addReceiptWindow = new BrowserWindow({
      width: 1366,
      height: 768,
      minHeight: 711,
      minWidth: 608,
      icon: "../logo.ico",
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInSubFrames: true,
        enableRemoteModule: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false,
        sandbox: false
      }
    });
  
    // and load the index.html of the app.
    // addReceiptWindow.removeMenu();
    addReceiptWindow.loadFile(path.join(__dirname, '/public/addReceipt.html'));
  }
  if(message == 'viewAllReceipts') {
    viewReceiptWindow = new BrowserWindow({
      width: 1366,
      height: 768,
      minHeight: 711,
      minWidth: 608,
      icon: "../logo.ico",
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInSubFrames: true,
        enableRemoteModule: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false,
        sandbox: false
      }
    });
  
    // and load the index.html of the app.
    viewReceiptWindow.removeMenu();
    viewReceiptWindow.loadFile(path.join(__dirname, '/public/viewReceipt.html'));
  }
  if(message == 'addConsigner') {
    // this one is manage consigner. add one is below this
    viewConsigner = new BrowserWindow({
      width: 1200,
      height: 700,
      minHeight: 600,
      minWidth: 1100,
      icon: "../logo.ico",
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInSubFrames: true,
        enableRemoteModule: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false,
        sandbox: false
      }
    });
  
    // and load the index.html of the app.
    viewConsigner.removeMenu();
    viewConsigner.loadFile(path.join(__dirname, '/public/addConsigner.html'));
  }
  if(message == 'addNewConsigner') {
    addNewConsigner = new BrowserWindow({
      width: 500,
      height: 700,
      minHeight: 500,
      minWidth: 700,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInSubFrames: true,
        enableRemoteModule: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false,
        sandbox: false
      }
    });
  
    // and load the index.html of the app.
    addNewConsigner.removeMenu();
    addNewConsigner.loadFile(path.join(__dirname, '/public/addNewConsigner.html'));
  }
  if(message == 'viewConsignee') {
    // this one is manage consignee. add one is below this
    viewconsignee = new BrowserWindow({
      width: 1200,
      height: 700,
      minHeight: 600,
      minWidth: 1100,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInSubFrames: true,
        enableRemoteModule: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false,
        sandbox: false
      }
    });
  
    // and load the index.html of the app.
    // viewconsignee.removeMenu();
    viewconsignee.loadFile(path.join(__dirname, '/public/viewConsignee.html'));
  }
  if(message == 'addNewconsignee') {
    addNewconsignee = new BrowserWindow({
      width: 500,
      height: 700,
      minHeight: 500,
      minWidth: 700,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInSubFrames: true,
        enableRemoteModule: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false,
        sandbox: false
      }
    });
  
    // and load the index.html of the app.
    // addNewconsignee.removeMenu();
    console.log(path.join(__dirname, '/public/addNewconsignee.html'))
    addNewconsignee.loadFile(path.join(__dirname, '/public/addNewConsignee.html'));
  }
  
  if(message == 'addTransport') {
    addTransportWindow = new BrowserWindow({
      width: 500,
      height: 700,
      minHeight: 500,
      minWidth: 700,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInSubFrames: true,
        enableRemoteModule: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false,
        sandbox: false
      }
    });
  
    // and load the index.html of the app.
    // addTransportWindow.removeMenu();
    addTransportWindow.loadFile(path.join(__dirname, '/public/addTransport.html'));
  }
  if(message == 'viewProduct') {
    viewProducts = new BrowserWindow({
      width: 1280,
      height: 720,
      minHeight: 700,
      minWidth: 1200,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInSubFrames: true,
        enableRemoteModule: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false,
        sandbox: false
      }
    });
  
    // and load the index.html of the app.
    viewProducts.removeMenu();
    viewProducts.loadFile(path.join(__dirname, '/public/viewProduct.html'));
  }
  if(message == 'addNewProduct') {
    addNewProduct = new BrowserWindow({
      width: 500,
      height: 700,
      minHeight: 500,
      minWidth: 700,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInSubFrames: true,
        enableRemoteModule: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false,
        sandbox: false
      }
    });
  
    // and load the index.html of the app.
    addNewProduct.removeMenu();
    addNewProduct.loadFile(path.join(__dirname, '/public/addNewProduct.html'));
  }

  if(message.type == 'editProduct') {
    editProductWindow = new BrowserWindow({
      width: 500,
      height: 700,
      minHeight: 500,
      minWidth: 700,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInSubFrames: true,
        enableRemoteModule: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false,
        sandbox: false
      }
    });
  
    // and load the index.html of the app.
    console.log('brefore');

    editProductWindow.removeMenu();
    editProductWindow.loadFile(path.join(__dirname, '/public/editProduct.html'));
    editProductWindow.webContents.on('did-finish-load', function () {
      editProductWindow.webContents.send('editproductdetails', message);
    });

    console.log('after', message);

  }

  if(message.type == 'selectConsigner') {
    viewConsigner.close();
    addReceiptWindow.webContents.send('oldConsignerDetails', message);
  }
  if(message.type == 'selectconsignee') {
    viewconsignee.close();
    addReceiptWindow.webContents.send('oldConsigneeDetails', message);
  }
  

});

// ====================================
// Send Stuff to add receipt page
// ====================================

ipcMain.on('consignerDetails', (event, consignerPayload) => {
  viewConsigner.close();
  addReceiptWindow.webContents.send('consignerDetails', consignerPayload);
});
ipcMain.on('consigneeDetails', (event, consigneePayload) => {
  viewconsignee.close();
  addReceiptWindow.webContents.send('consigneeDetails', consigneePayload);
});
ipcMain.on('productDetails', (event, productPayload) => {
  viewProducts.close();
  addReceiptWindow.webContents.send('productDetails', productPayload);
});
ipcMain.on('selectProduct', (event, productPayload) => {
  console.log('here', productPayload);
  viewProducts.close();
  addReceiptWindow.webContents.send('oldProductDetails', productPayload);
});
ipcMain.on('transportDetails', (event, transportPayload) => {
  addReceiptWindow.webContents.send('transportDetails', transportPayload);
});

// ! TODO - preview part
ipcMain.on('preview', (event, id) => {
  console.log('inside preview');
  window_to_PDF = new BrowserWindow(
    {
      show: true,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInSubFrames: true,
        enableRemoteModule: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false,
        sandbox: false
      }
    }
  );//to just open the browser in background { show: false }
  window_to_PDF.loadFile(path.join(__dirname, '/public/receiptPrint.html')); //give the file link you want to display
  function pdfSettings() {
    var paperSizeArray = ["A4"];
    var option = {
      landscape: false,
      marginsType: 0,
      printBackground: false,
      printSelectionOnly: false,
      pageSize: paperSizeArray[0],
    };
    return option;
  }
  window_to_PDF.webContents.on('did-finish-load', async function () {
    window_to_PDF.webContents.send('pdfInit', id);
    console.log('loaded. now print');
  });
  
});
ipcMain.on('previewJson', (event, jsonData) => {
  console.log('inside preview', typeof jsonData);
  if( typeof jsonData === 'object') {
    window_to_PDF = new BrowserWindow(
      {
        show: true,
        webPreferences: {
          nodeIntegration: true,
          nodeIntegrationInSubFrames: true,
          enableRemoteModule: true,
          nodeIntegrationInWorker: true,
          contextIsolation: false,
          sandbox: false
        }
      }
    );//to just open the browser in background { show: false }
    window_to_PDF.loadFile(path.join(__dirname, '/public/receiptPrint.html')); //give the file link you want to display
    function pdfSettings() {
      var paperSizeArray = ["A4"];
      var option = {
        landscape: false,
        marginsType: 0,
        printBackground: false,
        printSelectionOnly: false,
        pageSize: paperSizeArray[0],
      };
      return option;
    }
    window_to_PDF.webContents.on('did-finish-load', async function () {
      window_to_PDF.webContents.send('pdfInitJson', jsonData);
      console.log('loaded. now print');
    });
  } else {
    const options = {
      type: 'error',
      buttons: ['Ok'],
      defaultId: 0,
      title: 'Failed To Preview',
      message: '',
      detail: "Sorry! Something went wrong, please contact your administrator",
    };
    
    dialog.showMessageBox(null, options, (response, checkboxChecked) => {
      console.log(response);
      console.log(checkboxChecked);
    });
  }
   
  
});

ipcMain.on('download', (event, id) => {
  console.log('inside download');
  window_to_PDF = new BrowserWindow(
    {
      show: false,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInSubFrames: true,
        enableRemoteModule: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false,
        sandbox: false
      }
    }
  );//to just open the browser in background { show: false }
  window_to_PDF.loadFile(path.join(__dirname, '/public/receiptPrint.html')); //give the file link you want to display
  function pdfSettings() {
    var paperSizeArray = ["A4"];
    var option = {
      landscape: false,
      marginsType: 0,
      printBackground: false,
      printSelectionOnly: false,
      pageSize: paperSizeArray[0],
    };
    return option;
  }
  window_to_PDF.webContents.on('did-finish-load', async function () {
    window_to_PDF.webContents.send('pdfInit', id);
    console.log('loaded. now print');
    const { filePath } = await dialog.showSaveDialog({
      defaultPath: `SB-${Date.now()}.pdf`
    })
    console.log('path is ',filePath);
    window_to_PDF.webContents.printToPDF(pdfSettings()).then(data => {
      console.log('inside print pdf');
      fs.writeFile(filePath, data, (error) => {
        if (error) {
          console.log(error);
          addReceiptWindow.webContents.send('pdfDownload', 'failed');

        }
        console.log(`Wrote PDF successfully to ${filePath}`);
        addReceiptWindow.webContents.send('pdfDownload', 'success');
      })
    }).catch(err => {
      //unable to save pdf..
      console.log('error',err);
      addReceiptWindow.webContents.send('pdfDownload', 'failed');

    })
  });
  
});

ipcMain.on('viewReceiptDownload', (event, id) => {
  console.log('inside download');
  window_to_PDF = new BrowserWindow(
    {
      show: false,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInSubFrames: true,
        enableRemoteModule: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false,
        sandbox: false
      }
    }
  );//to just open the browser in background { show: false }
  window_to_PDF.loadFile(path.join(__dirname, '/public/receiptPrint.html')); //give the file link you want to display
  function pdfSettings() {
    var paperSizeArray = ["A4"];
    var option = {
      landscape: false,
      marginsType: 0,
      printBackground: false,
      printSelectionOnly: false,
      pageSize: paperSizeArray[0],
    };
    return option;
  }
  window_to_PDF.webContents.on('did-finish-load', async function () {
    window_to_PDF.webContents.send('pdfInit', id);
    console.log('loaded. now download');
    const { filePath } = await dialog.showSaveDialog({
      defaultPath: `SB-${Date.now()}.pdf`
    })
    console.log('path is ',filePath);
    window_to_PDF.webContents.printToPDF(pdfSettings()).then(data => {
      console.log('inside print pdf');
      fs.writeFile(filePath, data, (error) => {
        if (error) {
          console.log(error);
          viewReceiptWindow.webContents.send('pdfDownload', 'failed');

        }
        console.log(`Wrote PDF successfully to ${filePath}`);
        viewReceiptWindow.webContents.send('pdfDownload', 'success');
      })
    }).catch(err => {
      //unable to save pdf..
      console.log('error',err);
      viewReceiptWindow.webContents.send('pdfDownload', 'failed');

    })
  });
  
});

// ! TODO - Print Part
ipcMain.on('print', (event, id) => {
  console.log('inside print');
  printWindow = new BrowserWindow(
    {
      show: false,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInSubFrames: true,
        enableRemoteModule: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false,
        sandbox: false
      }
    }
  );//to just open the browser in background { show: false }
  printWindow.loadFile(path.join(__dirname, '/public/receiptPrint.html')); //give the file link you want to display
  
  printWindow.webContents.on('did-finish-load', async function () {
    printWindow.webContents.send('receiptPdfInit', id);
  });
  
});
ipcMain.on('viewReceiptPrint', (event, id) => {
  console.log('inside print');
  printWindow = new BrowserWindow(
    {
      show: false,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInSubFrames: true,
        enableRemoteModule: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false,
        sandbox: false
      }
    }
  );//to just open the browser in background { show: false }
  printWindow.loadFile(path.join(__dirname, '/public/receiptPrint.html')); //give the file link you want to display
  
  printWindow.webContents.on('did-finish-load', function () {
    printWindow.webContents.send('viewPdfInit', id);
    
  });
  
});
ipcMain.on('receiptPrint', (event, msg) => {
  if(msg == 'loaded') {
    console.log('loaded. now print');
    let options = {
      silent: false,
      printBackground: true,
      color: true,
      margin: {
        marginType: 'printableArea'
      },
      landscape: false,
      collate: false,
    }
    printWindow.webContents.print(options, (success, failureReason) => {
      if (!success) addReceiptWindow.webContents.send('print', {status: 'failed'});

      addReceiptWindow.webContents.send('print', {status: 'success', success})
    });
  } else {
    addReceiptWindow.webContents.send('print', {status: 'failed'})
  }
  

});
ipcMain.on('viewreceiptPrint', (event, msg) => {
  if(msg == 'loaded') {
    console.log('loaded. now print');
    let options = {
      silent: false,
      printBackground: true,
      color: true,
      margin: {
        marginType: 'printableArea'
      },
      landscape: false,
      collate: false,
    }
    printWindow.webContents.print(options, (success, failureReason) => {
      if (!success) viewReceiptWindow.webContents.send('print', {status: 'failed'});

      viewReceiptWindow.webContents.send('print', {status: 'success', success})
    });
  } else {
    viewReceiptWindow.webContents.send('print', {status: 'failed'})
  }
  

});
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    minHeight: 711,
    minWidth: 608,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInSubFrames: true,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      sandbox: false
    }
  });

  // and load the index.html of the app.
  mainWindow.removeMenu();
  mainWindow.loadFile(path.join(__dirname, '/public/index.html'));

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
