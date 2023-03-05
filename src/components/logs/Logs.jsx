import React, { useState, useEffect } from 'react';
import Preloader from '../layout/Preloader';

import LogItem from './LogItem';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    getLogs();
    //eslint-disable-next-line
  }, []);

  const getLogs = async () => {
    setLoading(true);
    const res = await fetch('/logs');
    const data = await res.json();

    setLogs(data);
    setLoading(false);
  };
  if (loading) {
    return <Preloader />;
  }

  return (
    <div>
      <ul className='collection with-header'>
        <li className='collection-header'>
          <h4 className='center'>System Logs</h4>
        </li>
        {!loading && logs.length === 0 ? (
          <p className='center'>No logs to show...</p>
        ) : (
          logs.map((log) => <LogItem log={log} key={log.item} />)
        )}
      </ul>
    </div>
  );
};

export default Logs;
