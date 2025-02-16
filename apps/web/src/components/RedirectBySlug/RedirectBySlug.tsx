import type React from "react";

import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import * as API from "../../utils/api";
import { isValidHttpUrl } from "../../utils/validate.url";

const RedirectComponent: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { isLoading, isError } = useQuery([slug], () => API.redirectSlug(slug), {
    enabled: !!slug,
    retry: false,
    onError: (/*error: Error*/) => {
      //console.log("[RedirectComponent] onError: ", error);
      return navigate("/404");
    },
    onSuccess: (result) => {
      if (result?.data?.attributes?.originalUrl) {
        const originalUrl = result.data.attributes.originalUrl;
        if (isValidHttpUrl(originalUrl)) {
          window.location.href = originalUrl;
          return;
        }
      }

      return navigate("/404");
    },
  });

  if (isError) return <div>Redirect failed</div>;
  if (isLoading) return <div>Loading ...</div>;

  return <div>Redirecting...</div>;
};

export default RedirectComponent;
