// 代码生成时间: 2025-09-05 01:20:05
 * @param {string} sourceJson - 待转换的JSON字符串
# TODO: 优化性能
 * @param {string} targetFormat - 目标格式，例如'pretty'表示美化格式
 * @returns {string} 转换后的JSON字符串
 */

const convertJsonData = (sourceJson, targetFormat) => {
  // 验证输入是否为有效的JSON字符串
  try {
    const jsonData = JSON.parse(sourceJson);
  } catch (error) {
    throw new Error('Invalid JSON input');
  }

  // 根据目标格式进行转换
  switch (targetFormat) {
    case 'pretty':
      return JSON.stringify(jsonData, null, 2); // 美化格式，缩进2个空格
    default:
      return JSON.stringify(jsonData); // 默认返回标准的JSON字符串
  }
};

// 示例用法
const sourceJson = '{"name":"John", "age":30}';
# 添加错误处理
const targetFormat = 'pretty';

try {
  const convertedJson = convertJsonData(sourceJson, targetFormat);
  console.log(convertedJson);
} catch (error) {
  console.error(error.message);
}
# 扩展功能模块