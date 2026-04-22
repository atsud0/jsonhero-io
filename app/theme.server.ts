import { createCookieSessionStorage } from "remix";

import { Theme, isTheme } from "~/components/ThemeProvider";

function createThemeStorage(sessionSecret: string) {
  return createCookieSessionStorage({
    cookie: {
      name: "theme-cookie",
      secure: true,
      secrets: [sessionSecret],
      sameSite: "lax",
      path: "/",
      httpOnly: true,
    },
  });
}

async function getThemeSession(request: Request, sessionSecret: string) {
  const themeStorage = createThemeStorage(sessionSecret);
  const session = await themeStorage.getSession(request.headers.get("Cookie"));
  return {
    getTheme: () => {
      const themeValue = session.get("theme");
      return isTheme(themeValue) ? themeValue : "dark";
    },
    setTheme: (theme: Theme) => session.set("theme", theme),
    commit: () => themeStorage.commitSession(session),
  };
}

export { getThemeSession };
