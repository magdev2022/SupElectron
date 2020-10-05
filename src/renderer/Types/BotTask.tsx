import CustomProxy from "./CustomProxy";
export default interface BotTask {
  id: string;
  keyword:string;  
  style: string;
  size: string;
  category:string;
  profilename:string;    
  status: string;
  foundProduct: boolean;
  proxy: CustomProxy;
}
