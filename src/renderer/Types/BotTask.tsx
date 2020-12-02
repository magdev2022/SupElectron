export default interface BotTask {
  id: string;
  keyword:string;  
  style: string;
  size: string;
  category:string;
  profilename:string;
  isCaptchaByPass:boolean;
  isUseProxy:boolean;    
  proxyname: string;
  refreshtime: number;
  checkoutdelay:number;
  status: string;
  message: string;
  productID:string;
  styleID:string;
  sizeID:string;
}
