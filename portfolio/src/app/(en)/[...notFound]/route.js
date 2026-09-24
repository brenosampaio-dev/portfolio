import { notFoundResponse } from "@/lib/notFoundResponse";

export function GET() {
  return notFoundResponse("en");
}
