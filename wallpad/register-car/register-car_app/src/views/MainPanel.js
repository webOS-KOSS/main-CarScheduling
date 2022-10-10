import Button from "@enact/sandstone/Button";
import { Header, Panel } from "@enact/sandstone/Panels";
import Scroller from "@enact/ui/Scroller";
import Logs from "./Logs";
import PropTypes from "prop-types";
import LS2Request from "@enact/webos/LS2Request";
import { useEffect, useState } from "react";
import css from "./MainPanel.module.less";

//-------------------------------------------------------------------
const bridge = new LS2Request(); // LS2 서비스 요청 인스턴스 생성
//-------------------------------------------------------------------
const MainPanel = ({ onClick, title, ...rest }) => {
  //useState를 통해서 log를 관리한다.
  const [logs, setLogs] = useState(["aa"]);
  //-----------------------------------------------
  // 해당 페이지가 새로 켜질때마다 maininit의 과정을 거친다.
  useEffect(() => {
    mainInit();
  }, []);
  //-----------------------------------------------------------
  // mongodb connect -> schema -> show -> setlogs의 과정을 거쳐 log를 새로고침해준다.
  function mainInit() {
    console.log("mainInit");
    let lsRequest = {
      service: "luna://com.registercar.app.service",
      method: "mainInit",
      parameters: {},
      onSuccess: (msg) => {
        console.log(msg);
        setLogs(msg.reply);
      },
      onFailure: (msg) => {
        console.log(msg);
      },
    };
    bridge.send(lsRequest);
  }
  //-------------------------------------------------------------
  return (
    <Panel {...rest}>
      <Header title={title} />
      <Scroller>
        <Button
          className={css.button}
          onClick={onClick}
          backgroundOpacity="transparent"
        >
          Register
        </Button>
        <Logs>{logs}</Logs>
      </Scroller>
    </Panel>
  );
};

MainPanel.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
};

export default MainPanel;
