import * as fs from "fs";


export const FILE_NAMES = {
  AUTH: "auth.json",
  PROFILES: "profiles.json",
  PROXIES: "proxies.json",
  TASKS: "tasks.json",
  CAPTCHAAPI:"captcha.json"
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

export const readJSONFromFile = (fileName: string): any =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, (err: any, data: any) => {
      try {
        return err ? reject(err) : resolve(JSON.parse(data));
      } catch (err) {
        reject(err);
      }
    });
  });