export default interface AddTask {
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
}
