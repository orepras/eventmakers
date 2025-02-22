import { prisma } from "@/utils/prisma";
import * as bcrypt from "bcrypt";

export async function registerAction(_, formData) {
  const name = formData.get("Full name");
  const email = formData.get("email");
  const password = formData.get("password");
  const rePassword = formData.get("rePassword");

  if ((!name, !email || !password || !rePassword)) {
    return {
      status: error,
      message: "All fields are required",
    };
  }

  if (password !== rePassword) {
    return {
      status: error,
      message: "Password do not match",
    };
  }

  const existingEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingEmail) {
    return {
      status: error,
      message: "User already registered",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return {
    status: true,
    message: "user registered sucessfully",
  };
}
