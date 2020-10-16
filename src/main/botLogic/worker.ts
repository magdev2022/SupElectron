import TaskBoard from "@/renderer/Views/TaskBoard";
import AddTask from "../../renderer/Types/AddTask";
import AccountProfile from '../../renderer/Types/AccountProfile';
import { fetchProductsByCategory, fetchProductStylesID } from "../funcs/fetch";
import { parseProductFromProducts, parseStyleFromStyles } from "../funcs/parse";
import HttpClient from "../http/index";
const puppeteer = require("puppeteer");
let browser;
export const processtask = (newtask: AddTask, botprofile:AccountProfile) => {
  console.log("task is started");
  const http = new HttpClient("");
  let found_product;

  switch (newtask.status) {
    case "IDLE":
      fetchProductsByCategory(http, newtask.category)
        .then((res) => {
          const product = parseProductFromProducts(res, newtask.keyword);
          newtask.productID = product.id;
          if (product.id != "") {
            fetchProductStylesID(http, product.id).then((res) => {
              const product_styles = parseStyleFromStyles(
                res,
                newtask.style,
                newtask.size
              );
              newtask.status = "FOUND";
              newtask.sizeID = product_styles.size.id;
              newtask.styleID = product_styles.style.id;
              processtask(newtask,botprofile);
            });
          }
        })
        .catch((err) => {
          console.log(err);
          processtask(newtask,botprofile);
        });
      break;
    case "FOUND":
      const product_url =
        "https://www.supremenewyork.com/mobile/#products/" +
        newtask.productID +
        "/" +
        newtask.styleID;
      let subtask: number = 0;
      (async () => {
        try {
          const browser = await puppeteer.launch({
            executablePath:
              "D:\\Projects\\Electron\\WTAPS 1.3.0\\node_modules\\puppeteer\\.local-chromium\\win64-782078\\chrome-win\\chrome.exe",
            headless: false,
            defaultViewport: null,
          });

          const page = await browser.newPage();
          await page.setRequestInterception(true);
          page.on("request", (request: any) => {
            if (
              ["image", "stylesheet", "font"].indexOf(
                request.resourceType()
              ) !== -1
            ) {
              request.abort();
            } else {
              request.continue();
            }
          });
          let task_finished = false;
          let atc_retrying = 0;
          while (!task_finished) {
            switch (subtask) {
              case 0:
                await page.goto(product_url);
                try {
                  await page.click("#cart-update>span");
                  subtask = 1;
                } catch (error) {}
                break;
              case 1:
                while (true) {
                  console.log("get checkout");
                  try {
                    await page.click("#checkout-now>span");
                    subtask = 2;
                    break;
                  } catch (error) {
                    await sleep(500);
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
                while (true) {
                  try {
                    await page.$eval(
                      "#order_billing_name",
                      (el: any, value: string) => (el.value = value),
                      botprofile.name
                    );
                    
                    await page.$eval(
                      "#order_email",
                      (el: any, value: string) => (el.value = value),
                      botprofile.email
                    );
                    
                    await page.$eval(
                      "#order_tel",
                      (el: any, value: string) => (el.value = value),
                      botprofile.phone
                    );

                    await page.$eval(
                      "#order_billing_zip",
                      (el: any, value: string) => (el.value = value),
                      botprofile.postalcode
                    );                    

                  //  await page.select('#order_billing_state', botprofile.state);
                    await page.$eval(
                      "#order_billing_state",
                      (el: any, value: string) => (el.value = value),
                      botprofile.state
                    );          
                    await page.$eval(
                      "#order_billing_city",
                      (el: any, value: string) => (el.value = value),
                      botprofile.city
                    );
                    
                    await page.$eval(
                      "#order_billing_address",
                      (el: any, value: string) => (el.value = value),
                      botprofile.address1
                    );

                    await page.select('#credit_card_type', botprofile.cardtype);

                    await page.$eval(
                      "#credit_card_n",
                      (el: any, value: string) => (el.value = value),
                      botprofile.cardnumber
                    );
                    
                    await page.$eval(
                      "#credit_card_month",
                      (el: any, value: string) => (el.value = value),
                      botprofile.exp_month
                    );
                    
                    await page.$eval(
                      "#credit_card_year",
                      (el: any, value: string) => (el.value = value),
                      botprofile.exp_year
                    );
    
                    await page.$eval(
                      "#credit_card_cvv",
                      (el: any, value: string) => (el.value = value),
                      botprofile.securitycode
                    );    
                    await page.$eval(
                      "#order_terms",
                      (el: any, value: string) => (el.value = value),
                      botprofile.exp_year
                    );  
                    await page.click("#order_terms");
                    await page.click("#submit_button");
                    subtask=3;
                    task_finished=true;
                    break;
                  } catch (error) {                  
                    await sleep(300);
                  }
                }                
                break;
              default:
                break;
            }
          }
        } catch (error) {
          console.log("error found");
          console.log(error);
        }
      })();
      break;
    default:
      break;
  }
};

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
