import { Helmet } from 'react-helmet-async';
const PageTitle = ({ text }) => {
  return (
    <Helmet>
      <title>{text} | Instaclone</title>
    </Helmet>
  );
};

export default PageTitle;
