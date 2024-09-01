import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./useAuth";
import { Loading } from "../components/Loading";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/admin/login");
      }
    }, [user, loading]);

    if (loading) {
      return <Loading />;
    }

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
