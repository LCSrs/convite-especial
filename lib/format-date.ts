export function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;

  const parsed = new Date(Number(year), Number(month) - 1, Number(day));
  return parsed.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTime(time: string) {
  const [hours, minutes] = time.split(":");
  if (!hours || !minutes) return time;

  return `${hours}h${minutes}`;
}
