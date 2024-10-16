"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Navbar = () => {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session");

  let userIsLoggedIn;

  if (!sessionCookie) userIsLoggedIn = false;
  else userIsLoggedIn = sessionCookie.value === "logged_in" ? true : false;

  const btnText = userIsLoggedIn ? "Sign Out" : "Sign In";

  const logoutUser = async () => {
    "use server";
    // Here you would call your API or any necessary logic to handle logout
    // For example, you could clear the session cookie here.
    const cookieStore = cookies();
    cookieStore.delete("session"); // Assuming "session" is the cookie name

    // Redirect to the home page after logout
    redirect("/");
  };

  return (
    <>
      <div className="navbar navbar-no-boxShadow pt-4">
        <div className="navbar-start">
          <a className="navbar-item">Deployment Workshop</a>
        </div>
        <div className="navbar-end pr-6">
          {userIsLoggedIn ? (
            <form action={logoutUser}>
              <button type="submit" className="btn btn-outline">
                {btnText}
              </button>
            </form>
          ) : (
            <a href="/login" className="btn btn-outline">
              {btnText}
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
