export const convertProxyToRequestURL = (proxy:any) => {
  return proxy.auth
    ? `http://${proxy.auth.username}:${proxy.auth.password}@${proxy.ip}:${proxy.port}`
    : `http://${proxy.ip}:${proxy.port}`;
};

export const convertProxyToString = (proxy:any) => {
  let formatted = `${proxy.ip}:${proxy.port}`;
  if (proxy.auth) formatted += `:${proxy.auth.username}:${proxy.auth.password}`;
  return formatted;
};

export const convertStringToProxy = (input:string) => {
  const components = input.trim().split(":");
  let proxy = {
    ip: components[0],
    port: parseInt(components[1], 10),
    auth:{
    username:"",
    password:""
    }
  };
  if (components.length === 4) {
    proxy.auth = {
      username: components[2],
      password: components[3]
    };
  }
  return proxy;
};

export const convertStringToProxies = (text:string) => {
  const separated = text.split("\n");
  return separated
    .filter(
      item => item.split(":").length === 2 || item.split(":").length === 4
    )
    .map(convertStringToProxy);
};
