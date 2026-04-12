import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function toSriLankaDateTime(date: Date) {
  return dayjs(date).tz('Asia/Colombo').format('YYYY-MM-DD HH:mm:ss');
}

export function toSriLankaDate(date: Date) {
  return dayjs(date).tz('Asia/Colombo').format('YYYY-MM-DD');
}

export function toSriLankaTime(date: Date) {
  return dayjs(date).tz('Asia/Colombo').format('HH:mm:ss');
}
