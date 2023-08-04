import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import engagementHelper from "./EngagementHelper";
import { messageCountList,channels } from "./constants";
const EngagementMessagesOverTime = ()=>{
  const options = engagementHelper.engagementMessageOverTimeChartOptions(messageCountList, channels)

	return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default EngagementMessagesOverTime