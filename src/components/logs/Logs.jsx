import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logActions';

const Logs = ({ log: { logs, loading }, getLogs }) => {
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  if (loading || logs === null) {
    return <Preloader />;
  }

  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className='center'>No logs to show...</p>
      ) : (
        logs.map((log) => <LogItem log={log} key={log.id} />)
      )}
    </ul>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.log,
});

export default connect(mapStateToProps, { getLogs })(Logs);

// import React, { useState, useEffect } from 'react';
// import Preloader from '../layout/Preloader';
// import { connect } from 'react-redux';
// import LogItem from './LogItem';
// import PropTypes from 'prop-types';

// const Logs = ({ log: { logs, loading } }) => {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState([]);

//   useEffect(() => {
//     getLogs();
//     //eslint-disable-next-line
//   }, []);

//   const getLogs = async () => {
//     setLoading(true);
//     const res = await fetch('/logs'); <--- REPLACED with app level state
//     const data = await res.json();

//     setLogs(data);
//     setLoading(false);
//   };
//   if (loading) {
//     return <Preloader />;
//   }

//   return (
//     <div>
//       <ul className='collection with-header'>
//         <li className='collection-header'>
//           <h4 className='center'>System Logs</h4>
//         </li>
//         {!loading && logs.length === 0 ? (
//           <p className='center'>No logs to show...</p>
//         ) : (
//           logs.map((log) => <LogItem log={log} key={log.item} />)
//         )}
//       </ul>
//     </div>
//   );
// };

// Logs.PropTypes = {
//   log: PropTypes.object.isRequired,
// };

// const mapStatetoProps = (state) => ({
//   log: state.log,
// });

// export default connect(mapStatetoProps)(Logs);
