const rp = require("request-promise");
import {convertProxyToRequestURL} from '../utils/ProxyUtils/index'
export default class HttpClient {
  activeProxy:any;
  constructor(activeProxy:any)
  {
    this.activeProxy = activeProxy;
  }

  defaultRequestOptions =()=>{
    const options = {
      proxy:""
    };
    if (this.activeProxy) {
      options.proxy = convertProxyToRequestURL(this.activeProxy);
    }
    return options;
  }
  async get(uri:string, json = true) {
    const options = {
      uri,
      json
    };
    return await rp(Object.assign(options, this.defaultRequestOptions(), {}));
  }  
};
