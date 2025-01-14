import React from "react";
import { SetType } from "../../util/types";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogButton } from "@rmwc/dialog";
import "./DialogSales.scss";

type DialogSalesProps = {
  close: () => void;
  open: boolean;
  set: SetType;
};

export const DialogSales = (props: DialogSalesProps) => {
  return (
    <Dialog className="sales-dialog" open={props.open} onClose={props.close}>
      <DialogTitle>{`Sales - ${props.set.profile} ${props.set.colorway}`}</DialogTitle>
      <DialogContent>
        <div className="sales-image">
          <img alt="Sales graph" src={props.set.sales} />
        </div>
        Created by dvorcol.
      </DialogContent>
      <DialogActions>
        <DialogButton label="Open original" tag="a" href={props.set.sales} target="_blank" rel="noopener noreferrer" />
        <DialogButton label="Close" onClick={props.close} />
      </DialogActions>
    </Dialog>
  );
};

export default DialogSales;
