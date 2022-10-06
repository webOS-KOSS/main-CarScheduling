import kind from "@enact/core/kind";
import Proptypes from "prop-types";
import Button from "@enact/sandstone/Button";

import css from "./Log.module.less";

const LogBase = kind({
  name: "LogBase",

  styles: {
    css,
    className: "log-box",
  },

  propTypes: {
    children: Proptypes.string,
    index: Proptypes.number,
    remove: Proptypes.func,
  },

  handlers: {
    remove: () => {
      console.log("remove");
    },
  },

  render: ({ children, index, remove, ...rest }) => {
    return (
      <div {...rest}>
        <div className={css.log}>
          <div className={css.text}>{children}</div>
          <Button onClick={remove}>delete</Button>
        </div>
      </div>
    );
  },
});

const Log = LogBase;

export default LogBase;
export { Log, LogBase };
