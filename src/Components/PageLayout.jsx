import { useEffect } from "react";

const PageLayout = ({ title, headline, children }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div>
      <h1>{headline}</h1>
      {children}
    </div>
  );
};

export default PageLayout;
