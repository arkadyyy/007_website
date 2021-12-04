import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Reviews = ({ setReviewDisplay, product_id }) => {
  const [openAddReview, setOpenAddReview] = React.useState(false);

  const onOpenAddReview = () => {
    setOpenAddReview(true);
  };

  const onCloseAddReview = () => {
    setOpenAddReview(false);
  };

  return (
    <>
      <Button onClick={() => setReviewDisplay(false)}>Back</Button>
      <h2>reviews ~</h2>
      <p>{product_id}</p>

      <Button onClick={() => onOpenAddReview()}>Add Review</Button>

      <Dialog
        open={openAddReview}
        onClose={onCloseAddReview}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button>Disagree</Button>
          <Button autoFocus>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Reviews;
