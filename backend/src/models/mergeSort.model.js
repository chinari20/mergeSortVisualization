export function generateMergeSortSteps(arr) {
  const steps = [];

  function mergeSort(left, right) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    steps.push({
      action: "divide",
      left,
      mid,
      right,
      message: `Dividing array from index ${left} to ${right}`
    });

    mergeSort(left, mid);
    mergeSort(mid + 1, right);
    merge(left, mid, right);
  }

  function merge(left, mid, right) {
    const temp = [];
    let i = left;
    let j = mid + 1;

    while (i <= mid && j <= right) {
      temp.push(arr[i] <= arr[j] ? arr[i++] : arr[j++]);
    }

    while (i <= mid) temp.push(arr[i++]);
    while (j <= right) temp.push(arr[j++]);

    for (let k = left; k <= right; k++) {
      arr[k] = temp[k - left];

      steps.push({
        action: "merge",
        index: k,
        value: arr[k],
        message: `Placing ${arr[k]} at index ${k}`
      });
    }
  }

  mergeSort(0, arr.length - 1);
  return steps;
}
