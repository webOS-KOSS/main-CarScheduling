import { Header, Panel } from "@enact/sandstone/Panels";
import Button from "@enact/sandstone/Button";
import Scroller from "@enact/ui/Scroller";
import Logs from "./Logs";
import LS2Request from "@enact/webos/LS2Request";
import { useEffect, useState } from "react";

const MainPanel = () => {
  const [logs, setLogs] = useState(["a"]);
  const bridge = new LS2Request();

  async function start() {
    let ret = await init();
    loop();
  }

  useEffect(() => {
    start();
  }, []);

  const init = () => {
    return new Promise((resolve, reject) => {
      let params = {};
      let lsRequest = {
        service: "luna://com.tlqkf.app.service",
        method: "init",
        parameters: params,
        onSuccess: (msg) => {
          findHandler(msg);
          resolve();
          console.log(msg);
        },
        onFailure: (err) => {
          console.log(err);
          reject();
        },
      };
      bridge.send(lsRequest);
    });
  };

  const findHandler = (res) => {
    let lst = [];
    const results = res.results;
    for (let i in results) {
      let text = `${results[i].time} | ${results[i].carNumber} | `
      if (results[i].status === "register") {
        text += "임시 등록 차량 | 통과";
      }
      if (results[i].status === "unknown") {
        text += "미등록 차량 | 거부";
      }
      if (results[i].status === "general") {
        text += "입주민 차량 | 통과";
      }
      lst.unshift(text);
    }
    setLogs(lst);
    console.log(lst);
  };

  const loop = () => {
    let params = { subscribe: true };
    let lsRequest = {
      service: "luna://com.tlqkf.app.service",
      method: "loop",
      parameters: params,
      onSuccess: (msg) => {
        console.log(msg);
        findHandler(msg);
      },
      onFailure: (err) => {
        console.log(err);
      },
    };
    bridge.send(lsRequest);
  };

  return (
    <Panel>
      <Header title="log app" />
      <Scroller>
        <Logs>{logs}</Logs>
      </Scroller>
    </Panel>
  );
};

export default MainPanel;
