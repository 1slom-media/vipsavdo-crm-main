import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export const AuthGuard = (props) => {
  const { children } = props;
  const auth = useSelector((state) => state.auth.token);
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (!auth) {
        router
          .push({
            pathname: "/authentication/login",
            query: { returnUrl: router.asPath },
          })
          .catch(console.error);
      } else {
        setChecked(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady]
  );

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
