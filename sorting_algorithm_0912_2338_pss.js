// 代码生成时间: 2025-09-12 23:38:24
const { performance } = require('perf_hooks');

/**
 * 排序算法实现
 */
class SortingAlgorithm {
  /**
   * 冒泡排序
   * @param {array} arr - 待排序数组
   * @returns {array} 排序后的数组
   */
  static bubbleSort(arr) {
    if (!Array.isArray(arr)) {
      throw new Error('Input must be an array');
    }
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // 交换元素位置
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  }

  /**
   * 快速排序
   * @param {array} arr - 待排序数组
   * @param {number} low - 左边界
   * @param {number} high - 右边界
   * @returns {array} 排序后的数组
   */
  static quickSort(arr, low = 0, high = arr.length - 1) {
    if (!Array.isArray(arr)) {
      throw new Error('Input must be an array');
    }
    if (low < high) {
      let pi = this.partition(arr, low, high);
      this.quickSort(arr, low, pi - 1);
      this.quickSort(arr, pi + 1, high);
    }
    return arr;
  }

  /**
   * 快速排序中的分区操作
   * @param {array} arr - 待分区数组
   * @param {number} low - 左边界
   * @param {number} high - 右边界
   * @returns {number} 枢纽元素的最终位置
   */
  static partition(arr, low, high) {
    let pivot = arr[high];
    let i = (low - 1);
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
  }

  /**
   * 测试排序算法性能
   * @param {function} sortFunc - 排序函数
   * @param {array} arr - 待排序数组
   */
  static testSortPerformance(sortFunc, arr) {
    const start = performance.now();
    sortFunc(arr);
    const end = performance.now();
    console.log(`Execution time: ${end - start} milliseconds`);
  }
}

// 示例用法
const numbers = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];

console.log('Original array:', numbers);
console.log('Sorted array (Bubble Sort):', SortingAlgorithm.bubbleSort([...numbers]));
console.log('Sorted array (Quick Sort):', SortingAlgorithm.quickSort([...numbers]));

// 测试性能
SortingAlgorithm.testSortPerformance(SortingAlgorithm.bubbleSort, [...numbers]);
SortingAlgorithm.testSortPerformance(SortingAlgorithm.quickSort, [...numbers]);