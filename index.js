/**
 * Created by ljm on 16-11-8.
 */
import path from 'path';

export default {
  get: function get(file, context) {
    if (context) file = path.resolve(context, file);

    let sepIndex = file.lastIndexOf('/');
    // 获取环境变量功能
    if (sepIndex < 0) return process.env[file];

    // 获取配置文件变量功能
    let contextPath = file.substring(0, sepIndex);
    let fileQuery = file.substring(sepIndex + 1);
    let [filename, objPath] = fileQuery.split('::', 2);
    let nodeEnv = get('NODE_ENV') || 'development';
    let config = require(path.resolve(contextPath, `${filename}.${nodeEnv}`));
    config = config.default ? config.default : config;
    if (!objPath) return config;

    // 内部变量
    let parts = objPath.split('.');
    for (let part of parts) {
      if (config === null || ((typeof config) !== 'object')) {
        throw new Error(`Cannot read property of a ${typeof config}`);
      }
      config = config[part];
    }
    return config;
  }
};
