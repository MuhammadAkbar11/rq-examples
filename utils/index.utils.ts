export function uFormatRupiah(value: number) {
  const result = value.toLocaleString("id", {
    style: "currency",
    currency: "IDR",
  });
  return result;
}

export function uFormatPercent(percent: number) {
  return Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(percent / 100);
}
