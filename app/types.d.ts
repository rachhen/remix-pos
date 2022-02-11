export type FlashStatus = "success" | "info" | "warning" | "error";
export type FlashType = {
  status?: FlashStatus;
  message?: string;
};
