import { json, redirect } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import { getThemeSession } from "~/theme.server";
import { isTheme } from "~/components/ThemeProvider";
import { sendEvent } from "~/graphJSON.server";
import type { RuntimeLoadContext } from "~/runtime-context.server";

export const action: ActionFunction = async ({ request, context }) => {
  const loadContext = context as RuntimeLoadContext;
  const themeSession = await getThemeSession(
    request,
    loadContext.SESSION_SECRET
  );
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const theme = form.get("theme");

  if (!isTheme(theme)) {
    return json({
      success: false,
      message: `theme value of ${theme} is not a valid theme`,
    });
  }

  themeSession.setTheme(theme);

  context.waitUntil(
    sendEvent({
      type: "set-theme",
      theme,
    })
  );

  return json(
    { success: true },
    { headers: { "Set-Cookie": await themeSession.commit() } }
  );
};

export const loader: LoaderFunction = () => redirect("/", { status: 404 });
