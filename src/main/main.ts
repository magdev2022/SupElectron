/**
 * Entry point of the Election app.
 */
import { app, BrowserWindow, ipcRenderer } from "electron";
import * as path from "path";
import * as url from "url";
import { ipcMain } from "electron";
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
import {
  FILE_NAMES,
  saveDataToFile,
  getFilePath,
  createMainDirectory,
  readJSONFromFile,
  OpenFileDialog,
  SaveasFileDialog
} from "./utils/LocalStorage/index";

const fs = require("fs");
let mainWindow: Electron.BrowserWindow | null;

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 720,
    width: 1280,
    backgroundColor: "#121223",
    webPreferences: {
      webSecurity: false,
      devTools: process.env.NODE_ENV === "production" ? false : true,
    },
    frame: false,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "./index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  mainWindow.on("minimize", () => {
    if (mainWindow !== null) {
      mainWindow.minimize();
    }
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
const FILE_SEPARATOR = path.sep;
const LOCAL_STORAGE_PATH = `${app.getPath("documents")}${FILE_SEPARATOR}AIOBOT`;

ipcMain.on("close-me", () => {
  app.quit();
});
ipcMain.on("mini-me", () => {
  if (mainWindow !== null) {
    mainWindow.minimize();
  }
});
ipcMain.on("max-me", () => {
  if (mainWindow !== null) {
    if (mainWindow != null) {
      mainWindow.isMaximized()
        ? mainWindow.unmaximize()
        : mainWindow.maximize();
    }
  }
});
createMainDirectory(LOCAL_STORAGE_PATH);
ipcMain.on("data", (event: Event, receive_data: any) => {
  if (receive_data.model == "profile") {
    let filename: string = getFilePath(
      LOCAL_STORAGE_PATH,
      FILE_SEPARATOR,
      FILE_NAMES.PROFILES
    );
    saveDataToFile(receive_data.data, filename);
  }else if(receive_data.model=="save_profile"){
    let jsonData = receive_data.data;
    SaveasFileDialog(JSON.stringify(jsonData),"profile.json");
  }
});

ipcMain.on("import_profile",(event:any)=>{
  let filename = OpenFileDialog();
  try {
    fs.readFile(filename, "utf8", (err: any, data: string) => {
      if (err) {
        event.returnValue = "";
        return;
      }
      event.returnValue = data;
    });
  } catch {
    throw new Error("File not found");
  }
})


ipcMain.on("find_product", (event: any, product_url: string) => {
  (async () => {
    try {
      const browser = await puppeteer.launch({
        executablePath:
          "D:\\Projects\\Electron\\WTAPS 1.3.0\\node_modules\\puppeteer\\.local-chromium\\win64-782078\\chrome-win\\chrome.exe",
        headless: false,
        defaultViewport: null,
        args: [`--window-size=10,10`],
      });
      const page = await browser.newPage();
      await page.goto("https://www.wtaps.com");
      await page.goto(product_url);
      let html = await page.content();
      const fs = require("fs");
      fs.writeFile("page.htm", html, function (err: any) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });

      const page_doc = cheerio.load(html);
      const color_content = page_doc(".line.color").find(".txt").html();
      const size_content = page_doc(".line.size").find(".txt").html();
      await browser.close();
      const return_value = { color: color_content, size: size_content };
      console.log(return_value);
      event.sender.send("found_product", return_value);
    } catch (error) {
      console.log(error);
    }
  })();
});
