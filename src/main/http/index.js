const { convertProxyToRequestURL } = require('../utils/ProxyUtils')
const rp = require("request-promise");

module.exports = class HttpClient {
  constructor(activeProxy) {
    this.post = this.post.bind(this);
    this.jar = rp.jar();
    this.defaultRequestOptions = () => {
      const options = {
        jar: this.jar
      };
      if (activeProxy) {
        options.proxy = convertProxyToRequestURL(activeProxy);
      }
      return options;
    };
  }

  setCookie(toughCookie, host) {
    return new Promise((resolve, reject) => {
      this.jar.setCookie(toughCookie, host, (err, cookie) => {
        err ? reject(err) : resolve(cookie);
      });
    });
  }

  generateCookie(key, value) {
    return `${key}=${value}; path=/; domain=www.supremenewyork.com`;
  }

  async addCookies(process, cookies) {
    let c = [];
    for (let key of Object.keys(cookies)) {      
      c.push(
        await this.setCookie(
          this.generateCookie(key, cookies[key]),
          "https://www.supremenewyork.com"
        )
      );
    }
    return c;
  }

  async get(uri, json = true) {
    const options = {
      uri,
      json
    };
    return await rp(Object.assign(options, this.defaultRequestOptions(), {}));
  }

  async post(uri, form, headers, json = false) {
    try {
      const options = {
        uri,
        method: "POST",
        json
      };
      options[json ? "body" : "form"] = form;
      if (headers) {
        options.headers = headers;
      }
      return await rp(Object.assign(options, this.defaultRequestOptions(), {}));
    } catch (err) {
      return err;
    }
  }
};
