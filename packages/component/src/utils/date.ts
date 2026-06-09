const MONTH_YEAR_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

export function formatMonthAndYear(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "an unknown date";

  return MONTH_YEAR_FORMATTER.format(parsedDate);
}
