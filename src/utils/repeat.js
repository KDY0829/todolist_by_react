function parseTime(time) {
  const [h, m] = time.split(":").map(Number);
  return { h, m };
}

export function repeatEveryDay(base, time) {
  const { h, m } = parseTime(time);
  const now = new Date(base);

  const candidate = new Date(now);
  candidate.setHours(h, m, 0, 0);

  if (candidate.getTime() <= now.getTime()) {
    candidate.setDate(candidate.getDate() + 1);
  }

  return candidate.getTime();
}

export function repeatEveryWeek(base, days, time) {
  const now = new Date(base);
  const sorted = [...days].sort((a, b) => a - b);
  const { h, m } = parseTime(time);

  for (const dow of sorted) {
    const target = new Date(now);

    const diff = (dow - now.getDay() + 7) % 7;

    target.setDate(now.getDate() + diff);
    target.setHours(h, m, 0, 0);

    if (target.getTime() > now.getTime()) {
      return target.getTime();
    }
  }

  const next = new Date(now);
  const first = sorted[0];
  const diff = ((first - now.getDay() + 7) % 7) + 7;

  next.setDate(now.getDate() + diff);
  next.setHours(h, m, 0, 0);

  return next.getTime();
}

export function nextOccurrence(todo) {
  const base = Math.max(Date.now(), todo.dueAt);
  const r = todo.repeat;

  if (r.type === "none") return null;
  if (r.type === "daily") return repeatEveryDay(base, r.time);
  if (r.type === "weekly") return repeatEveryWeek(base, r.days, r.time);

  return null;
}
