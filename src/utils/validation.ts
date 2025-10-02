export const validateForm = (
  data: Record<string, string>,
  type: "login" | "register" | "article"
) => {
  const errors: Record<string, string> = {};

  if (type === "login" || type === "register") {
    if (!data.email || !data.email.includes("@")) errors.email = "Email tidak valid";
    if (!data.password || data.password.length < 6) errors.password = "Password minimal 6 karakter";
  }

  if (type === "register") {
    if (!data.username) errors.username = "Username wajib diisi";
    if (data.password !== data.confirmPassword) errors.confirmPassword = "Password tidak cocok";
  }

  if (type === "article") {
    if (!data.title || data.title.length < 5) errors.title = "Judul minimal 5 karakter";
    if (!data.content || data.content.length < 20) errors.content = "Konten terlalu singkat";
  }

  return errors;
};
