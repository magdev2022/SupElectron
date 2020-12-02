import * as fs from "fs";
const { dialog, app } = require("electron");
const path = require("path");

export const FILE_NAMES = {
  AUTH: "auth.json",
  PROFILES: "profiles.json",
  PROXIES: "proxies.json",
  TASKS: "tasks.json",
  CAPTCHAAPI:"captcha.txt"
};

export const createMainDirectory = (LOCAL_STORAGE_PATH:string) => {
  if (!fs.existsSync(LOCAL_STORAGE_PATH)) {
    fs.mkdirSync(LOCAL_STORAGE_PATH);
  }
};

export const getFilePath = (LOCAL_STORAGE_PATH:string,FILE_SEPARATOR:string, fileName: string) =>
  `${LOCAL_STORAGE_PATH}${FILE_SEPARATOR}${fileName}`;

export const saveDataToFile = (jsonData: any, fileName: string) =>
  new Promise((resolve, reject) => {
    fs.writeFile(
      fileName,
      JSON.stringify(jsonData),
      (err: NodeJS.ErrnoException | null) => (err ? reject(err) : resolve())
    );
  });

export const savetxtToFile = (content:string, filename:string)=>new Promise((resolve,reject)=>{
  fs.writeFile(
    filename,
    content,
    (err:NodeJS.ErrnoException|null)=>(err?reject(err):resolve())
  )
});

export const readtxtFromFile = (fileName: string): any =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, (err: any, data: any) => {
      try {
        return err ? reject("") : resolve(data.toString("utf-8"));
      } catch (err) {
        reject("");
      }
    });
  });
  

export const readJSONFromFile = (fileName: string): any =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, (err: any, data: any) => {
      try {
        return err ? resolve([]) : resolve(JSON.parse(data));
      } catch (err) {
        return [];
      }
    });
  });

export function OpenFileDialog(): string {
  let filepath: string[] = dialog.showOpenDialog({
    properties: ["openFile"],
  });
  if (filepath == undefined) {
    return "error";
  } else {
    return filepath[0];
  }
}

export function SaveasFileDialog(content: any, filename: string) {
  const options = {
    defaultPath: path.join(app.getPath("documents"), filename),
    title: "Save File",
  };
  dialog.showSaveDialog(options, (path) => {
    if (path != undefined) {
      fs.writeFile(path, content, function (err: any) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
    }
  });
}
