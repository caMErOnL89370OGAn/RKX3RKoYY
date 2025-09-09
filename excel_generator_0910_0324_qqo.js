// 代码生成时间: 2025-09-10 03:24:59
const ExcelJS = require('exceljs');

/**
 * Excel表格自动生成器
 * @param {object} options - 配置对象，包含工作表名称、数据和样式等信息
 */
async function generateExcel(options) {
  try {
    // 创建一个新的工作簿
    const workbook = new ExcelJS.Workbook();

    // 添加一个新的工作表
    const worksheet = workbook.addWorksheet(options.sheetName);

    // 设置工作表的默认行高和列宽
    worksheet.getDefaultRowHeight(20);
    worksheet.properties.defaultColWidth = 20;

    // 添加标题行
    if (options.title) {
      worksheet.addRow(options.title);
    }

    // 添加数据行
    for (const row of options.data) {
      worksheet.addRow(row);
    }

    // 应用样式
    if (options.styles) {
      options.styles.forEach(style => {
        worksheet.getRow(style.rowIndex).font = {
          bold: style.bold,
          color: { argb: style.color },
        };
      });
    }

    // 导出工作簿到文件
    await workbook.xlsx.writeFile(options.filePath);

    console.log('Excel文件已生成');
  } catch (error) {
    console.error('生成Excel文件时发生错误:', error);
  }
}

/**
 * 使用示例
 */
const options = {
  sheetName: '示例工作表',
  title: ['姓名', '年龄', '职业'],
  data: [
    ['张三', 28, '工程师'],
    ['李四', 25, '设计师'],
    ['王五', 32, '产品经理']
  ],
  styles: [{
    rowIndex: 1,
    bold: true,
    color: 'FFFFFFFF' // 白色
  }],
  filePath: './example.xlsx'
};

generateExcel(options);