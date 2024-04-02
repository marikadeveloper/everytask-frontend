import dayjs from "dayjs";
import isTodayPlugin from "dayjs/plugin/isToday";
import objectPlugin from "dayjs/plugin/toObject";
import weekdayPlugin from "dayjs/plugin/weekday";
import { useEffect, useMemo, useState } from "react";
// Extend Day.js globally
dayjs.extend(weekdayPlugin);
dayjs.extend(objectPlugin);
dayjs.extend(isTodayPlugin);

const Header = ({ currentMonth, onPrevMonth, onNextMonth }) => {
  const dateFormat = "MMMM YYYY";
  return (
    <div className="header row flex-middle">
      <div className="col col-start" onClick={onPrevMonth}>
        <div className="icon">chevron_left</div>
      </div>
      <div className="col col-center">
        <span>{currentMonth.format(dateFormat)}</span>
      </div>
      <div className="col col-end" onClick={onNextMonth}>
        <div className="icon">chevron_right</div>
      </div>
    </div>
  );
};

const DaysHeader = () => {
  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) =>
      dayjs().weekday(i).format("dddd"),
    );
  }, []);
  return (
    <div className="days row">
      {days.map((day, i) => (
        <div className="col col-center" key={i}>
          {day}
        </div>
      ))}
    </div>
  );
};

const Cells = ({ arrayOfDays }) => {
  return (
    <div className="body">
      {arrayOfDays.map((week, index) => (
        <div className="row" key={index}>
          {week.dates.map((d, i) => (
            <div
              className={`col cell ${!d.isCurrentMonth ? "disabled" : d.isCurrentDay ? "selected" : ""}`}
              key={i}
            >
              <span className="number">{d.day}</span>
              <span className="bg">{d.day}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

function Calendar() {
  const now = dayjs();
  const [currentMonth, setCurrentMonth] = useState(now);
  const [arrayOfDays, setArrayOfDays] = useState([]);

  const nextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));
  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));

  const getAllDays = useMemo(() => {
    let currentDate = currentMonth.startOf("month").weekday(0);
    const nextMonthStart = currentMonth.add(1, "month").startOf("month");
    const allDates = [];
    let weekDates = [];
    let weekCounter = 1;

    while (currentDate.isBefore(nextMonthStart, "day")) {
      const formatted = {
        day: currentDate.date(),
        month: currentDate.month(),
        year: currentDate.year(),
        isCurrentMonth: currentDate.month() === currentMonth.month(),
        isCurrentDay: currentDate.isToday(),
      };

      weekDates.push(formatted);

      if (
        weekCounter % 7 === 0 ||
        currentDate.add(1, "day").isSame(nextMonthStart, "day")
      ) {
        allDates.push({ dates: weekDates });
        weekDates = [];
      }

      weekCounter++;
      currentDate = currentDate.add(1, "day");
    }

    return allDates;
  }, [currentMonth]);

  useEffect(() => {
    setArrayOfDays(getAllDays);
  }, [getAllDays]);

  return (
    <div className="calendar">
      <Header
        currentMonth={currentMonth}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
      />
      <DaysHeader />
      <Cells arrayOfDays={arrayOfDays} />
    </div>
  );
}

export default Calendar;
