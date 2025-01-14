import React, { useContext } from "react";
import { UserContext } from "../../util/contexts";
import { PresetType } from "../../util/types";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogButton } from "@rmwc/dialog";

type DialogDeleteFilterPresetProps = {
  close: () => void;
  open: boolean;
  preset: PresetType;
};

export const DialogDeleteFilterPreset = (props: DialogDeleteFilterPresetProps) => {
  const { deletePreset } = useContext(UserContext);
  const deleteFn = (e: any) => {
    e.preventDefault();
    deletePreset(props.preset);
    props.close();
  };
  return (
    <Dialog open={props.open}>
      <DialogTitle>Delete {`"${props.preset.name}"`}</DialogTitle>
      <DialogContent>Are you sure you want to delete the filter preset {`"${props.preset.name}"`}?</DialogContent>
      <DialogActions>
        <DialogButton action="close" onClick={props.close} isDefaultAction>
          Cancel
        </DialogButton>
        <DialogButton action="accept" className="delete" onClick={deleteFn}>
          Delete
        </DialogButton>
      </DialogActions>
    </Dialog>
  );
};

export default DialogDeleteFilterPreset;
