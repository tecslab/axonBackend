interface GlobalParameters {
    axxonOneServer: string;
    axxonOnePort: string;
    prefix: string;
    user: string;
    password: string;
    utc: number;
    detectionStartTime: string;
    detectionFinishTime: string;
    vEntranceCamera: string;
  }
  
const globalParameters: GlobalParameters = {
    axxonOneServer: "192.168.2.43",
    axxonOnePort: "82",
    prefix: "/",
    user: "root",
    password: "root",
    utc: -5,
    detectionStartTime: "0900",
    detectionFinishTime: "2100",
    vEntranceCamera: "/SVRCAMARAS/DeviceIpint.2/SourceEndpoint.video:0:0/"
    };

export { globalParameters };