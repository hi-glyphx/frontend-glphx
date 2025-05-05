import React from "react";
import Router from "next/router";

interface Props {
  statusCode: number;
}

const Error: any = ({ statusCode }) => {
  //   const classes = useStyles();
  const title = statusCode === 404 ? "404" : "Error";

  return (
    <>
      {/* <Head>
        {useStandardHeaderTags(title)}
      </Head>
      <Container className={classes.root}>
        <TitleElement text={title} />

        {statusCode === 404
          ? 'The page you are looking for could not be found.'
          : 'An error occurred.'}
      </Container> */}
    </>
  );
};

Error.getInitialProps = ({ res, req, err }): Props => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  if (statusCode === 404) {
    if (req.url.match(/\/$/)) {
      const withoutTrailingSlash = req.url.substr(0, req.url.length - 1);
      if (res) {
        res.writeHead(303, {
          Location: withoutTrailingSlash,
        });
        res.end();
      } else {
        Router.push(withoutTrailingSlash);
      }
    }
  }

  return { statusCode };
};

export default Error;
