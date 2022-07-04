export function formatMoney(dinero) {
  return dinero.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
export function pricePerMonth(times) {
  switch (times) {
    case 2:
      return 4000;
    case 3:
      return 4500;
    case 4:
      return 5000;
    case 5:
      return 5200;
    case 6:
      return 5500;
    default:
      return;
  }
}
