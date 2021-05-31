import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Typography from "@material-ui/core/Typography";
import { FormattedMessage, useIntl } from "react-intl";
import Container from "@material-ui/core/Container";

import Paper from "@material-ui/core/Paper";
import { useUsers } from "../../components/UserContext/UserContextProvider";
import {
  RECORD_TYPE,
  useRecords,
} from "../../components/RecordsContext/RecordsContextProvider";
import compareAsc from "date-fns/compareAsc";
import format from "date-fns/format";

const useStyles = makeStyles((theme) => ({
  fixedHeight: {
    height: 240,
  },
}));

interface ChartValue {
  date: string;
  value: number;
}

type ChartValues = ChartValue[];

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const classes = useStyles();
  const intl = useIntl();
  const { currentUser } = useUsers();
  const { records } = useRecords(currentUser);

  const datetimeFormat = intl.formatMessage({ id: "common.datetime" });
  const data = records
    .sort((a, b) => compareAsc(a.date, b.date))
    .reduce((chartData, row) => {
      const rowValue = row.type === RECORD_TYPE.INCOME ? row.value : -row.value;
      const value =
        (chartData?.[chartData.length - 1]?.value ?? 0) + Number(rowValue);
      chartData.push({
        date: format(row.date, datetimeFormat),
        value,
      });
      return chartData;
    }, [] as ChartValues);

  return (
    <div>
      <Typography variant="h4">
        <FormattedMessage id="dashboard.title" />
      </Typography>

      <Container maxWidth="lg">
        <Paper className={classes.fixedHeight}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
              <YAxis stroke={theme.palette.text.secondary}>
                <Label
                  angle={270}
                  position="left"
                  style={{
                    textAnchor: "middle",
                    fill: theme.palette.text.primary,
                  }}
                >
                  {intl.formatMessage({ id: "dashboard.chart.axis.y" })}
                </Label>
              </YAxis>
              <Line
                type="monotone"
                dataKey="value"
                stroke={theme.palette.primary.main}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Container>
    </div>
  );
};

export default Dashboard;
