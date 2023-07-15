import React, { useState } from "react";
import { Button, Typography, Grid } from "@material-ui/core";
import makeStyles from "./styles";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { FilledInput } from "@mui/material";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import SendIcon from "@mui/icons-material/Send";
const Form = () => {
  const classes = makeStyles();

  const [editor, setEditor] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  const onEditorStateChange = (editorState) => {
    setEditor(editorState);
  };
  const submit = (e) => {
    if (editor && tags && title) {
      let arr = tags.split(",");
      const results = arr.map((element) => {
        return element.trim();
      });
      const article = {
        title: title,
        content: draftToHtml(convertToRaw(editor.getCurrentContent())),
        tags: results,
      };
      axios
        .post("http://localhost:5000/flash/add/", article)
        .then((response) => {
          alert("Article Added");
          console.log(response);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } else {
      alert("something is missing");
    }
  };
  return (
    <>
      <Box className={classes.main} sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid xs>
            <Typography className={classes.heading} align="center" variant="h2">
              Flash
            </Typography>
          </Grid>
          <Grid className={classes.view} sm={12} md={8}>
            <Box
              columnGap={2}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Typography className={classes.heading} variant="h2">
                Add Your Flash
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={submit}
                endIcon={<SendIcon />}
              >
                Submit
              </Button>
            </Box>

            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Title</InputLabel>
              <FilledInput
                id="filled-adornment-amount"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Tags</InputLabel>
              <FilledInput
                id="filled-adornment-amount"
                value={tags}
                onChange={(e) => {
                  setTags(e.target.value);
                }}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>

            <div>
              <Editor
                editorState={editor}
                className={classes.editor}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
              />
            </div>
          </Grid>
          <Grid xs></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Form;
