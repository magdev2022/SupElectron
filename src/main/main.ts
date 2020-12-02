/**
 * Entry point of the Election app.
 */
import { app, BrowserWindow, ipcRenderer } from "electron";
import * as path from "path";
import * as url from "url";
import { ipcMain } from "electron";

import { fetchProductsByCategory, fetchProductStylesID } from "./funcs/fetch";
import { parseProductFromProducts, parseStyleFromStyles } from "./funcs/parse";
import HttpClient from "./http/index";
import { convertStringToProxy } from "./utils/ProxyUtils/index";
const puppeteer = require("puppeteer");

const request = require("request");
import {
  FILE_NAMES,
  saveDataToFile,
  getFilePath,
  createMainDirectory,
  readJSONFromFile,
  OpenFileDialog,
  SaveasFileDialog,
  savetxtToFile,
  readtxtFromFile,
} from "./utils/LocalStorage/index";
import BotTask from "@/renderer/Types/BotTask";
import Profile from "@/renderer/Types/Profile";
import ProxyGroup from "@/renderer/Types/ProxyGroup";
import CustomProxy from "@/renderer/Types/CustomProxy";
import Captcha from "@/renderer/Types/Captcha";

const fs = require("fs");
let mainWindow: Electron.BrowserWindow | null;

let supBots: SupBot[] = [];
let bottasks: BotTask[] = [];
let profilelist: Profile[] = [];
let grouplist: ProxyGroup[] = [];
let capapilist: string[] = [];
let captchatokens:Captcha[] = [];
let chromepath: string = "";

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
    mainWindow = null;
  });
  mainWindow.on("minimize", () => {
    if (mainWindow !== null) {
      mainWindow.minimize();
    }
  });
  checkchrome();
  initBot();
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
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

ipcMain.on("import_profile", (event: any) => {
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
});

ipcMain.on("login", (event: any, data: any) => {
  const url = "https://aiobotjp.com/api/login";
  const bodydata = `email=${data.user}&password=${data.password}&ip=${data.strIP}&mac=${data.strMac}&app=SupremeNB`;
  request.post(
    {
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url: url,
      body: bodydata,
    },
    function (error: any, response: any, body: any) {
      let res = JSON.parse(body);
      if (res.success == false) {
        event.returnValue = "error";
      } else {
        let role = res.role;
        if (role == "admin" || role == "staff") {
          event.returnValue = "activated";
        } else if (role == "lifetime") {
          if (res.lifetime_status == true) {
            event.returnValue = "activated";
          } else {
            event.returnValue = "error";
          }
        }
      }
      event.returnValue = "error";
    }
  );
});

function getChromePath(): string {
  if (chromepath == "")
  {
    chromepath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  }
  return chromepath;
}

//Process tasks
ipcMain.on("gettask", async (event: any, arg: any) => {
  event.returnValue = bottasks;
});

ipcMain.on("addtask", async (event: any, arg: BotTask) => {
  arg.id = Math.floor(Math.random() * 1000).toString();
  bottasks = bottasks.concat(arg);
  let filename = getFilePath(
    LOCAL_STORAGE_PATH,
    FILE_SEPARATOR,
    FILE_NAMES.TASKS
  );
  try {
    saveDataToFile(bottasks, filename);
    if (mainWindow != null) {
      mainWindow.webContents.send("updatetask", bottasks);
    }
  } catch {}
});

ipcMain.on("removetask", (event: any, arg: any) => {
  for (let i = 0; i < bottasks.length; i++) {
    if (bottasks[i].id == arg) {
      bottasks.splice(i, 1);
      break;
    }
  }
  updatetask();
});

function updatetask() {
  let filename = getFilePath(
    LOCAL_STORAGE_PATH,
    FILE_SEPARATOR,
    FILE_NAMES.TASKS
  );
  saveDataToFile(bottasks, filename);
  if (mainWindow != null) {
    mainWindow.webContents.send("updatetask", bottasks);
  }
}

///Process Profile
ipcMain.on("getprofile", async (event: any, arg: any) => {
  event.returnValue = profilelist;
});

ipcMain.on("addprofile", (event: any, arg: any) => {
  profilelist = profilelist.concat(arg);
  updateProfile();
});

ipcMain.on("removeprofile", (event: any, arg: any) => {
  for (let i = 0; i < profilelist.length; i++) {
    if (profilelist[i].profilename == arg) {
      profilelist.splice(i, 1);
      break;
    }
  }
  updateProfile();
});

function updateProfile() {
  let filename = getFilePath(
    LOCAL_STORAGE_PATH,
    FILE_SEPARATOR,
    FILE_NAMES.PROFILES
  );
  try {
    saveDataToFile(profilelist, filename);
    if (mainWindow != null) {
      mainWindow.webContents.send("updateprofile", profilelist);
    }
  } catch {}
}

////////////Process Proxy

///Process Profile
ipcMain.on("getgroup", async (event: any, arg: any) => {
  event.returnValue = grouplist;
});

ipcMain.on("addgroup", (event: any, arg: any) => {
  grouplist = grouplist.concat(arg);
  updateGroup();
});

ipcMain.on("removegroup", (event: any, arg: any) => {
  for (let i = 0; i < grouplist.length; i++) {
    if (grouplist[i].name == arg) {
      grouplist.splice(i, 1);
      break;
    }
  }
  updateGroup();
});

function updateGroup() {
  let filename = getFilePath(
    LOCAL_STORAGE_PATH,
    FILE_SEPARATOR,
    FILE_NAMES.PROXIES
  );
  try {
    saveDataToFile(grouplist, filename);
    if (mainWindow != null) {
      mainWindow.webContents.send("updategroup", grouplist);
    }
  } catch {}
}

/////////process capapis

ipcMain.on("getapi", async (event: any, arg: any) => {
  event.returnValue = capapilist;
});

ipcMain.on("addapi", (event: any, arg: any) => {
  capapilist = capapilist.concat(arg);
  updateAPI();
});

ipcMain.on("removeapi", (event: any, arg: any) => {
  capapilist = [];
  updateAPI();
});

function updateAPI() {
  let filename = getFilePath(
    LOCAL_STORAGE_PATH,
    FILE_SEPARATOR,
    FILE_NAMES.CAPTCHAAPI
  );
  try {
    savetxtToFile(capapilist.join("\n"), filename);
    if (mainWindow != null) {
      mainWindow.webContents.send("updateapi", capapilist);
    }
  } catch {}
}

async function initBot() {
  //init proxy
  try {
    let filename = getFilePath(
      LOCAL_STORAGE_PATH,
      FILE_SEPARATOR,
      FILE_NAMES.PROXIES
    );
    grouplist = await readJSONFromFile(filename);
  } catch (error) {}

  //init profile
  try {
    let filename = getFilePath(
      LOCAL_STORAGE_PATH,
      FILE_SEPARATOR,
      FILE_NAMES.PROFILES
    );
    let initprofiles = await readJSONFromFile(filename);
    if (initprofiles.length > 0)
    {
      initprofiles.map((ele: Profile) => {
        profilelist = profilelist.concat(ele);
      })
    }
  } catch (error) {}

  //init tasks
  try {
    let filename = getFilePath(
      LOCAL_STORAGE_PATH,
      FILE_SEPARATOR,
      FILE_NAMES.TASKS
    );
    let inittasks = await readJSONFromFile(filename);
    if (inittasks.length > 0) {
      inittasks.map((ele: BotTask) => {
        ele.message = "IDLE";
        ele.status = "IDLE";
        bottasks = bottasks.concat(ele);
      });
    }
  } catch (error) {}
  //init apis
  try {
    let filename = getFilePath(
      LOCAL_STORAGE_PATH,
      FILE_SEPARATOR,
      FILE_NAMES.CAPTCHAAPI
    );
    let capstring = await readtxtFromFile(filename);
    capapilist = capstring.split("\n");
  } catch (error) {}
}

/////////Sup Bot

class SupBot {
  task: BotTask;
  profile: Profile;
  proxylist: CustomProxy[];
  chromepath: string;
  constructor(newtask: BotTask, chromepath: string) {
    this.task = newtask;
    this.chromepath = chromepath;
    for (let i = 0; i < profilelist.length; i++) {
      if (profilelist[i].profilename == this.task.profilename) {
        this.profile = profilelist[i];
        break;
      }
    }
    if (this.task.isUseProxy == true) {
      for (let i = 0; i < grouplist.length; i++) {
        if (grouplist[i].name == this.task.proxyname) {
          this.proxylist = grouplist[i].content;
        }
      }
    } else {
      this.proxylist = [];
    }
  }

  public saveLog(log: string) {
    let current = new Date();
    let data =
      current.getHours() +
      ":" +
      current.getMinutes() +
      ":" +
      current.getSeconds() +
      ":" +
      current.getMilliseconds() +
      ":" +
      "---->" +
      log +
      "\n";
    let filename: string = this.task.id + ".txt";
    if (fs.existsSync(filename)) {     
      fs.appendFile(filename, data, function (err: any) {
        console.log(err);
      });
    } else {
      fs.writeFile(filename, data, (err: any) => {
        console.log(err);
      });
    }
  }

  public setStatus(status: string) {
    this.task.status = status;
  }

  public getid() {
    return this.task.id;
  }

  public sendMessage(str: string) {
    for (let i = 0; i < bottasks.length; i++) {
      if (bottasks[i].id == this.task.id) {
        bottasks[i].message = str;
        break;
      }
    }
    updatetask();
  }

  public processTask() {
    let httpproxy;
    let activeproxy;
    if (this.proxylist.length > 0) {
      activeproxy = this.proxylist[
        Math.floor(Math.random() * 1000) % this.proxylist.length
      ];
      httpproxy = convertStringToProxy(
        activeproxy.ip +
          ":" +
          activeproxy.port +
          ":" +
          activeproxy.user +
          ":" +
          activeproxy.pass
      );
    }
    const http = new HttpClient(httpproxy);
    switch (this.task.status) {
      case "IDLE":
        this.sendMessage("START");
        this.saveLog("Task is started");
        fetchProductsByCategory(http, this.task.category)
          .then((res) => {
            const product = parseProductFromProducts(res, this.task.keyword);
            this.task.productID = product.id;
            if (product.id != "") {
              fetchProductStylesID(http, product.id).then((res) => {
                const product_styles = parseStyleFromStyles(
                  res,
                  this.task.style,
                  this.task.size
                );
                this.setStatus("FOUND");
                this.sendMessage("Found Product");
                this.task.sizeID = product_styles.size.id;
                this.task.styleID = product_styles.style.id;
                this.saveLog("Found Product");
                this.processTask();
              });
            }
            if (this.task.status == "STOP") {
              this.sendMessage("Stop");
              this.saveLog("Task is stopped");
              this.processTask();
            }
          })
          .catch((err) => {
            console.log(err);
            if (this.task.status == "STOP") {
              this.sendMessage("Stop");
              this.processTask();
            } else {
              this.sendMessage("Waiting for Product");
              this.processTask();
            }
          });
        break;
      case "FOUND":
        const product_url =
          "https://www.supremenewyork.com/mobile/#products/" +
          this.task.productID +
          "/" +
          this.task.styleID;
        let subtask: number = 0;
        (async () => {
          try {
            this.sendMessage("START ATC");
            const browser = await puppeteer.launch({
              executablePath: this.chromepath,
              headless: true,
              defaultViewport: null,
              args: activeproxy
                ? [`--proxy-server=${activeproxy.ip}:${activeproxy.port}`]
                : [],
            });

            const page = await browser.newPage();
            if (activeproxy) {
              page.authenticate({
                username: activeproxy.user,
                password: activeproxy.pass,
              });
            }
            if (this.task.status == "STOP") {
              this.sendMessage("Stop");
              this.processTask();
              try {
                await browser.close();
              } catch (error) {}
            }
            // await page.setRequestInterception(true);
            // page.on("request", (request: any) => {
            //   if (
            //     ["image", "stylesheet", "font"].indexOf(
            //       request.resourceType()
            //     ) !== -1
            //   ) {
            //     request.abort();
            //   } else {
            //     request.continue();
            //   }
            // });
            let task_finished = false;
            let atc_retrying = 0;
            while (!task_finished) {
              if (this.task.status == "STOP") {
                task_finished = true;
                this.sendMessage("Stop");
                this.processTask();
                try {
                  await browser.close();
                } catch (error) {}
                break;
              }
              switch (subtask) {
                case 0:
                  await page.goto(product_url);
                  if (this.task.status == "STOP") {
                    task_finished = true;
                    this.sendMessage("Stop");
                    this.processTask();
                    try {
                      await browser.close();
                    } catch (error) {}
                    break;
                  }
                  try {
                    await page.click("#cart-update>span");
                    if (this.task.status == "STOP") {
                      task_finished = true;
                      this.sendMessage("Stop");
                      this.processTask();
                      try {
                        await browser.close();
                      } catch (error) {}
                      break;
                    }
                    subtask = 1;
                  } catch (error) {}
                  break;
                case 1:
                  while (true) {                    
                    if (this.task.status == "STOP") {
                      task_finished = true;
                      this.sendMessage("Stop");
                      this.processTask();
                      try {
                        await browser.close();
                      } catch (error) {}
                      break;
                    }
                    this.sendMessage("Add to Cart");
                    try {
                      await page.click("#checkout-now>span");
                      if (this.task.status == "STOP") {
                        task_finished = true;
                        this.sendMessage("Stop");
                        this.processTask();
                        try {
                          await browser.close();
                        } catch (error) {}
                        break;
                      }
                      subtask = 2;
                      this.saveLog("ATC");
                      break;
                    } catch (error) {
                      await sleep(this.task.refreshtime);
                      if (atc_retrying > 8) {
                        subtask = 0;
                        atc_retrying = 0;
                        break;
                      }
                      atc_retrying++;
                    }
                  }
                  break;
                case 2:
                  this.sendMessage("Start Chekcout");
                  this.saveLog("Start Checkout");
                  if (this.task.status == "STOP") {
                    task_finished = true;
                    this.sendMessage("Stop");
                    this.processTask();
                    try {
                      await browser.close();
                    } catch (error) {}
                    break;
                  }
                  while (true) {
                    try {
                      await page.$eval(
                        "#order_billing_name",
                        (el: any, value: string) => (el.value = value),
                        this.profile.name
                      );

                      await page.$eval(
                        "#order_email",
                        (el: any, value: string) => (el.value = value),
                        this.profile.email
                      );

                      await page.$eval(
                        "#order_tel",
                        (el: any, value: string) => (el.value = value),
                        this.profile.phone
                      );

                      await page.$eval(
                        "#order_billing_zip",
                        (el: any, value: string) => (el.value = value),
                        this.profile.postalcode
                      );

                      //  await page.select('#order_billing_state', botprofile.state);
                      await page.$eval(
                        "#order_billing_state",
                        (el: any, value: string) => (el.value = value),
                        this.profile.state
                      );
                      await page.$eval(
                        "#order_billing_city",
                        (el: any, value: string) => (el.value = value),
                        this.profile.city
                      );

                      await page.$eval(
                        "#order_billing_address",
                        (el: any, value: string) => (el.value = value),
                        this.profile.address1
                      );

                      await page.select(
                        "#credit_card_type",
                        this.profile.cardtype
                      );

                      await page.$eval(
                        "#credit_card_n",
                        (el: any, value: string) => (el.value = value),
                        this.profile.cardnumber
                      );                  
                      await page.$eval(
                        "#credit_card_month",
                        (el: any, value: string) => (el.value = value),
                        this.profile.exp_month
                      );

                      await page.$eval(
                        "#credit_card_year",
                        (el: any, value: string) => (el.value = value),
                        this.profile.exp_year
                      );

                      await page.$eval(
                        "#credit_card_cvv",
                        (el: any, value: string) => (el.value = value),
                        this.profile.securitycode
                      );
                      await page.$eval(
                        "#order_terms",
                        (el: any, value: string) => (el.value = value),
                        "1"
                      );
                      await page.click("#order_terms");                     
                      while (captchatokens.length == 0) {
                        this.sendMessage("Wait for Captcha");
                        this.saveLog("Waiting for Captcha");
                        if (this.task.refreshtime < 100)
                        {
                          await sleep(400);
                        }
                        await sleep(this.task.refreshtime);
                         if (this.task.status == "STOP") {
                           task_finished = true;
                           this.sendMessage("Stop");
                           this.processTask();
                           try {
                             await browser.close();
                           } catch (error) {}
                           break;
                         }
                      }
                      await page.$eval(
                        "#g-recaptcha-response",
                        (el: any, value: string) => (el.value = value),
                        captchatokens[0].token
                      );
                      captchatokens.splice(0, 1);
                      await sleep(this.task.checkoutdelay);
                      let [response] = await Promise.all([
                        page.waitForResponse((response: any) =>
                          response.url().includes("checkout")
                        ),
                        page.click("#submit_button"),
                      ]);
                      let checkresult = false;
                      while (!checkresult) {
                        const resObj = await response.json();
                        this.saveLog(JSON.stringify(resObj));
                        switch (resObj.status) {
                          case "failed":
                            this.sendMessage("Failed");
                            checkresult = true;
                            break;
                          case "paid":
                            this.sendMessage("Success");
                            checkresult = true;
                            break;
                          case "queued":
                            this.sendMessage("Processing");
                            checkresult = true;
                            break;
                          case "dup":
                            this.sendMessage("Duplicate");
                            checkresult = true;
                            break;
                          case "outOfStock":
                            this.task.status = "FOUND";
                            this.sendMessage("Restock");
                            checkresult = true;
                            this.processTask();
                            break;
                          case "blacklisted":
                            this.sendMessage("BlackListed");
                            checkresult = true;
                            break;
                          default:
                            checkresult = true;
                            break;
                        }
                      }
                      subtask = 3;
                      task_finished = true;
                      try {
                        await browser.close();
                      } catch (error) {}
                      break;
                    } catch (error) {
                      await sleep(this.task.refreshtime);
                    }
                  }
                  break;
                default:
                  break;
              }
            }
          } catch (error) {
            console.log(error);
          }
        })();
        break;
      default:
        break;
    }
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

ipcMain.on("harvest", (event: any, arg: any) => {
 if (capapilist.length > 0) {
   capapilist.forEach((element) => {
     HarvestCaptcha(element);
   });
 }
});

function HarvestCaptcha(api: string) {
  request2Captcha(api);
}

function request2Captcha(apiKey: string) {
  try {
    let captchatoken = "";
    request(
      getcaptchaRequest_URL(apiKey),
      async function (error: any, response: any, body: any) {
        if (error) {
          captchatoken = "error";
          return;
        }
        let id = JSON.parse(body).request;
        for (let i = 0; i < 100; i++) {
          await sleep(300);
          let result: any = await doRequest(captchaRESULT_URL(apiKey, id));
          if (result != "error") {
            let json_res = JSON.parse(result);
            if (json_res.status == "1") {
              captchatoken = json_res.request;
              let newcaptcha = {
                token: captchatoken,
                time: new Date().getTime() / 1000,
              };
              captchatokens.push(newcaptcha);
              break;
            } else if (json_res.request != "CAPCHA_NOT_READY") {
              captchatoken = "error";
            }
          }
        }
      }
    );
  } catch {}
}

function captchaRESULT_URL(apiKey: string, id: string) {
  return (
    "https://2captcha.com/res.php?key=" +
    apiKey +
    "&action=get&id=" +
    id +
    "&json=1"
  );
}

function getcaptchaRequest_URL(apiKey: string) {
  const siteKey = "6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz";
  return (
    "https://2captcha.com/in.php?key=" +
    apiKey +
    "&method=userrecaptcha&googlekey=" +
    siteKey +
    "&pageurl=https://www.supremenewyork.com/checkout&invisible=1&json=1"
  );
}

function doRequest(url: string) {
  return new Promise(function (resolve, reject) {
    request(url, function (error: any, res: any, body: any) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject("error");
      }
    });
  });
}

ipcMain.on("count", (event: any, arg: any) => {
  let curtime = new Date().getTime() / 1000;
  for (let i = 0; i < captchatokens.length; i++)  {
    if (curtime - captchatokens[i].time > 115) {
      captchatokens.splice(i, 1);      
    }
  }  
  event.returnValue = captchatokens.length;
});

ipcMain.on("log", (event: any, arg: any) => {
  let filename = arg + ".txt";
  const spawnObj = require("child_process").spawn,
    progToOpen = spawnObj("C:\\windows\\notepad.exe", [filename]);
});



ipcMain.on("runtask", (event:any, arg:string) => {
  try {
    let pretask: BotTask;
    let running = false;
    for (let i = 0; i < supBots.length; i++)
    {
      if (supBots[i].getid() == arg)
      {
        supBots[i].setStatus("IDLE");
        supBots[i].processTask();
        running = true;
        break;
      }
    }
    if (running == false) {
      for (let i = 0; i < bottasks.length; i++) {
        if (bottasks[i].id == arg) {
          pretask = bottasks[i];
          let newBot = new SupBot(pretask, getChromePath());
          supBots = supBots.concat(newBot);
          newBot.processTask();
          break;
        }
      }
    }  
  } catch {}
});

ipcMain.on("stoptask", (event:any, arg:string) => {
  supBots.map((elebot) => {
    try {
      if (elebot.getid() == arg) {
        elebot.setStatus("STOP");
      }
    } catch (error) {}
  });
});

function checkchrome() {
  let path1 = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
  let path2 = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  try {
    if (fs.existsSync(path1)) {
      chromepath = path1;
      return;
    } 
  } catch (err) {
    console.error(err);
  }
  try {
    if (fs.existsSync(path2)) {
      chromepath = path2;
      return;
    }
  } catch (err) {
    console.error(err);
  }
}