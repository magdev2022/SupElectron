module.exports.convertProxyToRequestURL = proxy => {
  return proxy.auth
    ? `http://${proxy.auth.username}:${proxy.auth.password}@${proxy.ip}:${proxy.port}`
    : `http://${proxy.ip}:${proxy.port}`;
};

module.exports.convertProxyToString = proxy => {
  let formatted = `${proxy.ip}:${proxy.port}`;
  if (proxy.auth) formatted += `:${proxy.auth.username}:${proxy.auth.password}`;
  return formatted;
};

const convertStringToProxy = input => {
  const components = input.trim().split(":");
  let proxy = {
    ip: components[0],
    port: parseInt(components[1], 10)
  };
  if (components.length === 4) {
    proxy.auth = {
      username: components[2],
      password: components[3]
    };
  }
  return proxy;
};
module.exports.convertStringToProxy = convertStringToProxy;

module.exports.convertStringToProxies = text => {
  const separated = text.split("\n");
  return separated
    .filter(
      item => item.split(":").length === 2 || item.split(":").length === 4
    )
    .map(convertStringToProxy);
};
