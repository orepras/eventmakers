"use server";

export async function registerAction(_, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || !password) {
    return {
      status: "error",
      message: "All fields are required",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  return {
    status: "success",
    message: "User registered!",
  };
}
