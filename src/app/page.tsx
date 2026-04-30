import { permanentRedirect } from "next/navigation";

export default function DefaultPage() {
  permanentRedirect("/posts");
}
