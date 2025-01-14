import React from "react";
import ChartistGraph from "react-chartist";
import chartistTooltip from "chartist-plugin-tooltips-updated";
import { Card } from "@rmwc/card";
import { Typography } from "@rmwc/typography";
import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableRow,
  DataTableHeadCell,
  DataTableBody,
  DataTableCell,
} from "@rmwc/data-table";
import "./PieCard.scss";

type StatusCardProps = {
  data: {
    ic: number;
    liveGb: number;
    name: string;
    postGb: number;
    preGb: number;
    total: number;
  };
};

export const StatusCard = (props: StatusCardProps) => {
  return (
    <Card className="pie-card">
      <Typography use="headline5" tag="h1">
        {props.data.name}
      </Typography>
      <Typography use="subtitle2" tag="p">
        {`${props.data.total} set${props.data.total > 1 ? "s" : ""}`}
      </Typography>
      <div className="pie-container">
        <div className="table-container">
          <DataTable className="rounded">
            <DataTableContent>
              <DataTableHead>
                <DataTableRow>
                  <DataTableHeadCell>Status</DataTableHeadCell>
                  <DataTableHeadCell isNumeric>Sets</DataTableHeadCell>
                </DataTableRow>
              </DataTableHead>
              <DataTableBody>
                <DataTableRow>
                  <DataTableCell>
                    <div className="indicator ic"></div>IC
                  </DataTableCell>
                  <DataTableCell isNumeric>{props.data.ic}</DataTableCell>
                </DataTableRow>
                <DataTableRow>
                  <DataTableCell>
                    <div className="indicator pre-gb"></div>Pre GB
                  </DataTableCell>
                  <DataTableCell isNumeric>{props.data.preGb}</DataTableCell>
                </DataTableRow>
                <DataTableRow>
                  <DataTableCell>
                    <div className="indicator live-gb"></div>Live GB
                  </DataTableCell>
                  <DataTableCell isNumeric>{props.data.liveGb}</DataTableCell>
                </DataTableRow>
                <DataTableRow>
                  <DataTableCell>
                    <div className="indicator post-gb"></div>Post GB
                  </DataTableCell>
                  <DataTableCell isNumeric>{props.data.postGb}</DataTableCell>
                </DataTableRow>
              </DataTableBody>
            </DataTableContent>
          </DataTable>
        </div>
        <div className="pie-chart-container status">
          <ChartistGraph
            className="ct-octave"
            data={{
              series: [
                { meta: "IC:&nbsp;", value: props.data.ic },
                { meta: "Pre GB:&nbsp;", value: props.data.preGb },
                { meta: "Live GB:&nbsp;", value: props.data.liveGb },
                { meta: "Post GB:&nbsp;", value: props.data.postGb },
              ],
              labels: [" ", " ", " ", " "],
            }}
            type={"Pie"}
            options={{
              plugins: [chartistTooltip({ metaIsHTML: true })],
            }}
          />
        </div>
      </div>
    </Card>
  );
};

type ShippedCardProps = {
  data: {
    name: string;
    shipped: number;
    total: number;
    unshipped: number;
  };
};

export const ShippedCard = (props: ShippedCardProps) => {
  return (
    <Card className="pie-card">
      <Typography use="headline5" tag="h1">
        {props.data.name}
      </Typography>
      <Typography use="subtitle2" tag="p">
        {`${props.data.total} set${props.data.total > 1 ? "s" : ""}`}
      </Typography>
      <div className="pie-container">
        <div className="table-container">
          <DataTable className="rounded">
            <DataTableContent>
              <DataTableHead>
                <DataTableRow>
                  <DataTableHeadCell>Status</DataTableHeadCell>
                  <DataTableHeadCell isNumeric>Sets</DataTableHeadCell>
                </DataTableRow>
              </DataTableHead>
              <DataTableBody>
                <DataTableRow>
                  <DataTableCell>
                    <div className="indicator shipped"></div>Shipped
                  </DataTableCell>
                  <DataTableCell isNumeric>{props.data.shipped}</DataTableCell>
                </DataTableRow>
                <DataTableRow>
                  <DataTableCell>
                    <div className="indicator not-shipped"></div>Not shipped
                  </DataTableCell>
                  <DataTableCell isNumeric>{props.data.unshipped}</DataTableCell>
                </DataTableRow>
              </DataTableBody>
            </DataTableContent>
          </DataTable>
        </div>
        <div className="pie-chart-container shipped">
          <ChartistGraph
            className="ct-octave"
            data={{
              series: [
                { meta: "Not shipped:&nbsp;", value: props.data.unshipped },
                { meta: "Shipped:&nbsp;", value: props.data.shipped },
              ],
              labels: [" ", " "],
            }}
            type={"Pie"}
            options={{
              plugins: [chartistTooltip({ metaIsHTML: true })],
            }}
          />
        </div>
      </div>
    </Card>
  );
};
