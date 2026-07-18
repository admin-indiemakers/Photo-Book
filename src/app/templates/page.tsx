import { Metadata } from "next";
import TemplatesClient from "./TemplatesClient";

export const metadata: Metadata = {
  title: "Templates | Offline Living",
  description: "Browse our collection of handpicked photobook templates for every story and occasion.",
};

export default function TemplatesPage() {
  return <TemplatesClient />;
}
