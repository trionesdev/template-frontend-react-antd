import dayjs from "dayjs";
import _ from "lodash";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

export class DateUtils {
  static formatDate = (date?: number | undefined) => {
    if (date) {
      return dayjs(date).format("YYYY-MM-DD");
    }
  };

  static formatDateTime = (date?: number | undefined) => {
    if (date) {
      return dayjs(date).format("YYYY-MM-DD HH:mm");
    }
  };

  static format = (date: number, format: string) => {
    if (date) {
      return dayjs(date).format(format);
    }
  };

  static fromNow = (date: number) => {
    if (!date) {
      return "";
    }
    return dayjs(date).fromNow();
  };

  static chatsLine = (date: number) => {
    if (date) {
      let diffMinute = dayjs().diff(date, "minute");
      if (diffMinute < 5) {
        return "刚刚";
      }
      if (dayjs().isSame(date, "date")) {
        return dayjs(date).format("HH:mm");
      }
      return dayjs(date).format("YYYY-MM-DD HH:mm");
    }
  };

  static dateParse = (date: any) => {
    if (!date) {
      return null;
    }
    let res = dayjs();
    if (_.isArray(date)) {
      _.forEach(date, (v, i) => {
        switch (i) {
          case 0:
            res = res.year(v);
            break;
          case 1:
            res = res.month(v - 1);
            break;
          case 2:
            res = res.date(v);
            break;
          default:
            break;
        }
      });
    }
    return res;
  };
}
