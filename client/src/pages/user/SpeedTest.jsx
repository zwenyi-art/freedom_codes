import React, { useEffect, useState } from "react";
import GaugeComponent from "react-gauge-component";

const GaugeCard = ({ speed, title, kbitsToMbits }) => (
  <article className="w-fit h-fit flex flex-col items-center">
    <div className="w-80">
      <GaugeComponent
        arc={{
          nbSubArcs: 100,
          colorArray: ["#5BE12C", "#F5CD19", "#EA4228"],
          width: 0.3,
          padding: 0.003,
        }}
        labels={{
          valueLabel: {
            style: { fontSize: 30 },
            formatTextValue: (value) => `${kbitsToMbits(value)}`,
          },
          tickLabels: {
            type: "outer",
            ticks: [
              { value: 100 },
              { value: 200 },
              { value: 300 },
              { value: 400 },
              { value: 500 },
              { value: 600 },
              { value: 700 },
              { value: 800 },
              { value: 900 },
              { value: 1000 },
              { value: 1500 },
              { value: 2000 },
              { value: 2500 },
              { value: 3000 },
              { value: 4000 },
              { value: 5000 },
            ],
            defaultTickValueConfig: {
              formatTextValue: (value) => `${kbitsToMbits(value)}`,
            },
          },
        }}
        value={speed}
        maxValue={5000}
      />
    </div>
    <span>{title}</span>
  </article>
);

const SpeedTest = () => {
  const [server, setServer] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [complete, setComplete] = useState(false);
  const startTest = () => {
    ndt7
      .test(
        {
          userAcceptedDataPolicy: true,
          downloadworkerfile: "/ndt7-download-worker.js",
          uploadworkerfile: "/ndt7-upload-worker.js",
          metadata: {
            client_name: "ndt7-react-speedtest",
          },
        },
        {
          serverChosen: function (server) {
            setServer(`${server.location.city}`);
            setLoading(true);
            // console.log("Testing to:", {
            //   machine: server.machine,
            //   locations: server.location,
            // });
          },
          downloadMeasurement: function (data) {
            if (data.Source === "client") {
              const result = (data.Data.MeanClientMbps * 1000).toFixed(2); // Convert Mbps to Kbps
              setDownloadSpeed(result);
            }
          },
          downloadComplete: function (data) {
            const clientGoodput = data.LastClientMeasurement.MeanClientMbps;
            const result = (clientGoodput * 1000).toFixed(2); // Convert Mbps to Kbps
            setDownloadSpeed(result);
          },
          uploadMeasurement: function (data) {
            if (data.Source === "server") {
              const uploadMbps = (
                (data.Data.TCPInfo.BytesReceived /
                  data.Data.TCPInfo.ElapsedTime) *
                8
              ).toFixed(2);
              const uploadKbps = (uploadMbps * 1000).toFixed(2); // Convert Mbps to Kbps
              setUploadSpeed(uploadKbps);
            }
          },
          uploadComplete: function (data) {
            const bytesReceived =
              data.LastServerMeasurement.TCPInfo.BytesReceived;
            const elapsed = data.LastServerMeasurement.TCPInfo.ElapsedTime;
            const throughput = ((bytesReceived * 8) / elapsed).toFixed(2);
            const throughputKbps = (throughput * 1000).toFixed(2); // Convert Mbps to Kbps
            setUploadSpeed(throughputKbps);
          },
          error: function (err) {
            console.log("Error while running the test:", err.message);
          },
        }
      )
      .then((exitcode) => {
        setComplete(true);
        // console.log("ndt7 test completed with exit code:", exitcode);
      });
  };

  const kbitsToMbits = (value) => {
    if (value >= 1000) {
      return (value / 1000).toFixed(2) + " Mbps"; // If value exceeds 1000 Kbps, display as Mbps
    }
    return value.toFixed(0) + " Kbps"; // Otherwise, display as Kbps
  };

  useEffect(() => {
    const startSpeedTest = setTimeout(() => {
      startTest();
    }, 2000);
    return () => {
      clearTimeout(startSpeedTest);
    };
  }, []);
  return (
    <section className="w-full h-svh flex items-center justify-center">
      <div className="relative w-full h-fit gap-x-10 flex flex-col sm:flex-row items-center justify-center">
        {/* Download Speed */}
        {loading ? (
          <GaugeCard
            speed={downloadSpeed}
            title="Download Speed"
            kbitsToMbits={kbitsToMbits}
          />
        ) : (
          <GaugeCard
            speed={downloadSpeed}
            title="Download Speed"
            kbitsToMbits={kbitsToMbits}
          />
        )}

        {/* Status Indicator */}

        <div className="w-full h-full bottom-10 absolute flex items-start justify-center ">
          {!complete ? (
            loading ? (
              <span className="uppercase font-bold text-emerald-300">
                Testing To <span className="text-green-600">{server}</span>{" "}
                Server ...
              </span>
            ) : (
              <span className="uppercase font-bold text-white">
                Finding To The Nearest Server ....
              </span>
            )
          ) : (
            <span className="uppercase font-bold text-emerald-300">
              Speed Test Completed !
            </span>
          )}
        </div>

        {/* Upload Speed */}
        {loading ? (
          <GaugeCard
            speed={uploadSpeed}
            title="Upload Speed"
            kbitsToMbits={kbitsToMbits}
          />
        ) : (
          <GaugeCard
            speed={uploadSpeed}
            title="Upload Speed"
            kbitsToMbits={kbitsToMbits}
          />
        )}
      </div>
    </section>
  );
};

export default SpeedTest;
