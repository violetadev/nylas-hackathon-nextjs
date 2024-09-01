import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { useGlobalContext } from "../../context/globalContext";
import { getDaysArray } from "../../helpers/helpers";
import { Box } from "@mui/system";
import { fetchEventsByMonth } from "../../fetch/helpers";
import theme from "../../styles";

const initialValue = dayjs(new Date());

function ServerDay(
  props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !outsideCurrentMonth && highlightedDays.includes(day.date());

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🟢" : undefined}
    >
      <PickersDay
        sx={{ background: "#191e1e", paddingBottom: "0" }}
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

type CalendarProps = {
  onDateSelector: (date: Date) => void;
};

export const Calendar = ({ onDateSelector }: CalendarProps) => {
  const { globalContext, setGlobalContext } = useGlobalContext();
  const [currentMonth, setCurrentMonth] = useState(initialValue);

  const fetchHighlightedDays = async (formattedDate: string) => {
    const response = await fetchEventsByMonth(formattedDate);

    setGlobalContext((prev) => ({ ...prev, selectedMonthEvents: response }));

    return getDaysArray(response);
  };

  const { data: highlightedDays = [], isLoading } = useQuery({
    queryKey: ["highlightedDays", currentMonth.format("YYYY-MM")],
    queryFn: () =>
      globalContext && fetchHighlightedDays(currentMonth.format("YYYY-MM")),
    enabled: !!globalContext?.calendar,
    staleTime: 300000,
  });

  const handleMonthChange = (date: Dayjs) => {
    setCurrentMonth(date);
  };

  const handleDateChange = (date) => {
    if (date.$d) {
      onDateSelector(date.$d);
    }
  };

  return (
    <Box
      sx={{
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
        borderRadius: "8px",
        padding: "0 14px",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          sx={{
            width: "inherit",
            background: "#090b0b",
            borderRadius: "12px",
            padding: "14px",
          }}
          defaultValue={initialValue}
          loading={isLoading}
          onChange={handleDateChange}
          onMonthChange={handleMonthChange}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays,
            } as any,
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};
