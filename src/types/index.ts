export interface MediaResult {
  success: boolean;
  title: string;
  thumbnail: string;
  username: string;
  duration: string;
  type: "video" | "image";
  downloadUrl: string;
  error?: string;
}
