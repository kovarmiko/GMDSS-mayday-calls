import { DistressMessage } from "../types/types";

export function createEmptyMessage(): DistressMessage {
    return {
      boatName: '',
      boatCallSign: '',
      message: '',
      timestamp: 0,
    };
  }