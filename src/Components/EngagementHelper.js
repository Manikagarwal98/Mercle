const engagementHelper = {
  engagementMessageOverTimeChartOptions: (messageCountList, channels) => {
    // Group messageCountList by channel
    const channelData = messageCountList.reduce((acc, { count, timeBucket, channelId }) => {
      if (!acc[channelId]) {
        acc[channelId] = { dates: [], counts: [] };
      }
      acc[channelId].dates.push(new Date(timeBucket).toLocaleDateString());
      acc[channelId].counts.push(parseInt(count));
      return acc;
    }, {});
    // Filter channels with messages on more than one date
    const activeChannels = Object.keys(channelData).filter(
      (channelId) => channelData[channelId].dates.length > 1
    );
    // Generate the data series for the chart
    const series = activeChannels.map((channelId) => {
      const channel = channels.find((channel) => channel.id === channelId);
      return {
        name: channel ? channel.name : channelId,
        data: channelData[channelId].counts,
      };
    });

    // Create the Highcharts options object
    const options = {
      chart: {
        type: "line",
      },
      title: {
        text: "Engagement: Messages Over Time",
      },
      xAxis: {
        categories: channelData[activeChannels[0]].dates, // Assuming all active channels have the same dates
        title: {
          text: "Date",
        },
      },
      yAxis: {
        title: {
          text: "Message Count",
        },
      },
      series,
      tooltip: {
        shared: true,
        crosshairs: true,
        // Customize the tooltip appearance and content
        formatter: function () {
          const points = this.points;
          const date = this.x;
          let tooltipContent;
          points.forEach((point) => {
            const channelName = point.series.name;
            const messageCount = point.y;
            tooltipContent = `<span ><b>${channelName}</b></span><br/><div><span style="color: ${point.color}"> ${messageCount}</span> messages on ${date}</div>`;
          });
          return tooltipContent;
        },
      },
    };

    return options;
  },
};

export default engagementHelper;