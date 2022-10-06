import kind from "@enact/core/kind";
import Proptypes from "prop-types";

import css from "./Log.module.less";

const LogBase = kind({
  name: "LogBase",

  styles: {
    css,
    className: "log-box",
  },

  propTypes: {
    handlers: {
      remove: () => {
        console.log("remove");
      },
    },
    children: Proptypes.string,
    index: Proptypes.number,
    remove: Proptypes.func,
  },

  render: ({ children, index, ...rest }) => {
    return (
      <div {...rest}>
        <div className={css.log}>
          <div className={css.text}>{children}</div>
        </div>
      </div>
    );
  },
});

const Log = LogBase;

export default LogBase;
export { Log, LogBase };
