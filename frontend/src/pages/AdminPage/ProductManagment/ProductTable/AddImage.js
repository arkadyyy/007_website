import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DropzoneArea } from "material-ui-dropzone";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210,
    },
  })
);

export default function AddImage({ openAddImage, onAddImageClose }) {
  const classes = useStyles();
  const [images, setimages] = useState([]);

  return (
    <div>
      <Dialog
        open={openAddImage}
        onClose={onAddImageClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        {/* <DialogTitle id='alert-dialog-title'>
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent>
          <DropzoneArea
            acceptedFiles={["image/*"]}
            showPreviews={true}
            showPreviewsInDropzone={false}
            previewGridProps={{
              container: { spacing: 1, direction: "row" },
            }}
            useChipsForPreview
            previewChipProps={{ classes: { root: classes.previewChip } }}
            previewText='Selected files'
            fileObjects={images}

            // onDelete={handleDelete}
            // onChange={imageUpload}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onAddImageClose}>Disagree</Button>
          <Button onClick={onAddImageClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
