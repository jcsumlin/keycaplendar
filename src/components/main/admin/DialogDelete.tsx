import React, { useContext } from "react";
import firebase from "../../../firebase";
import { UserContext } from "../../../util/contexts";
import { QueueType, SetType } from "../../../util/types";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogButton } from "@rmwc/dialog";

type DialogDeleteProps = {
  close: () => void;
  getData: () => void;
  open: boolean;
  openSnackbar: () => void;
  set: SetType;
  snackbarQueue: QueueType;
};

export const DialogDelete = (props: DialogDeleteProps) => {
  const { user } = useContext(UserContext);
  const deleteEntry = (e: any) => {
    e.preventDefault();
    const db = firebase.firestore();
    db.collection("keysets")
      .doc(props.set.id)
      .set({
        latestEditor: user.id,
      })
      .then(() => {
        props.openSnackbar();
        props.getData();
      })
      .catch((error) => {
        console.error("Error deleting document: ", error);
        props.snackbarQueue.notify({ title: "Error deleting document: " + error });
      });
    props.close();
  };
  return (
    <Dialog open={props.open}>
      <DialogTitle>{`Delete ${props.set.profile} ${props.set.colorway}`}</DialogTitle>
      <DialogContent>
        {`Are you sure you want to delete the entry for ${props.set.profile} ${props.set.colorway}`}?
      </DialogContent>
      <DialogActions>
        <DialogButton action="close" onClick={props.close} isDefaultAction>
          Cancel
        </DialogButton>
        <DialogButton /*action="accept"*/ className="delete" onClick={deleteEntry}>
          Delete
        </DialogButton>
      </DialogActions>
    </Dialog>
  );
};

export default DialogDelete;
