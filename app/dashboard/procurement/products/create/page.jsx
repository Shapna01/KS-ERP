import { prisma } from "@/lib/prisma";
import CreateProductForm from "./CreateProductForm";

export default async function Page() {
  const vendors = await prisma.vendor.findMany();

  return (
    <CreateProductForm vendors={vendors} />
  );
}