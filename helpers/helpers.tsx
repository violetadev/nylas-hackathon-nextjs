import { format, fromUnixTime, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { Event } from "nylas";

export const transformTimeslot = (startTime, endTime, timezone) => {
  const startDate = toZonedTime(fromUnixTime(startTime), timezone);
  const endDate = toZonedTime(fromUnixTime(endTime), timezone);

  const timeslot = `${format(startDate, "h:mmaaa")} to ${format(
    endDate,
    "h:mmaaa"
  )}`;
  const date = format(startDate, "MMM d, yyyy");

  return `${date} at ${timeslot}`;
};

export const transformDateRange = (startDate, endDate) => {
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  const startYear = format(start, "yyyy");
  const endYear = format(end, "yyyy");

  if (startYear === endYear) {
    return `${format(start, "MMM d")} to ${format(end, "MMM d, yyyy")}`;
  } else {
    return `From ${format(start, "MMM d, yyyy")} to ${format(
      end,
      "MMM d, yyyy"
    )}`;
  }
};

export const normalizeTimeToDate = (rawTime) => {
  const normalizedDate = new Date(Number(rawTime) * 1000);

  return normalizedDate;
};

export const normalizeDateStampToDate = (rawDate) => {
  const normalizedDate = new Date(rawDate);
  return normalizedDate;
};

export const normalizeTimeOrDate = (rawDate: any) => {
  let formattedDate;
  if (rawDate.object === "timespan") {
    const date = normalizeTimeToDate(rawDate.start_time);
    formattedDate = date.getDate();
  } else {
    const date = normalizeDateStampToDate(rawDate.start_date);
    formattedDate = date.getDate();
  }

  return formattedDate;
};

export const getDaysArray = (events: Event[]) => {
  const dates: Array<any> = [];
  events.forEach((event) => {
    const formattedDate = normalizeTimeOrDate(event.when);

    if (formattedDate) {
      dates.push(formattedDate);
    }
  });

  return dates;
};
