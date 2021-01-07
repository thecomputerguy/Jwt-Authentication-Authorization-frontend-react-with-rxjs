import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { alertService, AlertType } from "../_services";
import { history } from "history";

const propTypes = {
  id: PropTypes.string,
  fade: PropTypes.bool,
};

const defaultProps = {
  id: "default-true",
  fade: true,
};

const Alert = ({ id, fade }) => {
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    const subscription = alertService.onAlert(id).subscribe((alert) => {
      if (!alert.message) {
        setAlerts((alerts) => {
          const filteredAlerts = alerts.filter(
            (alert) => alert.keepAfterRouteChange
          );
          filteredAlerts.forEach((alert) => delete alert.keepAfterRouteChange);
          return filteredAlerts;
        });
      } else {
        setAlerts((alerts) => [...alerts, alert]);

        //auto close alert if required
        if (alert.autoClose) {
          setTimeout(() => removeAlert(alert), 3000);
        }
      }
    });

    const historyUnlisten = history.listen(({ pathname }) => {
      if (pathname.endsWith("/")) return;
      alertService.clear(id);
    });

    return () => {
      subscription.unsubscribe();
      historyUnlisten();
    };
  }, []);

  function removeAlert(alert) {
    if (fade) {
      //fade out alert
      const alertWithFade = { ...alert, fade: true };
      setAlerts((alerts) =>
        alerts.map((x) => (x === alert ? alertWithFade : x))
      );
      setTimeout(() => {
        setAlerts((alerts) => alerts.filter((x) => x !== alertWithFade));
      }, 250);
    } else {
      //remove alert
      setAlerts((alerts) => alerts.filter((x) => x !== alert));
    }
  }

  function cssClasses(alert) {
    if (!alert) return;

    const classes = ["alert", "alert-dismissable"];

    const alertTypeClass = {
      [AlertType.Success]: "alert alert-success",
      [AlertType.Danger]: "alert alert-danger",
      [AlertType.Error]: "alert alert-info",
      [AlertType.Warning]: "alert alert-warning",
    };

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push("fade");
    }

    return classes.join(" ");
  }

  if (!alerts.length) return;

  return (
    <div className="container">
      <div classname="m-3">
        {alerts.map((alert, index) => (
          <div key={index} className={cssClasses(alert)}>
            <a className="close" onClick={() => removeAlert(alert)}>
              &times;
            </a>
            <span dangerouslySetInnerHTML={{ __html: alert.message }}></span>
          </div>
        ))}
      </div>
    </div>
  );
};

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;
export { Alert };
