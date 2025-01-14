import React from "react";
import classNames from "classnames";
import isEqual from "lodash.isequal";
import { hasKey } from "../../util/functions";
import { ActionType } from "../../util/types";
import { Button } from "@rmwc/button";
import {
  CollapsibleList,
  ListItem,
  ListItemMeta,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemGraphic,
} from "@rmwc/list";
import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableRow,
  DataTableHeadCell,
  DataTableCell,
  DataTableBody,
} from "@rmwc/data-table";
import { Checkbox } from "@rmwc/checkbox";
import "./AuditEntry.scss";

type AuditEntryProps = {
  action: ActionType;
  openDeleteDialog: (action: ActionType) => void;
  properties: string[];
  timestamp: {
    format: (format: string) => string;
  };
};

export const AuditEntry = (props: AuditEntryProps) => {
  const documentRow = (
    <DataTableRow>
      <DataTableCell>documentId</DataTableCell>
      <DataTableCell colSpan={props.action.action === "created" ? 1 : 2}>{props.action.documentId}</DataTableCell>
    </DataTableRow>
  );
  const changelogRow = (
    <DataTableRow>
      <DataTableCell>changelogId</DataTableCell>
      <DataTableCell colSpan={props.action.action === "created" ? 1 : 2}>{props.action.changelogId}</DataTableCell>
    </DataTableRow>
  );
  const emailRow = props.action.user.email ? (
    <DataTableRow>
      <DataTableCell>userEmail</DataTableCell>
      <DataTableCell colSpan={props.action.action === "created" ? 1 : 2}>{props.action.user.email}</DataTableCell>
    </DataTableRow>
  ) : null;
  const arrayProps: string[] = ["designer"];
  const urlProps: string[] = ["image", "details", "sales"];
  const boolProps: string[] = ["gbMonth", "shipped"];
  const icons: { [key: string]: string } = {
    created: "add_circle_outline",
    updated: "update",
    deleted: "remove_circle_outline",
  };
  return (
    <CollapsibleList
      handle={
        <ListItem>
          <ListItemGraphic icon={icons[props.action.action]} />
          <ListItemText>
            <div className="overline">{props.action.action}</div>
            <ListItemPrimaryText>
              {props.action.action !== "deleted"
                ? `${props.action.after.profile} ${props.action.after.colorway}`
                : `${props.action.before.profile} ${props.action.before.colorway}`}
            </ListItemPrimaryText>
            <ListItemSecondaryText>
              {`${props.action.user.nickname}, ${props.timestamp.format("Do MMM YYYY HH:mm")}`}
            </ListItemSecondaryText>
          </ListItemText>
          <ListItemMeta icon="expand_more" />
        </ListItem>
      }
    >
      <DataTable className="rounded">
        <DataTableContent>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeadCell>Property</DataTableHeadCell>
              <DataTableHeadCell>{props.action.action === "updated" ? "Before" : "Data"}</DataTableHeadCell>
              {props.action.action === "updated" ? <DataTableHeadCell>After</DataTableHeadCell> : null}
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {props.properties.map((property, index) => {
              const domain = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/gim;
              if (
                props.action.action === "updated" &&
                hasKey(props.action.before, property) &&
                hasKey(props.action.after, property) &&
                !isEqual(props.action.before[property], props.action.after[property])
              ) {
                const beforeProp = props.action.before[property] ? props.action.before[property] : "";
                const afterProp = props.action.after[property] ? props.action.after[property] : "";
                if (
                  !arrayProps.includes(property) &&
                  property !== "vendors" &&
                  !urlProps.includes(property) &&
                  !boolProps.includes(property)
                ) {
                  return (
                    <DataTableRow key={property + index}>
                      <DataTableCell>{property}</DataTableCell>
                      <DataTableCell className="before">
                        <span className="highlight">{beforeProp}</span>
                      </DataTableCell>
                      <DataTableCell className="after">
                        <span className="highlight">{afterProp}</span>
                      </DataTableCell>
                    </DataTableRow>
                  );
                } else if (
                  arrayProps.includes(property) &&
                  beforeProp &&
                  afterProp &&
                  beforeProp instanceof Array &&
                  afterProp instanceof Array
                ) {
                  return (
                    <DataTableRow key={property + index}>
                      <DataTableCell>{property}</DataTableCell>
                      <DataTableCell className="before">
                        <span className="highlight">{beforeProp.join(", ")}</span>
                      </DataTableCell>
                      <DataTableCell className="after">
                        <span className="highlight">{afterProp.join(", ")}</span>
                      </DataTableCell>
                    </DataTableRow>
                  );
                } else if (property === "vendors" && props.action.before.vendors && props.action.after.vendors) {
                  const beforeVendors = props.action.before.vendors;

                  beforeVendors.sort(function (a, b) {
                    const x = a.region.toLowerCase();
                    const y = b.region.toLowerCase();
                    if (x < y) {
                      return -1;
                    }
                    if (x > y) {
                      return 1;
                    }
                    return 0;
                  });

                  const afterVendors = props.action.after.vendors;

                  afterVendors.sort(function (a, b) {
                    const x = a.region.toLowerCase();
                    const y = b.region.toLowerCase();
                    if (x < y) {
                      return -1;
                    }
                    if (x > y) {
                      return 1;
                    }
                    return 0;
                  });

                  const moreVendors = afterVendors.length >= beforeVendors.length ? afterVendors : beforeVendors;
                  const buildRows = () => {
                    const rows: JSX.Element[] = [];
                    moreVendors.forEach((_vendor, index) => {
                      const beforeVendor = beforeVendors[index]
                        ? beforeVendors[index]
                        : { name: "", region: "", storeLink: "" };
                      const afterVendor = afterVendors[index]
                        ? afterVendors[index]
                        : { name: "", region: "", storeLink: "" };
                      if (!isEqual(afterVendor, beforeVendor)) {
                        rows.push(
                          <DataTableRow key={afterVendor.name + index}>
                            <DataTableCell>{property + index}</DataTableCell>
                            <DataTableCell className="before">
                              <div>
                                <span className={classNames({ highlight: afterVendor.id !== beforeVendor.id })}>
                                  ID: {beforeVendor.id}
                                </span>
                              </div>
                              <div>
                                <span className={classNames({ highlight: afterVendor.name !== beforeVendor.name })}>
                                  Name: {beforeVendor.name}
                                </span>
                              </div>
                              <div>
                                <span className={classNames({ highlight: afterVendor.region !== beforeVendor.region })}>
                                  Region: {beforeVendor.region}
                                </span>
                              </div>
                              <div>
                                <span
                                  className={classNames({
                                    highlight: afterVendor.storeLink !== beforeVendor.storeLink,
                                  })}
                                >
                                  Link:{" "}
                                  <a href={beforeVendor.storeLink} target="_blank" rel="noopener noreferrer">
                                    {beforeVendor.storeLink ? beforeVendor.storeLink.match(domain) : null}
                                  </a>
                                </span>
                              </div>
                              {beforeVendor.endDate ? (
                                <div>
                                  <span
                                    className={classNames({ highlight: afterVendor.endDate !== beforeVendor.endDate })}
                                  >
                                    End date: {beforeVendor.endDate}
                                  </span>
                                </div>
                              ) : null}
                            </DataTableCell>
                            <DataTableCell className="after">
                              <div>
                                <span className={classNames({ highlight: afterVendor.id !== beforeVendor.id })}>
                                  ID: {afterVendor.id}
                                </span>
                              </div>
                              <div>
                                <span className={classNames({ highlight: afterVendor.name !== beforeVendor.name })}>
                                  Name: {afterVendor.name}
                                </span>
                              </div>
                              <div>
                                <span className={classNames({ highlight: afterVendor.region !== beforeVendor.region })}>
                                  Region: {afterVendor.region}
                                </span>
                              </div>
                              <div>
                                <span
                                  className={classNames({
                                    highlight: afterVendor.storeLink !== beforeVendor.storeLink,
                                  })}
                                >
                                  Link:{" "}
                                  <a href={afterVendor.storeLink} target="_blank" rel="noopener noreferrer">
                                    {afterVendor.storeLink ? afterVendor.storeLink.match(domain) : null}
                                  </a>
                                </span>
                              </div>
                              {afterVendor.endDate ? (
                                <div>
                                  <span
                                    className={classNames({ highlight: afterVendor.endDate !== beforeVendor.endDate })}
                                  >
                                    End date: {afterVendor.endDate}
                                  </span>
                                </div>
                              ) : null}
                            </DataTableCell>
                          </DataTableRow>
                        );
                      }
                    });
                    return rows;
                  };
                  return buildRows();
                } else if (
                  urlProps.includes(property) &&
                  typeof beforeProp === "string" &&
                  typeof afterProp === "string"
                ) {
                  return (
                    <DataTableRow key={property + index}>
                      <DataTableCell>{property}</DataTableCell>
                      <DataTableCell className="before">
                        <span className="highlight">
                          <a href={beforeProp} target="_blank" rel="noopener noreferrer">
                            {beforeProp.match(domain)}
                          </a>
                        </span>
                      </DataTableCell>
                      <DataTableCell className="after">
                        <span className="highlight">
                          <a href={afterProp} target="_blank" rel="noopener noreferrer">
                            {afterProp.match(domain)}
                          </a>
                        </span>
                      </DataTableCell>
                    </DataTableRow>
                  );
                } else if (
                  boolProps.includes(property) &&
                  typeof beforeProp === "boolean" &&
                  typeof afterProp === "boolean"
                ) {
                  return (
                    <DataTableRow key={property + index}>
                      <DataTableCell>{property}</DataTableCell>
                      <DataTableCell hasFormControl className="before">
                        <Checkbox checked={beforeProp} disabled />
                      </DataTableCell>
                      <DataTableCell hasFormControl className="after">
                        <Checkbox checked={afterProp} disabled />
                      </DataTableCell>
                    </DataTableRow>
                  );
                }
                return null;
              } else if (props.action.action === "created" || props.action.action === "deleted") {
                const docData = props.action.action === "created" ? props.action.after : props.action.before;
                const prop = hasKey(docData, property) && docData[property] ? docData[property] : "";
                if (
                  !arrayProps.includes(property) &&
                  property !== "vendors" &&
                  !urlProps.includes(property) &&
                  !boolProps.includes(property)
                ) {
                  return (
                    <DataTableRow key={property + index}>
                      <DataTableCell>{property}</DataTableCell>
                      <DataTableCell className={props.action.action === "created" ? "after" : "before"}>
                        <span className="highlight">{prop}</span>
                      </DataTableCell>
                    </DataTableRow>
                  );
                } else if (arrayProps.includes(property) && prop instanceof Array) {
                  return (
                    <DataTableRow key={property + index}>
                      <DataTableCell>{property}</DataTableCell>
                      <DataTableCell className={props.action.action === "created" ? "after" : "before"}>
                        <span className="highlight">{prop.join(", ")}</span>
                      </DataTableCell>
                    </DataTableRow>
                  );
                } else if (property === "vendors" && docData.vendors) {
                  const buildRows = () => {
                    const rows: JSX.Element[] = [];
                    const domain = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/gim;
                    if (docData.vendors) {
                      docData.vendors.forEach((vendor, index) => {
                        rows.push(
                          <DataTableRow key={vendor.name + index}>
                            <DataTableCell>{property + index}</DataTableCell>
                            <DataTableCell className={props.action.action === "created" ? "after" : "before"}>
                              <div>
                                <span className="highlight">ID: {vendor.id}</span>
                              </div>
                              <div>
                                <span className="highlight">Name: {vendor.name}</span>
                              </div>
                              <div>
                                <span className="highlight">Region: {vendor.region}</span>
                              </div>
                              <div>
                                <span className="highlight">
                                  Link:{" "}
                                  {vendor.storeLink ? (
                                    <a href={vendor.storeLink} target="_blank" rel="noopener noreferrer">
                                      {vendor.storeLink.match(domain)}
                                    </a>
                                  ) : null}
                                </span>
                              </div>
                              {vendor.endDate ? (
                                <div>
                                  <span className="highlight">End date: {vendor.endDate}</span>
                                </div>
                              ) : null}
                            </DataTableCell>
                          </DataTableRow>
                        );
                      });
                    }
                    return rows;
                  };
                  return buildRows();
                } else if (urlProps.includes(property) && typeof prop === "string") {
                  return (
                    <DataTableRow key={property + index}>
                      <DataTableCell>{property}</DataTableCell>
                      <DataTableCell className={props.action.action === "created" ? "after" : "before"}>
                        <span className="highlight">
                          <a href={prop} target="_blank" rel="noopener noreferrer">
                            {prop.match(domain)}
                          </a>
                        </span>
                      </DataTableCell>
                    </DataTableRow>
                  );
                } else if (boolProps.includes(property) && typeof prop === "boolean") {
                  return (
                    <DataTableRow key={property + index}>
                      <DataTableCell>{property}</DataTableCell>
                      <DataTableCell className={props.action.action === "created" ? "after" : "before"}>
                        <Checkbox checked={prop} disabled />
                      </DataTableCell>
                    </DataTableRow>
                  );
                }
              }
              return null;
            })}
            {documentRow}
            {changelogRow}
            {emailRow}
          </DataTableBody>
        </DataTableContent>
      </DataTable>
      <div className="button-list">
        <Button
          label="delete"
          className="delete"
          onClick={() => {
            props.openDeleteDialog(props.action);
          }}
        />
      </div>
    </CollapsibleList>
  );
};

export default AuditEntry;
