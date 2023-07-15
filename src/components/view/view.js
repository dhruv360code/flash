import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import makeStyles from "./styles";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  let { id } = useParams();
  const [data, setData] = useState({
    title: "",
    content: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:5000/flash/cardview/" + id)
      .then((res) => {
        setData({
          title: res.data.title,
          content: res.data.content,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const classes = makeStyles();

  return (
    <Box className={classes.main} sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid xs>
          <Typography className={classes.heading} align="center" variant="h2">
            Flash
          </Typography>
        </Grid>
        <Grid className={classes.view} sm={12} md={8}>
          <Typography align="center" variant="h3">
            {data.title}
          </Typography>
          <Grid dangerouslySetInnerHTML={{ __html: data.content }} />
        </Grid>
        <Grid xs></Grid>
      </Grid>
    </Box>
  );
};

export default View;
