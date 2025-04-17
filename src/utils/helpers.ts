export const getDayName = (date: string | number | Date): string => {
  try {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
      new Date(date).getDay()
    ];
  } catch (error) {
    console.error("Invalid date provided to getDayName:", date);
    return "";
  }
};

export const formatTime = (timestamp: number): string => {
  try {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch (error) {
    console.error("Invalid timestamp provided to formatTime:", timestamp);
    return "";
  }
};

export const getCurrentDate = (): string => {
  try {
    const now = new Date();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[now.getMonth()]} ${now.getDate()}, ${formatTime(
      Math.floor(now.getTime() / 1000)
    )}`;
  } catch (error) {
    console.error("Error generating current date");
    return "";
  }
};
