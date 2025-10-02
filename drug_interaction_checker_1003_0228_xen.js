// 代码生成时间: 2025-10-03 02:28:22
const fs = require('fs');
const path = require('path');

// 药物相互作用检查器
class DrugInteractionChecker {
  // 构造函数，加载药物相互作用数据
  constructor(dataPath) {
    this.dataPath = dataPath;
    this.drugInteractions = this.loadInteractionData();
  }

  // 加载药物相互作用数据
  loadInteractionData() {
    try {
      const data = fs.readFileSync(path.join(__dirname, this.dataPath), 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to load drug interaction data:', error);
      throw error;
    }
  }

  // 检查药物相互作用
  checkInteractions(drugs) {
    if (!Array.isArray(drugs)) {
      throw new Error('Drugs must be an array');
    }

    const interactions = this.drugInteractions;
    const checkedDrugs = drugs.map(drug => drug.toLowerCase());
    const results = [];

    for (const drug of checkedDrugs) {
      if (interactions[drug]) {
        const warnings = interactions[drug].map(interaction => ({
          drug: interaction.drug,
          warning: interaction.warning
        }));
        results.push(...warnings);
      }
    }

    return results;
  }
}

// 示例用法
const checker = new DrugInteractionChecker('drug_interactions.json');

try {
  const drugsToCheck = ['Aspirin', 'Ibuprofen'];
  const interactions = checker.checkInteractions(drugsToCheck);

  console.log('Drug interactions:', interactions);
} catch (error) {
  console.error('An error occurred:', error.message);
}

// 注意：请确保'drug_interactions.json'文件位于项目根目录，
// 并包含正确的药物相互作用数据。
