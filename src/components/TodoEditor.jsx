import { useState } from "react";
import { repeatEveryDay, repeatEveryWeek } from "../utils/repeat";

const WEEK = ["일", "월", "화", "수", "목", "금", "토"];
const pad = (n) => String(n).padStart(2, "0");

function toDateOnly(ts = Date.now()) {
  const d = new Date(ts);
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function combineLocalDateTime(dateStr, hours, minutes) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date();
  dt.setFullYear(y, (m ?? 1) - 1, d ?? 1);
  dt.setHours(hours ?? 0, minutes ?? 0, 0, 0);
  return dt.getTime();
}

export default function TodoEditor({ onSubmit, initial }) {
  const isEdit = !!initial;

  const [text, setText] = useState(initial?.text ?? "");
  const [priority, setPriority] = useState(initial?.priority ?? "medium");
  const [repeatType, setRepeatType] = useState(initial?.repeat?.type ?? "none");
  const [repeatDays, setRepeatDays] = useState(initial?.repeat?.days ?? []);

  const initTimeParts = (initial?.repeat?.time ?? "09:00")
    .split(":")
    .map((x) => Number(x));
  const [hour, setHour] = useState(
    repeatType === "none"
      ? new Date(initial?.dueAt ?? Date.now()).getHours()
      : initTimeParts[0] ?? 9
  );
  const [minute, setMinute] = useState(
    repeatType === "none"
      ? new Date(initial?.dueAt ?? Date.now()).getMinutes()
      : initTimeParts[1] ?? 0
  );

  const [dateOnly, setDateOnly] = useState(
    repeatType === "none"
      ? toDateOnly(initial?.dueAt ?? Date.now())
      : toDateOnly()
  );

  const toggleDay = (d) => {
    setRepeatDays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    let repeat;
    let dueAt;

    if (repeatType === "none") {
      dueAt = combineLocalDateTime(dateOnly, hour, minute);
      repeat = { type: "none" };
    } else if (repeatType === "daily") {
      const t = `${pad(hour)}:${pad(minute)}`;
      repeat = { type: "daily", time: t };
      dueAt = repeatEveryDay(Date.now(), t);
    } else {
      const t = `${pad(hour)}:${pad(minute)}`;
      repeat = { type: "weekly", days: repeatDays, time: t };
      dueAt = repeatEveryWeek(Date.now(), repeatDays, t);
    }

    onSubmit({ text, priority, dueAt, repeat });

    if (!isEdit) {
      setText("");
      setPriority("medium");
      setRepeatType("none");
      setRepeatDays([]);
      setHour(9);
      setMinute(0);
      setDateOnly(toDateOnly());
    }
  };

  return (
    <form className="editor" onSubmit={handleSubmit}>
      <input
        className="input"
        placeholder="할 일 입력"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
        className="select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="high">중요</option>
        <option value="medium">보통</option>
        <option value="low">낮음</option>
      </select>

      <select
        className="select"
        value={repeatType}
        onChange={(e) => setRepeatType(e.target.value)}
      >
        <option value="none">반복 없음</option>
        <option value="daily">매일</option>
        <option value="weekly">매주</option>
      </select>

      {repeatType === "none" ? (
        <div style={{ display: "flex", gap: 8 }}>
          <input
            className="input"
            type="date"
            value={dateOnly}
            onChange={(e) => setDateOnly(e.target.value)}
          />
          <select
            className="select"
            value={hour}
            onChange={(e) => setHour(Number(e.target.value))}
          >
            {Array.from({ length: 24 }, (_, i) => i).map((h) => (
              <option key={h} value={h}>
                {pad(h)} 시
              </option>
            ))}
          </select>
          <select
            className="select"
            value={minute}
            onChange={(e) => setMinute(Number(e.target.value))}
          >
            {Array.from({ length: 60 }, (_, i) => i).map((m) => (
              <option key={m} value={m}>
                {pad(m)} 분
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8 }}>
          <select
            className="select"
            value={hour}
            onChange={(e) => setHour(Number(e.target.value))}
          >
            {Array.from({ length: 24 }, (_, i) => i).map((h) => (
              <option key={h} value={h}>
                {pad(h)} 시
              </option>
            ))}
          </select>
          <select
            className="select"
            value={minute}
            onChange={(e) => setMinute(Number(e.target.value))}
          >
            {Array.from({ length: 60 }, (_, i) => i).map((m) => (
              <option key={m} value={m}>
                {pad(m)} 분
              </option>
            ))}
          </select>
        </div>
      )}

      {repeatType === "weekly" && (
        <div className="week-box">
          {WEEK.map((label, i) => (
            <label key={i}>
              <input
                type="checkbox"
                checked={repeatDays.includes(i)}
                onChange={() => toggleDay(i)}
              />
              {label}
            </label>
          ))}
        </div>
      )}

      <button className="btn primary" type="submit">
        {isEdit ? "수정" : "추가"}
      </button>
    </form>
  );
}
