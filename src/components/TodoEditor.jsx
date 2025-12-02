import { useState } from "react";
import { repeatEveryDay, repeatEveryWeek } from "../utils/repeat";

const WEEK = ["일", "월", "화", "수", "목", "금", "토"];

function toLocal(ts = Date.now()) {
  const d = new Date(ts);
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(
    d.getHours()
  )}:${p(d.getMinutes())}`;
}

export default function TodoEditor({ onSubmit, initial }) {
  const isEdit = !!initial;
  const [text, setText] = useState(initial?.text ?? "");
  const [priority, setPriority] = useState(initial?.priority ?? "medium");

  const [repeatType, setRepeatType] = useState(initial?.repeat?.type ?? "none");
  const [repeatTime, setRepeatTime] = useState(
    initial?.repeat?.time ?? "09:00"
  );
  const [repeatDays, setRepeatDays] = useState(initial?.repeat?.days ?? []);

  const [dueAtLocal, setDueAtLocal] = useState(
    repeatType === "none" ? toLocal(initial?.dueAt ?? Date.now()) : toLocal()
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
      const parsed = Date.parse(dueAtLocal);
      dueAt = isNaN(parsed) ? Date.now() : parsed;
      repeat = { type: "none" };
    } else if (repeatType === "daily") {
      repeat = { type: "daily", time: repeatTime };
      dueAt = repeatEveryDay(Date.now(), repeatTime);
    } else {
      repeat = { type: "weekly", days: repeatDays, time: repeatTime };
      dueAt = repeatEveryWeek(Date.now(), repeatDays, repeatTime);
    }

    onSubmit({ text, priority, dueAt, repeat });

    if (!isEdit) {
      setText("");
      setPriority("medium");
      setRepeatType("none");
      setRepeatDays([]);
      setRepeatTime("09:00");
      setDueAtLocal(toLocal());
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
        <input
          className="input"
          type="datetime-local"
          value={dueAtLocal}
          onChange={(e) => setDueAtLocal(e.target.value)}
        />
      ) : (
        <input
          className="input"
          type="time"
          value={repeatTime}
          onChange={(e) => setRepeatTime(e.target.value)}
        />
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
